const chalk = require('chalk')
const express = require('express')
const axios = require('axios')
const soap = require('soap')
const querystring = require('querystring')
const config = require('./config')

const app = express()

const PORT = process.env.NODE_ENV === 'production' ? 8080 : 3000

app.use(express.static('public'))

app.use((req, res, next) => {
    console.log(`${chalk.magenta(req.method)}${(req.method.length < 4 ? ' ' : '')}`, chalk.bold(req.originalUrl))

    next()
})

// const GOOGLE_GEOCODE_URL = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${req.params.location}&sensor=true`
// axios.get(GOOGLE_GEOCODE_URL)
//     .then(response => {
//         response.results
//         res.status(response.status).json(response.results)
//     })
//     .catch(response => {
//         if (response) {
//             next(response)
//         }
//     })

app.get('/trains', (req, res, next) => {
    const wsdl = 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/wsdl.aspx?ver=2016-02-16'

    soap.createClient(wsdl, (err, client) => {
        if (err) {
            return next(err)
        }

        client.addSoapHeader({'AccessToken': { 'TokenValue': config.nationalRail.apiKey }})

        client.GetDepartureBoard({ // eslint-disable-line new-cap
            numRows: 10,
            crs: 'HHE',
            filterCrs: 'VIC',
            filterType: 'to'
        }, (err, result) => {
            if (err) {
                return next(err)
            }

            var trains = []

            if (result && result.GetStationBoardResult && result.GetStationBoardResult.trainServices) {
                trains = result.GetStationBoardResult.trainServices.service.map(service => ({
                    time: service.std,
                    status: service.etd,
                    length: service.length,
                    cancelled: service.isCancelled || false
                }))
            }

            res.send(trains)
        })
    })
})

app.get('/weather/:location', (req, res, next) => {
    const FORECAST_API_BASE = 'https://api.forecast.io'

    axios.get(`${FORECAST_API_BASE}/forecast/${config.forecast.apiKey}/${req.params.location}?${querystring.stringify(req.query)}`)
        .then(response => res.status(response.status).json(response.data))
        .catch(response => {
            if (response) {
                next(response)
            }
        })
})

app.get('/wifi', (req, res, next) => {
    const options = {
        auth: config.wifi.auth,
        responseType: 'text'
    }

    axios.get(`${config.wifi.baseUri}/sky_system.html`, options)
        .then(response => {
            const statsRegEx = /Connection Speed\<.*\>([a-z0-9\s]+)\<.*\>([a-z0-9\s]+)\<\/td\>/gm
            const data = statsRegEx.exec(response.data)

            res.status(response.status).json({
                downstream: parseInt(data[1].replace(/[\sa-z]+/, ''), 10),
                upstream: parseInt(data[2].replace(/[\sa-z]+/, ''), 10)
            })
        })
        .catch(response => {
            var err = new Error(response.statusText)

            err.status = response.status

            next(err)
        })
})

app.all('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Time</title>
                <link href="https://fonts.googleapis.com/css?family=Open+Sans:100,300,400,600,700" rel="stylesheet">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
                <link href="/app.css" rel="stylesheet">
            </head>
            <body>
                <div id="react"></div>
                <script src="/app.js"></script>
            </body>
        </html>
    `)
})

app.use((req, res, next) => {
    var err = new Error('Not Found')

    err.status = 404
    console.log(err)
    next(err)
})

app.listen(PORT, () => console.log(`HomeHub is running on ${PORT}`))
