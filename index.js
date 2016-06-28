const chalk = require('chalk')
const express = require('express')
const axios = require('axios')
const async = require('async')
const soap = require('soap')
const moment = require('moment-timezone')
const querystring = require('querystring')
const config = require('./config')

const PORT = process.env.NODE_ENV === 'production' ? 8080 : 3000
const DEV_DATA = true

const app = express()

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
    if (DEV_DATA) {
        res.json(JSON.parse('{"summary":"2 of 10 have issues.","services":[{"scheduledTime":"2016-06-20T06:33:00.538Z","estimatedTime":"2016-06-20T06:33:00.538Z","status":"On time","length":"10","platform":"3","operatorCode":"GX","isDisrupted":false,"isShortFormed":false,"isDelayed":false,"isCancelled":false,"rawData":{"std":"07:33","etd":"On time","platform":"3","operator":"Gatwick Express","operatorCode":"GX","serviceType":"train","length":"10","serviceID":"926guPkEO88Po/zJ1cSbfA==","rsid":"GX508900","origin":{"location":[{"locationName":"Brighton","crs":"BTN"}]},"destination":{"location":[{"locationName":"London Victoria","crs":"VIC","via":"via Gatwick Airport"}]}}},{"scheduledTime":"2016-06-20T06:40:00.539Z","estimatedTime":"2016-06-20T06:40:00.539Z","status":"On time","length":null,"platform":"3","operatorCode":"SN","isDisrupted":false,"isShortFormed":false,"isDelayed":false,"isCancelled":false,"rawData":{"std":"07:40","etd":"On time","platform":"3","operator":"Southern","operatorCode":"SN","serviceType":"train","serviceID":"EA5pzHU6CmkXHsUAIvkusQ==","rsid":"SN259400","origin":{"location":[{"locationName":"Littlehampton","crs":"LIT"}]},"destination":{"location":[{"locationName":"London Victoria","crs":"VIC"}]}}},{"scheduledTime":"2016-06-20T06:43:00.539Z","estimatedTime":"2016-06-20T06:43:00.539Z","status":"On time","length":"12","platform":"4","operatorCode":"SN","isDisrupted":false,"isShortFormed":false,"isDelayed":false,"isCancelled":false,"rawData":{"std":"07:43","etd":"On time","platform":"4","operator":"Southern","operatorCode":"SN","serviceType":"train","length":"12","serviceID":"t2evP8xxPgshoTedbIPoEQ==","rsid":"SN141402","origin":{"location":[{"locationName":"Seaford","crs":"SEF"},{"locationName":"Hastings","crs":"HGS"}]},"destination":{"location":[{"locationName":"London Victoria","crs":"VIC"}]}}},{"scheduledTime":"2016-06-20T06:48:00.539Z","estimatedTime":"2016-06-20T06:48:00.539Z","status":"On time, formed of 5 coaches","length":"5","platform":"4","operatorCode":"GX","isDisrupted":true,"isShortFormed":true,"isDelayed":false,"isCancelled":false,"rawData":{"std":"07:48","etd":"On time","platform":"4","operator":"Gatwick Express","operatorCode":"GX","serviceType":"train","length":"5","serviceID":"sLrblXPmOChQJfSwox9n7w==","rsid":"GX509500","origin":{"location":[{"locationName":"Brighton","crs":"BTN"}]},"destination":{"location":[{"locationName":"London Victoria","crs":"VIC","via":"via Gatwick Airport"}]}}},{"scheduledTime":"2016-06-20T07:00:00.539Z","estimatedTime":"2016-06-20T07:00:00.539Z","status":"On time","length":null,"platform":"4","operatorCode":"SN","isDisrupted":false,"isShortFormed":false,"isDelayed":false,"isCancelled":false,"rawData":{"std":"08:00","etd":"On time","platform":"4","operator":"Southern","operatorCode":"SN","serviceType":"train","serviceID":"mDVSbQFJZpI1iSRAe3+mrg==","rsid":"SN259500","origin":{"location":[{"locationName":"Littlehampton","crs":"LIT"}]},"destination":{"location":[{"locationName":"London Victoria","crs":"VIC"}]}}},{"scheduledTime":"2016-06-20T07:06:00.539Z","estimatedTime":"2016-06-20T07:06:00.539Z","status":"On time","length":"10","platform":"4","operatorCode":"GX","isDisrupted":false,"isShortFormed":false,"isDelayed":false,"isCancelled":false,"rawData":{"std":"08:06","etd":"On time","platform":"4","operator":"Gatwick Express","operatorCode":"GX","serviceType":"train","length":"10","serviceID":"5slccH0SJN3gCQxdgahrVg==","rsid":"GX509600","origin":{"location":[{"locationName":"Brighton","crs":"BTN"}]},"destination":{"location":[{"locationName":"London Victoria","crs":"VIC","via":"via Gatwick Airport"}]}}},{"scheduledTime":"2016-06-20T07:15:00.539Z","estimatedTime":"2016-06-20T07:15:00.539Z","status":"On time","length":"8","platform":"3","operatorCode":"SN","isDisrupted":false,"isShortFormed":false,"isDelayed":false,"isCancelled":false,"rawData":{"std":"08:15","etd":"On time","platform":"3","operator":"Southern","operatorCode":"SN","serviceType":"train","length":"8","serviceID":"L5vsH7z0cwhuIj8o6IPdMQ==","rsid":"SN141700","origin":{"location":[{"locationName":"Hastings","crs":"HGS"}]},"destination":{"location":[{"locationName":"London Victoria","crs":"VIC"}]}}},{"scheduledTime":"2016-06-20T07:29:00.539Z","estimatedTime":"2016-06-20T07:29:00.539Z","status":"On time","length":null,"platform":"3","operatorCode":"SN","isDisrupted":false,"isShortFormed":false,"isDelayed":false,"isCancelled":false,"rawData":{"std":"08:29","etd":"On time","platform":"3","operator":"Southern","operatorCode":"SN","serviceType":"train","serviceID":"pW4Rd8iALBNXHGmwuO0hzw==","rsid":"SN259600","origin":{"location":[{"locationName":"Littlehampton","crs":"LIT"}]},"destination":{"location":[{"locationName":"London Victoria","crs":"VIC","via":"via Gatwick Airport"}]}}},{"scheduledTime":"2016-06-20T07:44:00.539Z","estimatedTime":"2016-06-20T07:44:00.539Z","status":"On time","length":"8","platform":"3","operatorCode":"SN","isDisrupted":false,"isShortFormed":false,"isDelayed":false,"isCancelled":false,"rawData":{"std":"08:44","etd":"On time","platform":"3","operator":"Southern","operatorCode":"SN","serviceType":"train","length":"8","serviceID":"t2wj9dOyHkgn1Y5kDWgk7A==","rsid":"SN141800","origin":{"location":[{"locationName":"Hastings","crs":"HGS"}]},"destination":{"location":[{"locationName":"London Victoria","crs":"VIC","via":"via Gatwick Airport"}]}}},{"scheduledTime":"2016-06-20T07:51:00.539Z","estimatedTime":"2016-06-20T07:51:00.539Z","status":"On time, formed of 5 coaches","length":"5","platform":"3","operatorCode":"GX","isDisrupted":true,"isShortFormed":true,"isDelayed":false,"isCancelled":false,"rawData":{"std":"08:51","etd":"On time","platform":"3","operator":"Gatwick Express","operatorCode":"GX","serviceType":"train","length":"5","serviceID":"qorxI8Z5R6j8gdVKhx+7LA==","rsid":"GX510000","origin":{"location":[{"locationName":"Brighton","crs":"BTN"}]},"destination":{"location":[{"locationName":"London Victoria","crs":"VIC","via":"via Gatwick Airport"}]}}}]}'))
    } else {
        const wsdl = 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/wsdl.aspx?ver=2016-02-16'
        // const nowMoment = moment()

        const trainTimeToMoment = (trainTime) => {
            // Break train time into hours and minutes
            var trainMoment = moment.tz('Europe/London')
            var timeSplit = trainTime.split(':')

            // If we have hours and minutes
            if (timeSplit.length === 2) {
                timeSplit = timeSplit.map(segment => parseInt(segment, 10))
                trainMoment.hour(timeSplit[0]).minutes(timeSplit[1]).seconds(0)

                // If train time looks to be in the past, set to tomorrow
                // if (trainMoment.isBefore(nowMoment)) {
                //     trainMoment.add(1, 'day')
                // }

                return trainMoment
            } else {
                // This isn't a time
                return false
            }

            // .format('dddd, MMMM Do YYYY, h:mm:ss a')
        }

        soap.createClient(wsdl, (err, client) => {
            if (err) {
                return next(err)
            }

            client.addSoapHeader({'AccessToken': { 'TokenValue': config.nationalRail.apiKey }})

            const departureBoard = (crs, callback) => {
                client.GetDepBoardWithDetails({ // eslint-disable-line new-cap
                    numRows: 10,
                    crs: 'HHE',
                    filterCrs: crs,
                    filterType: 'to'
                }, (err, result) => {
                    if (err) {
                        return callback(err)
                    }

                    var services = []

                    if (result && result.GetStationBoardResult && result.GetStationBoardResult.trainServices && result.GetStationBoardResult.trainServices.service) {
                        services = result.GetStationBoardResult.trainServices.service.map(service => {
                            let scheduledTime = trainTimeToMoment(service.std)
                            let estimatedTime = null
                            let status = service.etd
                            let length = service.length || null
                            let isShortFormed = length && length < 8 || false
                            let isCancelled = service.isCancelled || false
                            let { subsequentCallingPoints: { callingPointList: [ { callingPoint: callingPoints } ] } } = service

                            let [{ locationName: to }] = callingPoints.filter(station => station.crs.toLowerCase() === crs.toLowerCase())

                            if (service.etd === 'On time') {
                                // If on time then use same time as scheduled
                                estimatedTime = scheduledTime
                            } else {
                                // Try and convert the etd to a moment
                                estimatedTime = trainTimeToMoment(service.etd)

                                // If we have an estimated time moment, update status
                                if (estimatedTime) {
                                    status = `Delayed by ${estimatedTime.from(scheduledTime, true)}`
                                }
                            }

                            if (isShortFormed) {
                                status += `, formed of ${length} coaches`
                            }

                            let isDelayed = scheduledTime !== estimatedTime || false

                            return {
                                scheduledTime,
                                estimatedTime,
                                to,
                                status,
                                length,
                                platform: service.platform,
                                operatorCode: service.operatorCode,
                                callingPoints,
                                isDisrupted: isShortFormed || isDelayed || isCancelled,
                                isShortFormed,
                                isDelayed,
                                isCancelled,
                                rawData: service
                            }
                        })
                    }

                    callback(null, services)
                })
            }

            async.parallel([
                callback => departureBoard('VIC', callback),
                callback => departureBoard('STP', callback)
            ], (err, results) => {
                if (err) {
                    return next(err)
                }

                results = results.reduce((a, b) => a.concat(b), []).sort((a, b) => {
                    if (a.scheduledTime < b.scheduledTime) {
                        return -1
                    }
                    if (a.scheduledTime > b.scheduledTime) {
                        return 1
                    }
                    return 0
                })

                var response = {
                    summary: '',
                    services: results
                }

                var servicesWithIssues = response.services.filter(service => service.isDisrupted)

                if (servicesWithIssues.length > 0) {
                    response.summary = `${servicesWithIssues.length} of ${response.services.length} have issues.`
                } else {
                    response.summary = 'All services are running.'
                }

                res.json(response)
            })
        })
    }
})

