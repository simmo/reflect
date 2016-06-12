import Immutable from 'immutable'
import { toMbps } from 'utilities/format'
import { FETCH_STATS } from 'constants/wifi'

const initialState = Immutable.Map({
    isFetching: false,
    data: Immutable.List([
        Immutable.Map({
            label: 'Download',
            value: '--'
        }),
        Immutable.Map({
            label: 'Upload',
            value: '--'
        })
    ]),
    lastUpdated: null
})

const wifiReducer = (state = initialState, action) => {
    let now = Date.now()

    switch (action.type) {
        case `${FETCH_STATS}_PENDING`:
            return state.set('isFetching', true).delete('error')

        case `${FETCH_STATS}_FULFILLED`:
            var data = Immutable.List([
                Immutable.Map({
                    label: 'Download',
                    value: toMbps(action.payload.data.downstream)
                }),
                Immutable.Map({
                    label: 'Upload',
                    value: toMbps(action.payload.data.upstream)
                })
            ])

            return state.set('isFetching', false).set('lastUpdated', now).set('data', data)

        case `${FETCH_STATS}_REJECTED`:
            return state.set('isFetching', false).set('lastUpdated', now).set('error', action.payload.statusText)

        default:
            return state
    }
}

export default wifiReducer
