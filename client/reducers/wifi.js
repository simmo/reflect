import Immutable from 'immutable'
import { toMbps } from 'utilities/format'
import { FETCH_STATS } from 'constants/wifi'

const initialState = Immutable.Map({
    isFetching: false,
    data: Immutable.fromJS({
        speed: {
            downstream: '--',
            upstream: '--'
        },
        attenuation: {
            downstream: '--',
            upstream: '--'
        }
    }),
    lastUpdated: null
})

const wifiReducer = (state = initialState, action) => {
    let now = Date.now()

    switch (action.type) {
        case `${FETCH_STATS}_PENDING`:
            return state.set('isFetching', true).delete('error')

        case `${FETCH_STATS}_FULFILLED`:
            var data = Immutable.fromJS(action.payload.data)

            return state.set('isFetching', false).set('lastUpdated', now).set('data', data)

        case `${FETCH_STATS}_REJECTED`:
            return state.set('isFetching', false).set('lastUpdated', now).set('error', action.payload.statusText)

        default:
            return state
    }
}

export default wifiReducer
