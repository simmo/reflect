import { createReducer, storeRequiresReload } from 'utilities/store'
import SunCalc from 'suncalc'
import moment from 'moment'

const FETCH_COORDS           = 'reflect/app/FETCH_COORDS'
const FETCH_COORDS_PENDING   = 'reflect/app/FETCH_COORDS_PENDING'
const FETCH_COORDS_FULFILLED = 'reflect/app/FETCH_COORDS_FULFILLED'
const FETCH_COORDS_REJECTED  = 'reflect/app/FETCH_COORDS_REJECTED'
const LOCK                   = 'reflect/app/LOCK'
const UNLOCK                 = 'reflect/app/UNLOCK'
const CALCULATE_TIME_OF_DAY  = 'reflect/app/CALCULATE_TIME_OF_DAY'

const initialState = {
    location: {
        isFetching: false,
        data: null,
        lastUpdated: null,
        error: null
    },
    dayPeriod: {
        isNight: null,
        isTwilight: null,
        isDay: null
    },
    locked: false
}

export default createReducer(initialState, {
    [FETCH_COORDS_PENDING](state) {
        return {
            ...state,
            location: {
                ...state.location,
                isFetching: true
            }
        }
    },
    [FETCH_COORDS_REJECTED](state, action) {
        return {
            ...state,
            location: {
                ...state.location,
                isFetching: false,
                lastUpdated: Date.now(),
                error: action.payload
            }
        }
    },
    [FETCH_COORDS_FULFILLED](state, action) {
        return {
            ...state,
            location: {
                ...state.location,
                isFetching: false,
                lastUpdated: Date.now(),
                data: action.payload.coords,
                error: false
            }
        }
    },
    [LOCK](state) {
        return {
            ...state,
            locked: true
        }
    },
    [UNLOCK](state) {
        return {
            ...state,
            locked: false
        }
    },
    [CALCULATE_TIME_OF_DAY](state, action) {
        return {
            ...state,
            dayPeriod: {
                ...action.payload
            }
        }
    }
})

export function fetchCoords() {
    return (dispatch, getState) => {
        const store = getState()

        if (!storeRequiresReload(store.app.location, 1000 * 60 * 60 * 24)) {
            return Promise.resolve()
        }

        return dispatch({
            type: FETCH_COORDS,
            payload: () => new Promise((resolve, reject) => {
                console.log(Math.random())
                navigator.geolocation.getCurrentPosition(resolve, reject)
            }),
            meta: {
                promise: true
            }
        })
    }
}

export function lock() {
    return {
        type: LOCK
    }
}

export function unlock() {
    return {
        type: UNLOCK
    }
}

export function calculateTimeOfDay(latitude, longitude) {
    const now = Date.now()
    const nowMoment = moment(now)
    const momentBetweenToSecond = (time, from, to) => time.isSameOrAfter(from, 'second') && time.isBefore(to, 'second')
    const getSunTimes = SunCalc.getTimes(now, latitude, longitude)
    const sunTimeMoments = ['dusk', 'dawn', 'sunriseEnd', 'sunsetStart'].reduce((obj, name) => {
        obj[name] = moment(getSunTimes[name])
        return obj
    }, {})

    return {
        type: CALCULATE_TIME_OF_DAY,
        payload: {
            isNight: nowMoment.isSameOrAfter(sunTimeMoments.dusk) || nowMoment.isBefore(sunTimeMoments.dawn),
            isTwilight: momentBetweenToSecond(nowMoment, sunTimeMoments.dawn, sunTimeMoments.sunriseEnd) || momentBetweenToSecond(nowMoment, sunTimeMoments.sunsetStart, sunTimeMoments.dusk),
            isDay: momentBetweenToSecond(nowMoment, sunTimeMoments.sunriseEnd, sunTimeMoments.sunsetStart)
        }
    }
}