app.get('/weather/:location', (req, res, next) => {
    if (DEV_DATA) {
        res.json(JSON.parse('{"icon":"partly-cloudy-day","temperature":{"current":18,"min":10.75,"max":18.84,"feelsLike":18},"description":"Partly Cloudy","precipitation":{"chance":0},"humidity":61}'))
    } else {
        const FORECAST_API_BASE = 'https://api.forecast.io'

        axios.get(`${FORECAST_API_BASE}/forecast/${config.forecast.apiKey}/${req.params.location}?${querystring.stringify(req.query)}`)
            .then(response => {
                const nowMoment = moment()
                const daily = response.data.daily.data.find(day => moment.unix(day.time).isSame(nowMoment, 'day'))
                const currently = response.data.currently

                const data = {
                    icon: currently.icon,
                    temperature: {
                        current: Math.round(currently.temperature),
                        min: daily.temperatureMin,
                        max: daily.temperatureMax,
                        feelsLike: Math.round(currently.apparentTemperature)
                    },
                    description: currently.summary,
                    precipitation: {
                        chance: currently.precipProbability * 100,
                        type: currently.precipType || 'rain'
                    },
                    humidity: currently.humidity * 100
                }

                res.status(response.status).json(data)
            })
            .catch(response => {
                if (response) {
                    next(response)
                }
            })
    }
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

app.use((req, res) => {
    res.send(`
        <html>
            <head>
                <title>Reflect</title>
                <link href="https://fonts.googleapis.com/css?family=Open+Sans:100,300,400,600,700" rel="stylesheet">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
                <meta name="mobile-web-app-capable" content="yes">
                <meta name="apple-mobile-web-app-capable" content="yes">
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
                <meta name="apple-mobile-web-app-title" content="Reflect">
                <link href="/app.css" rel="stylesheet">
            </head>
            <body>
                <div id="react"></div>
                <script src="/app.js"></script>
            </body>
        </html>
    `)
})

app.listen(PORT, () => console.log(`HomeHub is running on ${PORT}`))
