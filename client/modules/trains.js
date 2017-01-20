import axios from 'axios'
import { createReducer, storeRequiresReload } from 'utilities/store'

const LOAD           = 'reflect/trains/LOAD'
const LOAD_PENDING   = 'reflect/trains/LOAD_PENDING'
const LOAD_REJECTED  = 'reflect/trains/LOAD_REJECTED'
const LOAD_FULFILLED = 'reflect/trains/LOAD_FULFILLED'

const initialState = {
    isFetching: false,
    data: null,
    lastUpdated: null,
    error: null
}

export default createReducer(initialState, {
    [LOAD_PENDING](state) {
        return {
            ...state,
            isFetching: true
        }
    },
    [LOAD_FULFILLED](state, action) {
        return {
            ...state,
            isFetching: false,
            lastUpdated: Date.now(),
            data: action.payload.data
        }
    },
    [LOAD_REJECTED](state, action) {
        return {
            ...state,
            isFetching: false,
            lastUpdated: Date.now(),
            error: action.payload.response ? { code: action.payload.response.status, message: action.payload.response.statusText } : { code: 500, message: action.payload.message }
        }
    }
})

export function load() {
    return (dispatch, getState) => {
        const state = getState()

        if (!storeRequiresReload(state.trains)) {
            return Promise.resolve()
        }

        return dispatch({
            type: LOAD,
            payload: () => axios.get('/api/trains')
        })
    }
}
