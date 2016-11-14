const chalk = require('chalk')
const express = require('express')
const moment = require('moment-timezone')
const config = require('./config')
const bodyParser = require('body-parser')

const app = express()
const routes = require('./server/routes')

moment.relativeTimeThreshold('s', 60)
moment.relativeTimeThreshold('m', 60)
moment.relativeTimeThreshold('h', 24)

app.locals = config
app.locals.isProduction = process.env.NODE_ENV === 'production'

const PORT = app.locals.isProduction ? 8080 : 3000

app.use(bodyParser.json())
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

app.use('/', routes)

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
