import React, { PropTypes } from 'react'
import moment from 'moment'

const TrainLocation = ({ isCancelled, location, platform }) =>
    <div className="train__location">
        <h3 className="train__time">{moment(location.scheduled).format('HH:mm')} <span className="train__station">{location.name}</span></h3>
        <div className="train__data">
            <h4>Status</h4>
            <p>{location.status}</p>
        </div>
        {!isCancelled && platform && <div className="train__data">
            <h4>Platform</h4>
            <p>{platform}</p>
        </div>}
    </div>

TrainLocation.propTypes = {
    isCancelled: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    platform: PropTypes.string
}

export default TrainLocation
