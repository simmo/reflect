import Immutable from 'immutable'
import { UPDATE_TIME } from 'constants/time'
import moment from 'moment'
import SunCalc from 'suncalc'

const momentBetweenToSecond = (time, from, to) => time.isSameOrAfter(from, 'second') && time.isBefore(to, 'second')

const formatTime = (time, location = ['50.9977', '-0.1037']) => {
    let now = moment(time)
    let greeting

    const splitAfternoon = 12 // 24hr time to split the afternoon
    const splitEvening = 17 // 24hr time to split the evening
    const hours = parseInt(now.format('H'), 10)
    const getSunTimes = SunCalc.getTimes(time, location[0], location[1])

    const sunTimeMoments = Object.keys(getSunTimes).reduce((obj, name) => {
        obj[name] = moment(getSunTimes[name])
        return obj
    }, {})

    // Calculate greeting
    if (hours >= splitAfternoon && hours <= splitEvening) {
        greeting = 'afternoon'
    } else if (hours >= splitEvening) {
        greeting = 'evening'
    } else {
        greeting = 'morning'
    }

    return {
        greeting,
        timestamp: time,
        hours,
        minutes: now.format('mm'),
        day: now.format('dddd'),
        date: now.format('D MMMM'),
        isNight: now.isSameOrAfter(sunTimeMoments.dusk) || now.isBefore(sunTimeMoments.dawn),
        isTwilight: momentBetweenToSecond(now, sunTimeMoments.dawn, sunTimeMoments.sunriseEnd) || momentBetweenToSecond(now, sunTimeMoments.sunsetStart, sunTimeMoments.dusk),
        isDay: momentBetweenToSecond(now, sunTimeMoments.sunriseEnd, sunTimeMoments.sunsetStart)
    }
}

const initialState = Immutable.Map(formatTime(Date.now()))

const timeReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TIME:
            return state.merge(formatTime(action.payload))

        default:
            return state
    }
}

export default timeReducer
