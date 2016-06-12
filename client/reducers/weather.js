import Immutable from 'immutable'
import moment from 'moment'
import { FETCH_WEATHER } from 'constants/weather'

const initialState = Immutable.Map({
    isFetching: false,
    data: null,
    lastUpdated: null
})

const weatherReducer = (state = initialState, action) => {
    let now = Date.now()
    let nowMoment = moment(now)

    switch (action.type) {
        case `${FETCH_WEATHER}_PENDING`:
            return state.set('isFetching', true).delete('error')

        case `${FETCH_WEATHER}_FULFILLED`:
            var today = moment()
            var daily = action.payload.data.daily.data.find(day => moment.unix(day.time).isSame(today, 'day'))
            var { currently } = action.payload.data
            var sunriseMoment = moment.unix(daily.sunriseTime)
            var sunsetMoment = moment.unix(daily.sunsetTime)

            var data = Immutable.Map({
                icon: currently.icon,
                temperature: Immutable.Map({
                    current: Math.round(currently.temperature),
                    min: daily.temperatureMin,
                    max: daily.temperatureMax
                }),
                isDaytime: nowMoment.isAfter(sunriseMoment) && nowMoment.isBefore(sunsetMoment),
                sunrise: daily.sunriseTime,
                sunset: daily.sunsetTime,
                description: currently.summary,
                rain: currently.precipProbability * 100,
                humidity: currently.humidity * 100
            })

            return state.set('isFetching', false).set('lastUpdated', now).set('data', data)

        case `${FETCH_WEATHER}_REJECTED`:
            return state.set('isFetching', false).set('lastUpdated', now).set('error', action.payload.statusText)

        default:
            return state
    }
}

export default weatherReducer
