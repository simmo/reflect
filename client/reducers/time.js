import Immutable from 'immutable'
import { UPDATE_TIME } from 'constants/time'
import moment from 'moment'

const formatTime = (time) => {
    let now = moment(time)

    return {
        timestamp: time,
        hours: now.format('H'),
        minutes: now.format('mm'),
        day: now.format('dddd'),
        date: now.format('MMMM D')
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
