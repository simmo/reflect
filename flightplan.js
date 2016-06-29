const path              = require('path')
const plan              = require('flightplan')
const config            = require('./config')

const application       = 'homehub'
const deployTo          = path.join('/var', 'www', application)
const repoUrl           = 'https://github.com/simmo/reflect.git'
const branch            = 'master'
const keepReleases      = 3
const releaseTimestamp  = new Date().getTime().toString()
const releasesPath      = path.join(deployTo, 'releases')
const sharedPath        = path.join(deployTo, 'shared')
const repoPath          = path.join(deployTo, 'repo')
const currentPath       = path.join(deployTo, 'current')
const deploymentLogPath = path.join(deployTo, 'deployments.log')
const releasePath       = path.join(releasesPath, releaseTimestamp)
const linkedDirs        = []
const linkedFiles       = ['config.json']
const copiedDirs        = ['node_modules']

var revision            = null
var localUser           = null

var envs = {
    production: {
        host: config.production.host,
        username: config.production.user,
        password: config.production.password
    }
}

var deploy = {
    prep: (transport) => {
        localUser = transport.exec('whoami').stdout.trim()
    },
    check: (transport) => {
        transport.log('Checking environment...')
        transport.silent()

        // 1) Check git is installed
        transport.exec('which git')

        // 2) Check remote repo exists
        transport.exec(`git ls-remote --heads ${repoUrl}`)

        // 3) Check releases and shared directories exist
        transport.sudo(`mkdir -p ${releasesPath} ${sharedPath}`)

        // 4) Check shared directories exist
        if (linkedDirs.length) {
            var dirs = linkedDirs.map(dir => path.join(sharedPath, dir)).join()

            transport.sudo(`mkdir -p ${dirs}`)
        }
        if (linkedFiles.length) {
            var files = linkedFiles.map(file => path.join(sharedPath, file)).join()

            transport.sudo(`touch ${files}`)
        }

        // 5) Check we have a repo
        if (transport.exec(`[ -f ${path.join(repoPath, 'HEAD')} ]`, { failsafe: true }).code === 0) {
            // Yes: Update
            transport.with(`cd ${repoPath}`, () => {
                transport.sudo('git remote update')
            })
        } else {
            // No: Clone
            transport.sudo(`git clone --mirror ${repoUrl} ${repoPath}`)
        }

        // 6) Check we have write permissions
        // @todo
    },
    create: (transport) => {
        transport.log('Creating release...')
        transport.silent()

        // 1) Create release folder
        transport.sudo(`mkdir -p ${releasePath}`)

        // 2) Bundle repo, copy to release and uncompress contents
        transport.sudo(`git -C ${repoPath} archive ${branch} | tar -x -f - -C ${releasePath}`)

        if (copiedDirs.length) {
            copiedDirs.forEach(dir => {
                var target = path.join(releasePath, dir)
                var source = path.join(currentPath, dir)

                // Check if dir exists in current
                if (transport.exec(`[ -d ${source} ]`, { failsafe: true }).code === 0) {
                    // Yes: Copy dir to new release
                    transport.sudo(`cp -avr ${source} ${releasePath}`)
                } else {
                    // No: Make an empty directory in the new release
                    transport.sudo(`mkdir -p ${target}`)
                }
            })
        }

        // 3) Create symlinked directories
        if (linkedDirs.length) {
            var dirs = linkedDirs.map(dir => path.join(releasePath, dir)).join()

            transport.sudo(`mkdir -p ${dirs}`)

            linkedDirs.forEach(dir => {
                var target = path.join(releasePath, dir)
                var source = path.join(sharedPath, dir)

                if (transport.exec(`[ -d ${target} ]`, { failsafe: true }).code === 0) {
                    transport.sudo(`rm -rf ${target}`)
                }

                transport.sudo(`ln -s ${source} ${target}`)
            })
        }
        if (linkedFiles.length) {
            linkedFiles.forEach(file => {
                var target = path.join(releasePath, file)
                var source = path.join(sharedPath, file)

                // if (transport.exec(`[ -d ${target} ]`, { failsafe: true }).code === 0) {
                //     transport.sudo(`rm -rf ${target}`)
                // }

                transport.sudo(`ln -s ${source} ${target}`)
            })
        }

        // 4) Fetch revision number
        transport.with(`cd ${repoPath}`, () => {
            var fetchReleaseSha = transport.exec(`git rev-list --max-count=1 --abbrev-commit --abbrev=12 ${branch}`)

            revision = fetchReleaseSha.code === 0 ? fetchReleaseSha.stdout.trim() : 'unknown'
        })

        // 5) Run npm install and build
        transport.with(`cd ${releasePath}; export NODE_ENV=${transport._context.target}`, () => {
            transport.sudo('npm prune', { silent: false })
            transport.sudo('npm install', { silent: false })
            transport.sudo('npm run build', { silent: false })
        })
    },
    publish: (transport) => {
        transport.log('Publishing release...')
        transport.silent()

        // 1) Update current symlink to new release
        transport.sudo(`ln -sfn ${releasePath} ${currentPath}`)

        // 2) Update log
        transport.sudo(`printf "[%s %s] Branch %s (at %s) deployed as release %s by %s\n" $(date '+%Y-%m-%d %H:%M:%S') "${branch}" "${revision}" "${releaseTimestamp}" "${localUser}" >> ${deploymentLogPath}`)
    },
    restart: (transport) => {
        // 1) Restart node process
        transport.with(`export NODE_ENV=${transport._context.target}`, () => {
            transport.sudo(`forever stopall && forever start -c node --spinSleepTime 10000 ${path.join(currentPath, 'index.js')}`)
            // if (transport.sudo(`forever restart ${path.join(currentPath, 'index.js')}`).code !== 0) {
            //     transport.sudo(`forever start -c nodejs --spinSleepTime 10000 ${path.join(currentPath, 'index.js')}`)
            // }
        })
    },
    cleanup: (transport) => {
        transport.log('Cleaning up old releases...')
        transport.silent()

        // 1) Only remove the number of releases specified by keepReleases
        var fetchReleases = transport.sudo(`ls -r ${releasesPath}`)

        if (fetchReleases.code === 0) {
            var releases = fetchReleases.stdout.trim().split('\n').slice(keepReleases)

            if (releases.length) {
                transport.log(`Removing ${releases.length} release(s)...`)
                transport.with(`cd ${releasesPath}`, () => transport.sudo(`rm -rf ${releases.join(' ')}`))
            }
        }
    },
    rollback: (transport) => {
        transport.log('Rolling back to previous release...')
        transport.silent()

        var fetchReleases = transport.exec(`ls -r ${releasesPath}`)
        var releases = fetchReleases.stdout.trim().split('\n')
        var currentReleasePath = transport.exec(`readlink -f ${currentPath}`).stdout.trim()
        var currentReleaseDir = path.basename(currentReleasePath)
        var release = releases[releases.indexOf(currentReleaseDir) + 1]
        var previousRelease = path.join(releasesPath, release)

        // If we have a previous release
        if (previousRelease) {
            console.log(releases)
            console.log(currentReleasePath)

            // 1) Point current synlink to previous release
            transport.log(`ln -sfn ${previousRelease} ${currentPath}`)

            // 2) Update log
            transport.log(`printf "[%s %s] %{%s} rolled back to release %{release}\n" $(date '+%Y-%m-%d %H:%M:%S') "${localUser}" "${release}" >> ${deploymentLogPath}`)
        }
    }
}

plan.target('production', envs.production)

plan.local('deploy', deploy.prep)
plan.remote('deploy', deploy.check)
plan.remote('deploy', deploy.create)
plan.remote('deploy', deploy.publish)
plan.remote('deploy', deploy.restart)
plan.remote('deploy', deploy.cleanup)

plan.local('rollback', deploy.prep)
plan.remote('rollback', deploy.rollback)
plan.remote('rollback', deploy.restart)
