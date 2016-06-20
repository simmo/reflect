import Immutable from 'immutable'
import { FETCH_WEATHER } from 'constants/weather'

const initialState = Immutable.Map({
    isFetching: false,
    data: null,
    lastUpdated: null
})

const weatherReducer = (state = initialState, action) => {
    let now = Date.now()

    switch (action.type) {
        case `${FETCH_WEATHER}_PENDING`:
            return state.set('isFetching', true).delete('error')

        case `${FETCH_WEATHER}_FULFILLED`:

            return state.set('isFetching', false).set('lastUpdated', now).mergeDeep({ data: action.payload.data })

        case `${FETCH_WEATHER}_REJECTED`:
            return state.set('isFetching', false).set('lastUpdated', now).set('error', action.payload.statusText)

        default:
            return state
    }
}

export default weatherReducer
