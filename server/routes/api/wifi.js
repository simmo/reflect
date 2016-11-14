const express = require('express')
const router = express.Router() // eslint-disable-line new-cap
const axios = require('axios')
const fs = require('fs')

router.get('/', (req, res, next) => {
    const formatWifiData = (html) => {
        const statsRegEx = /Connection Speed\<.*\>([a-z0-9\.\s]+)\<.*\>([a-z0-9\.\s]+)\<\/td\>/gm
        const lineRegEx = /Line Attenuation\<.*\>([a-zA-Z0-9\.\s]+)\<.*\>([a-zA-Z0-9\.\s]+)\<\/td\>/gm
        const extractNumberRegEx = /[\sa-z]+/
        const [, speedDownstream, speedUpstream] = statsRegEx.exec(html)
        const [, lineDownstream, lineUpstream] = lineRegEx.exec(html)

        return {
            speed: {
                downstream: parseInt(speedDownstream.replace(extractNumberRegEx, ''), 10),
                upstream: parseInt(speedUpstream.replace(extractNumberRegEx, ''), 10)
            },
            attenuation: {
                downstream: lineDownstream,
                upstream: lineUpstream
            }
        }
    }

    if (!req.app.locals.isProduction) {
        fs.readFile('../../data/seed/wifi.html', 'utf8', (err, mockedData) => {
            if (err) {
                return console.log(err)
            }

            const data = formatWifiData(mockedData)

            res.json(data)
        })
    } else {
        const options = {
            auth: req.app.locals.wifi.auth,
            responseType: 'text'
        }

        axios.get(`${req.app.locals.wifi.baseUri}/sky_system.html`, options)
            .then(response => {
                const data = formatWifiData(response.data)

                res.status(response.status).json(data)
            })
            .catch(response => {
                if (response) {
                    next(response)
                }
            })
    }
})

module.exports = router
