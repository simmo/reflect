import axios from 'axios'
import { FETCH_STATS } from 'constants/wifi'

export const fetchStats = () => {
    return dispatch => dispatch({
        type: FETCH_STATS,
        payload: axios.get('/wifi')
    }).catch(() => {})
}
