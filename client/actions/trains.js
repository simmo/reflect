import axios from 'axios'
import { FETCH_TRAINS } from 'constants/trains'

export const fetchTrains = () => {
    return dispatch => dispatch({
        type: FETCH_TRAINS,
        payload: axios.get('/trains')
    }).catch(() => {})
}
