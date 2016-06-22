import Immutable from 'immutable'
import { FETCH_TRAINS } from 'constants/trains'

const initialState = Immutable.Map({
    isFetching: false,
    data: null,
    lastUpdated: null
})

const trainsReducer = (state = initialState, action) => {
    let now = Date.now()

    switch (action.type) {
        case `${FETCH_TRAINS}_PENDING`:
            return state.set('isFetching', true).delete('error')

        case `${FETCH_TRAINS}_FULFILLED`:
            return state.set('isFetching', false).set('lastUpdated', now).set('data', Immutable.fromJS(action.payload.data))

        case `${FETCH_TRAINS}_REJECTED`:
            return state.set('isFetching', false).set('lastUpdated', now).set('error', action.payload.statusText)

        default:
            return state
    }
}

export default trainsReducer
