import Immutable from 'immutable'
import { FETCH_LIGHTS, PUT_UPDATE } from 'constants/hue'

const initialState = Immutable.Map({
    isFetching: false,
    data: null,
    lastUpdated: null
})

const lightsReducer = (state = initialState, action) => {
    let now = Date.now()

    const generateSummary = (data) => ({
        lights: {
            on: data.lights.reduce((total, light) => total + (light.state.reachable && light.state.on ? 1 : 0), 0),
            reachable: data.lights.reduce((total, light) => total + (light.state.reachable ? 1 : 0), 0),
            total: data.lights.length
        },
        rooms: {
            total: data.rooms.length
        }
    })

    switch (action.type) {
        case `${FETCH_LIGHTS}_PENDING`:
            return state.set('isFetching', true).delete('error')

        case `${FETCH_LIGHTS}_FULFILLED`: {
            let newState = action.payload.data

            newState.stats = generateSummary(newState)

            return state.set('isFetching', false).set('lastUpdated', now).set('data', Immutable.fromJS(newState))
        }
        case `${FETCH_LIGHTS}_REJECTED`:
            return state.set('isFetching', false).set('lastUpdated', now).set('error', action.payload.response.statusText)

        case `${PUT_UPDATE}_PENDING`:
            return state.set('isFetching', true).delete('error')

        case `${PUT_UPDATE}_FULFILLED`:
            return state
            .set('isFetching', false).set('lastUpdated', now)
            .updateIn(['data', 'lights'], lights => {
                return lights.map(light => {
                    if (light.get('lightId') === action.payload.data.lightId) {
                        return light.set('state', action.payload.data.state)
                    } else {
                        return light
                    }
                })
            })

        case `${PUT_UPDATE}_REJECTED`:
            return state.set('isFetching', false).set('lastUpdated', now).set('error', action.payload.statusText)

        default:
            return state
    }
}

export default lightsReducer
