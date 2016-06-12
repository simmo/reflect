const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const is = {
    js: /\.js$/,
    nodeModules: /node_modules/,
    scss: /\.scss$/,
    svg: /\.svg$/
}

const config = {
    entry: {
        app: ['./client/app']
    },
    output: {
        path: path.resolve('public'),
        filename: '[name].js'
    },
    module: {
        preLoaders: [
            {
                test: is.js,
                exclude: [is.nodeModules],
                loader: 'eslint'
            }
        ],
        loaders: [
            {
                test: is.js,
                exclude: [is.nodeModules],
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            },
            {
                test: is.scss,
                exclude: [is.nodeModules],
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader?&includePaths[]=' + path.resolve(__dirname, './client'))
            },
            {
                test: is.svg,
                exclude: [is.nodeModules],
                loaders: ['babel', 'svg-react']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ],
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],
    resolve: {
        extensions: ['', '.scss', '.webpack.js', '.web.js', '.js'],
        modulesDirectories: ['client', 'node_modules']
    }
}

module.exports = config
