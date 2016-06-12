import { UPDATE_TIME } from 'constants/time'

export const updateTime = (time) => ({
    type: UPDATE_TIME,
    payload: time
})
