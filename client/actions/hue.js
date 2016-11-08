import axios from 'axios'
import { FETCH_LIGHTS, PUT_UPDATE } from 'constants/hue'

export const fetchLights = () => {
    return dispatch => dispatch({
        type: FETCH_LIGHTS,
        payload: axios.get('/api/hue')
    }).catch(() => {})
}

export const putUpdate = (path, data) => {
    return dispatch => dispatch({
        type: PUT_UPDATE,
        payload: axios.put(`/api/hue/${path}`, { data }, { responseType: 'json' })
    }).catch(() => {})
}
