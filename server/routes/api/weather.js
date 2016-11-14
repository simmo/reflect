const express = require('express')
const router = express.Router() // eslint-disable-line new-cap
const axios = require('axios')
const querystring = require('querystring')
const moment = require('moment-timezone')

router.get('/:location', (req, res, next) => {
    const formatWeatherData = ({ currently, daily, hourly }) => {
        const nowMoment = moment.utc()
        const today = daily.data.find(day => moment.unix(day.time).utc().isSame(nowMoment, 'day')) || daily.data[0]
        const decimalToPercent = decimal => decimal * 100

        hourly.data = hourly.data.slice(0, 24).map(hour => ({
            icon: hour.icon,
            precipitation: {
                chance: decimalToPercent(currently.precipProbability),
                type: currently.precipType || 'rain'
            },
            temperature: Math.round(hour.temperature),
            time: hour.time
        }))

        return {
            description: currently.summary,
            hourly,
            humidity: currently.humidity * 100,
            icon: currently.icon,
            precipitation: {
                chance: decimalToPercent(currently.precipProbability),
                type: currently.precipType || 'rain'
            },
            temperature: {
                current: Math.round(currently.temperature),
                min: Math.round(today.temperatureMin),
                max: Math.round(today.temperatureMax),
                feelsLike: Math.round(currently.apparentTemperature)
            }
        }
    }

    if (!req.app.locals.isProduction) {
        const mockedData = require('../../data/seed/weather')
        const data = formatWeatherData(mockedData)

        res.json(data)
    } else {
        axios.get(`https://api.forecast.io/forecast/${req.app.locals.forecast.apiKey}/${req.params.location}?${querystring.stringify(req.query)}`)
            .then(response => {
                const data = formatWeatherData(response.data)

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
