import axios from 'axios'
import { FETCH_WEATHER } from 'constants/weather'

export const fetchWeather = (location) => {
    return dispatch => dispatch({
        type: FETCH_WEATHER,
        payload: axios.get(`/api/weather/${location}?units=uk2`)
    }).catch(() => {})
}
