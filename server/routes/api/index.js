const express = require('express')
const hue = require('./hue')
const trains = require('./trains')
const weather = require('./weather')
const wifi = require('./wifi')
const router = express.Router() // eslint-disable-line new-cap

router.use('/hue', hue)
router.use('/trains', trains)
router.use('/weather', weather)
router.use('/wifi', wifi)

module.exports = router
