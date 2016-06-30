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

app.get('/api/trains', (req, res, next) => {
    if (DEV_DATA) {
        res.json(JSON.parse('{"summary":"All services are running.","services":[{"scheduledTime":"2016-06-30T17:44:00.280Z","estimatedTime":"2016-06-30T17:44:00.280Z","to":"London Victoria","status":"On time","length":"8","platform":"4","operatorCode":"SN","callingPoints":[{"locationName":"Gatwick Airport","crs":"GTW","st":"18:56","et":"On time","length":"8"},{"locationName":"East Croydon","crs":"ECR","st":"19:12","et":"On time","length":"8"},{"locationName":"Clapham Junction","crs":"CLJ","st":"19:23","et":"On time","length":"8"},{"locationName":"London Victoria","crs":"VIC","st":"19:30","et":"On time","length":"8"}],"isDisrupted":false,"isShortFormed":false,"isDelayed":false,"isCancelled":false,"rawData":{"std":"18:44","etd":"On time","platform":"4","operator":"Southern","operatorCode":"SN","serviceType":"train","length":"8","serviceID":"sisf+EcCn6q83Z+vWfXEOg==","rsid":"SN121801","origin":{"location":[{"locationName":"Eastbourne","crs":"EBN"}]},"destination":{"location":[{"locationName":"London Victoria","crs":"VIC","via":"via Gatwick Airport"}]},"subsequentCallingPoints":{"callingPointList":[{"callingPoint":[{"locationName":"Gatwick Airport","crs":"GTW","st":"18:56","et":"On time","length":"8"},{"locationName":"East Croydon","crs":"ECR","st":"19:12","et":"On time","length":"8"},{"locationName":"Clapham Junction","crs":"CLJ","st":"19:23","et":"On time","length":"8"},{"locationName":"London Victoria","crs":"VIC","st":"19:30","et":"On time","length":"8"}]}]}}},{"scheduledTime":"2016-06-30T17:56:00.314Z","estimatedTime":"2016-06-30T17:56:00.314Z","to":"London St Pancras (Intl)","status":"On time","length":null,"platform":"3","operatorCode":"TL","callingPoints":[{"locationName":"Three Bridges","crs":"TBD","st":"19:04","et":"On time"},{"locationName":"Gatwick Airport","crs":"GTW","st":"19:09","et":"On time"},{"locationName":"East Croydon","crs":"ECR","st":"19:24","et":"On time"},{"locationName":"London Blackfriars","crs":"BFR","st":"19:51","et":"On time"},{"locationName":"City Thameslink","crs":"CTK","st":"19:56","et":"On time"},{"locationName":"Farringdon Underground","crs":"ZFD","st":"19:59","et":"On time"},{"locationName":"London St Pancras (Intl)","crs":"STP","st":"20:03","et":"On time"},{"locationName":"West Hampstead Thameslink","crs":"WHP","st":"20:11","et":"On time"},{"locationName":"St Albans","crs":"SAC","st":"20:25","et":"On time"},{"locationName":"Harpenden","crs":"HPD","st":"20:31","et":"On time"},{"locationName":"Luton Airport Parkway","crs":"LTN","st":"20:37","et":"On time"},{"locationName":"Luton","crs":"LUT","st":"20:40","et":"On time"},{"locationName":"Leagrave","crs":"LEA","st":"20:44","et":"On time"},{"locationName":"Harlington","crs":"HLN","st":"20:49","et":"On time"},{"locationName":"Flitwick","crs":"FLT","st":"20:53","et":"On time"},{"locationName":"Bedford","crs":"BDM","st":"21:05","et":"On time"}],"isDisrupted":false,"isShortFormed":false,"isDelayed":false,"isCancelled":false,"rawData":{"std":"18:56","etd":"On time","platform":"3","operator":"Thameslink","operatorCode":"TL","serviceType":"train","serviceID":"LI7a1avEFWDz77CNgvD6mw==","rsid":"TL027100","origin":{"location":[{"locationName":"Brighton","crs":"BTN"}]},"destination":{"location":[{"locationName":"Bedford","crs":"BDM"}]},"subsequentCallingPoints":{"callingPointList":[{"callingPoint":[{"locationName":"Three Bridges","crs":"TBD","st":"19:04","et":"On time"},{"locationName":"Gatwick Airport","crs":"GTW","st":"19:09","et":"On time"},{"locationName":"East Croydon","crs":"ECR","st":"19:24","et":"On time"},{"locationName":"London Blackfriars","crs":"BFR","st":"19:51","et":"On time"},{"locationName":"City Thameslink","crs":"CTK","st":"19:56","et":"On time"},{"locationName":"Farringdon Underground","crs":"ZFD","st":"19:59","et":"On time"},{"locationName":"London St Pancras (Intl)","crs":"STP","st":"20:03","et":"On time"},{"locationName":"West Hampstead Thameslink","crs":"WHP","st":"20:11","et":"On time"},{"locationName":"St Albans","crs":"SAC","st":"20:25","et":"On time"},{"locationName":"Harpenden","crs":"HPD","st":"20:31","et":"On time"},{"locationName":"Luton Airport Parkway","crs":"LTN","st":"20:37","et":"On time"},{"locationName":"Luton","crs":"LUT","st":"20:40","et":"On time"},{"locationName":"Leagrave","crs":"LEA","st":"20:44","et":"On time"},{"locationName":"Harlington","crs":"HLN","st":"20:49","et":"On time"},{"locationName":"Flitwick","crs":"FLT","st":"20:53","et":"On time"},{"locationName":"Bedford","crs":"BDM","st":"21:05","et":"On time"}]}]}}},{"scheduledTime":"2016-06-30T18:15:00.281Z","estimatedTime":"2016-06-30T18:15:00.281Z","to":"London Victoria","status":"On time","length":"12","platform":"4","operatorCode":"SN","callingPoints":[{"locationName":"Gatwick Airport","crs":"GTW","st":"19:26","et":"On time","length":"12"},{"locationName":"East Croydon","crs":"ECR","st":"19:41","et":"On time","length":"12"},{"locationName":"Clapham Junction","crs":"CLJ","st":"19:52","et":"On time","length":"12"},{"locationName":"London Victoria","crs":"VIC","st":"19:59","et":"On time","length":"12"}],"isDisrupted":false,"isShortFormed":false,"isDelayed":false,"isCancelled":false,"rawData":{"std":"19:15","etd":"On time","platform":"4","operator":"Southern","operatorCode":"SN","serviceType":"train","length":"12","serviceID":"sG9MAYWcgH7xy3ujvlrz4A==","rsid":"SN121901","origin":{"location":[{"locationName":"Littlehampton","crs":"LIT"}]},"destination":{"location":[{"locationName":"London Victoria","crs":"VIC","via":"via Gatwick Airport"}]},"subsequentCallingPoints":{"callingPointList":[{"callingPoint":[{"locationName":"Gatwick Airport","crs":"GTW","st":"19:26","et":"On time","length":"12"},{"locationName":"East Croydon","crs":"ECR","st":"19:41","et":"On time","length":"12"},{"locationName":"Clapham Junction","crs":"CLJ","st":"19:52","et":"On time","length":"12"},{"locationName":"London Victoria","crs":"VIC","st":"19:59","et":"On time","length":"12"}]}]}}},{"scheduledTime":"2016-06-30T18:26:00.314Z","estimatedTime":"2016-06-30T18:26:00.314Z","to":"London St Pancras (Intl)","status":"On time","length":"8","platform":"3","operatorCode":"TL","callingPoints":[{"locationName":"Three Bridges","crs":"TBD","st":"19:34","et":"On time","length":"8"},{"locationName":"Gatwick Airport","crs":"GTW","st":"19:39","et":"On time","length":"8"},{"locationName":"East Croydon","crs":"ECR","st":"19:54","et":"On time","length":"8"},{"locationName":"London Blackfriars","crs":"BFR","st":"20:21","et":"On time","length":"8"},{"locationName":"City Thameslink","crs":"CTK","st":"20:26","et":"On time","length":"8"},{"locationName":"Farringdon Underground","crs":"ZFD","st":"20:29","et":"On time","length":"8"},{"locationName":"London St Pancras (Intl)","crs":"STP","st":"20:33","et":"On time","length":"8"},{"locationName":"West Hampstead Thameslink","crs":"WHP","st":"20:41","et":"On time","length":"8"},{"locationName":"St Albans","crs":"SAC","st":"20:55","et":"On time","length":"8"},{"locationName":"Harpenden","crs":"HPD","st":"21:01","et":"On time","length":"8"},{"locationName":"Luton Airport Parkway","crs":"LTN","st":"21:07","et":"On time","length":"8"},{"locationName":"Luton","crs":"LUT","st":"21:10","et":"On time","length":"8"},{"locationName":"Leagrave","crs":"LEA","st":"21:14","et":"On time","length":"8"},{"locationName":"Harlington","crs":"HLN","st":"21:19","et":"On time","length":"8"},{"locationName":"Flitwick","crs":"FLT","st":"21:23","et":"On time","length":"8"},{"locationName":"Bedford","crs":"BDM","st":"21:35","et":"On time","length":"8"}],"isDisrupted":false,"isShortFormed":false,"isDelayed":false,"isCancelled":false,"rawData":{"std":"19:26","etd":"On time","platform":"3","operator":"Thameslink","operatorCode":"TL","serviceType":"train","length":"8","serviceID":"RbDr9sJRzQtLKg+Rf4svjQ==","rsid":"TL027300","origin":{"location":[{"locationName":"Brighton","crs":"BTN"}]},"destination":{"location":[{"locationName":"Bedford","crs":"BDM"}]},"subsequentCallingPoints":{"callingPointList":[{"callingPoint":[{"locationName":"Three Bridges","crs":"TBD","st":"19:34","et":"On time","length":"8"},{"locationName":"Gatwick Airport","crs":"GTW","st":"19:39","et":"On time","length":"8"},{"locationName":"East Croydon","crs":"ECR","st":"19:54","et":"On time","length":"8"},{"locationName":"London Blackfriars","crs":"BFR","st":"20:21","et":"On time","length":"8"},{"locationName":"City Thameslink","crs":"CTK","st":"20:26","et":"On time","length":"8"},{"locationName":"Farringdon Underground","crs":"ZFD","st":"20:29","et":"On time","length":"8"},{"locationName":"London St Pancras (Intl)","crs":"STP","st":"20:33","et":"On time","length":"8"},{"locationName":"West Hampstead Thameslink","crs":"WHP","st":"20:41","et":"On time","length":"8"},{"locationName":"St Albans","crs":"SAC","st":"20:55","et":"On time","length":"8"},{"locationName":"Harpenden","crs":"HPD","st":"21:01","et":"On time","length":"8"},{"locationName":"Luton Airport Parkway","crs":"LTN","st":"21:07","et":"On time","length":"8"},{"locationName":"Luton","crs":"LUT","st":"21:10","et":"On time","length":"8"},{"locationName":"Leagrave","crs":"LEA","st":"21:14","et":"On time","length":"8"},{"locationName":"Harlington","crs":"HLN","st":"21:19","et":"On time","length":"8"},{"locationName":"Flitwick","crs":"FLT","st":"21:23","et":"On time","length":"8"},{"locationName":"Bedford","crs":"BDM","st":"21:35","et":"On time","length":"8"}]}]}}},{"scheduledTime":"2016-06-30T18:44:00.281Z","estimatedTime":"2016-06-30T18:44:00.281Z","to":"London Victoria","status":"On time","length":"12","platform":"4","operatorCode":"SN","callingPoints":[{"locationName":"Gatwick Airport","crs":"GTW","st":"19:55","et":"On time","length":"12"},{"locationName":"East Croydon","crs":"ECR","st":"20:11","et":"On time","length":"12"},{"locationName":"Clapham Junction","crs":"CLJ","st":"20:20","et":"On time","length":"12"},{"locationName":"London Victoria","crs":"VIC","st":"20:28","et":"On time","length":"12"}],"isDisrupted":false,"isShortFormed":false,"isDelayed":false,"isCancelled":false,"rawData":{"std":"19:44","etd":"On time","platform":"4","operator":"Southern","operatorCode":"SN","serviceType":"train","length":"12","serviceID":"GRkDejqYBYIMXN3NWqOmkg==","rsid":"SN122001","origin":{"location":[{"locationName":"Bognor Regis","crs":"BOG"}]},"destination":{"location":[{"locationName":"London Victoria","crs":"VIC","via":"via Gatwick Airport"}]},"subsequentCallingPoints":{"callingPointList":[{"callingPoint":[{"locationName":"Gatwick Airport","crs":"GTW","st":"19:55","et":"On time","length":"12"},{"locationName":"East Croydon","crs":"ECR","st":"20:11","et":"On time","length":"12"},{"locationName":"Clapham Junction","crs":"CLJ","st":"20:20","et":"On time","length":"12"},{"locationName":"London Victoria","crs":"VIC","st":"20:28","et":"On time","length":"12"}]}]}}},{"scheduledTime":"2016-06-30T18:54:00.314Z","estimatedTime":"2016-06-30T18:54:00.314Z","to":"London St Pancras (Intl)","status":"On time","length":"8","platform":"3","operatorCode":"TL","callingPoints":[{"locationName":"Balcombe","crs":"BAB","st":"19:59","et":"On time","length":"8"},{"locationName":"Three Bridges","crs":"TBD","st":"20:05","et":"On time","length":"8"},{"locationName":"Gatwick Airport","crs":"GTW","st":"20:09","et":"On time","length":"8"},{"locationName":"East Croydon","crs":"ECR","st":"20:25","et":"On time","length":"8"},{"locationName":"London Blackfriars","crs":"BFR","st":"20:51","et":"On time","length":"8"},{"locationName":"City Thameslink","crs":"CTK","st":"20:56","et":"On time","length":"8"},{"locationName":"Farringdon Underground","crs":"ZFD","st":"20:59","et":"On time","length":"8"},{"locationName":"London St Pancras (Intl)","crs":"STP","st":"21:03","et":"On time","length":"8"},{"locationName":"West Hampstead Thameslink","crs":"WHP","st":"21:11","et":"On time","length":"8"},{"locationName":"St Albans","crs":"SAC","st":"21:25","et":"On time","length":"8"},{"locationName":"Harpenden","crs":"HPD","st":"21:31","et":"On time","length":"8"},{"locationName":"Luton Airport Parkway","crs":"LTN","st":"21:37","et":"On time","length":"8"},{"locationName":"Luton","crs":"LUT","st":"21:40","et":"On time","length":"8"},{"locationName":"Leagrave","crs":"LEA","st":"21:44","et":"On time","length":"8"},{"locationName":"Harlington","crs":"HLN","st":"21:49","et":"On time","length":"8"},{"locationName":"Flitwick","crs":"FLT","st":"21:53","et":"On time","length":"8"},{"locationName":"Bedford","crs":"BDM","st":"22:05","et":"On time","length":"8"}],"isDisrupted":false,"isShortFormed":false,"isDelayed":false,"isCancelled":false,"rawData":{"std":"19:54","etd":"On time","platform":"3","operator":"Thameslink","operatorCode":"TL","serviceType":"train","length":"8","serviceID":"5chWva4TdMEcTc6wr03Puw==","rsid":"TL027500","origin":{"location":[{"locationName":"Brighton","crs":"BTN"}]},"destination":{"location":[{"locationName":"Bedford","crs":"BDM"}]},"subsequentCallingPoints":{"callingPointList":[{"callingPoint":[{"locationName":"Balcombe","crs":"BAB","st":"19:59","et":"On time","length":"8"},{"locationName":"Three Bridges","crs":"TBD","st":"20:05","et":"On time","length":"8"},{"locationName":"Gatwick Airport","crs":"GTW","st":"20:09","et":"On time","length":"8"},{"locationName":"East Croydon","crs":"ECR","st":"20:25","et":"On time","length":"8"},{"locationName":"London Blackfriars","crs":"BFR","st":"20:51","et":"On time","length":"8"},{"locationName":"City Thameslink","crs":"CTK","st":"20:56","et":"On time","length":"8"},{"locationName":"Farringdon Underground","crs":"ZFD","st":"20:59","et":"On time","length":"8"},{"locationName":"London St Pancras (Intl)","crs":"STP","st":"21:03","et":"On time","length":"8"},{"locationName":"West Hampstead Thameslink","crs":"WHP","st":"21:11","et":"On time","length":"8"},{"locationName":"St Albans","crs":"SAC","st":"21:25","et":"On time","length":"8"},{"locationName":"Harpenden","crs":"HPD","st":"21:31","et":"On time","length":"8"},{"locationName":"Luton Airport Parkway","crs":"LTN","st":"21:37","et":"On time","length":"8"},{"locationName":"Luton","crs":"LUT","st":"21:40","et":"On time","length":"8"},{"locationName":"Leagrave","crs":"LEA","st":"21:44","et":"On time","length":"8"},{"locationName":"Harlington","crs":"HLN","st":"21:49","et":"On time","length":"8"},{"locationName":"Flitwick","crs":"FLT","st":"21:53","et":"On time","length":"8"},{"locationName":"Bedford","crs":"BDM","st":"22:05","et":"On time","length":"8"}]}]}}},{"scheduledTime":"2016-06-30T19:14:00.281Z","estimatedTime":"2016-06-30T19:14:00.281Z","to":"London Victoria","status":"On time","length":"12","platform":"4","operatorCode":"SN","callingPoints":[{"locationName":"Gatwick Airport","crs":"GTW","st":"20:25","et":"On time","length":"12"},{"locationName":"East Croydon","crs":"ECR","st":"20:41","et":"On time","length":"12"},{"locationName":"Clapham Junction","crs":"CLJ","st":"20:50","et":"On time","length":"12"},{"locationName":"London Victoria","crs":"VIC","st":"20:58","et":"On time","length":"12"}],"isDisrupted":false,"isShortFormed":false,"isDelayed":false,"isCancelled":false,"rawData":{"std":"20:14","etd":"On time","platform":"4","operator":"Southern","operatorCode":"SN","serviceType":"train","length":"12","serviceID":"1YLJmcL+bhChMxTkLabYrQ==","rsid":"SN122101","origin":{"location":[{"locationName":"Littlehampton","crs":"LIT"}]},"destination":{"location":[{"locationName":"London Victoria","crs":"VIC","via":"via Gatwick Airport"}]},"subsequentCallingPoints":{"callingPointList":[{"callingPoint":[{"locationName":"Gatwick Airport","crs":"GTW","st":"20:25","et":"On time","length":"12"},{"locationName":"East Croydon","crs":"ECR","st":"20:41","et":"On time","length":"12"},{"locationName":"Clapham Junction","crs":"CLJ","st":"20:50","et":"On time","length":"12"},{"locationName":"London Victoria","crs":"VIC","st":"20:58","et":"On time","length":"12"}]}]}}},{"scheduledTime":"2016-06-30T19:26:00.314Z","estimatedTime":"2016-06-30T19:26:00.314Z","to":"London St Pancras (Intl)","status":"On time","length":null,"platform":"3","operatorCode":"TL","callingPoints":[{"locationName":"Three Bridges","crs":"TBD","st":"20:34","et":"On time"},{"locationName":"Gatwick Airport","crs":"GTW","st":"20:39","et":"On time"},{"locationName":"East Croydon","crs":"ECR","st":"20:54","et":"On time"},{"locationName":"London Blackfriars","crs":"BFR","st":"21:21","et":"On time"},{"locationName":"City Thameslink","crs":"CTK","st":"21:26","et":"On time"},{"locationName":"Farringdon Underground","crs":"ZFD","st":"21:29","et":"On time"},{"locationName":"London St Pancras (Intl)","crs":"STP","st":"21:33","et":"On time"},{"locationName":"West Hampstead Thameslink","crs":"WHP","st":"21:41","et":"On time"},{"locationName":"St Albans","crs":"SAC","st":"21:55","et":"On time"},{"locationName":"Harpenden","crs":"HPD","st":"22:01","et":"On time"},{"locationName":"Luton Airport Parkway","crs":"LTN","st":"22:07","et":"On time"},{"locationName":"Luton","crs":"LUT","st":"22:10","et":"On time"},{"locationName":"Leagrave","crs":"LEA","st":"22:14","et":"On time"},{"locationName":"Harlington","crs":"HLN","st":"22:19","et":"On time"},{"locationName":"Flitwick","crs":"FLT","st":"22:23","et":"On time"},{"locationName":"Bedford","crs":"BDM","st":"22:35","et":"On time"}],"isDisrupted":false,"isShortFormed":false,"isDelayed":false,"isCancelled":false,"rawData":{"std":"20:26","etd":"On time","platform":"3","operator":"Thameslink","operatorCode":"TL","serviceType":"train","serviceID":"JDRDJQFSsrjKmaQwApuT7w==","rsid":"TL027700","origin":{"location":[{"locationName":"Brighton","crs":"BTN"}]},"destination":{"location":[{"locationName":"Bedford","crs":"BDM"}]},"subsequentCallingPoints":{"callingPointList":[{"callingPoint":[{"locationName":"Three Bridges","crs":"TBD","st":"20:34","et":"On time"},{"locationName":"Gatwick Airport","crs":"GTW","st":"20:39","et":"On time"},{"locationName":"East Croydon","crs":"ECR","st":"20:54","et":"On time"},{"locationName":"London Blackfriars","crs":"BFR","st":"21:21","et":"On time"},{"locationName":"City Thameslink","crs":"CTK","st":"21:26","et":"On time"},{"locationName":"Farringdon Underground","crs":"ZFD","st":"21:29","et":"On time"},{"locationName":"London St Pancras (Intl)","crs":"STP","st":"21:33","et":"On time"},{"locationName":"West Hampstead Thameslink","crs":"WHP","st":"21:41","et":"On time"},{"locationName":"St Albans","crs":"SAC","st":"21:55","et":"On time"},{"locationName":"Harpenden","crs":"HPD","st":"22:01","et":"On time"},{"locationName":"Luton Airport Parkway","crs":"LTN","st":"22:07","et":"On time"},{"locationName":"Luton","crs":"LUT","st":"22:10","et":"On time"},{"locationName":"Leagrave","crs":"LEA","st":"22:14","et":"On time"},{"locationName":"Harlington","crs":"HLN","st":"22:19","et":"On time"},{"locationName":"Flitwick","crs":"FLT","st":"22:23","et":"On time"},{"locationName":"Bedford","crs":"BDM","st":"22:35","et":"On time"}]}]}}}]}'))
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

app.get('/api/weather/:location', (req, res, next) => {
    if (DEV_DATA) {
        res.json(JSON.parse('{"icon":"partly-cloudy-day","temperature":{"current":17,"min":11.83,"max":18.57,"feelsLike":17},"description":"Partly Cloudy","precipitation":{"chance":0,"type":"rain"},"humidity":82}'))
    } else {
        const FORECAST_API_BASE = 'https://api.forecast.io'

        axios.get(`${FORECAST_API_BASE}/forecast/${config.forecast.apiKey}/${req.params.location}?${querystring.stringify(req.query)}`)
            .then(response => {
                const nowMoment = moment.utc()
                const daily = response.data.daily.data.find(day => moment.unix(day.time).utc().isSame(nowMoment, 'day'))
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

app.get('/api/wifi', (req, res, next) => {
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
