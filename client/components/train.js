import React, { PropTypes } from 'react'
import classes from 'classnames'
import moment from 'moment'
import Icon from 'components/icon'

import 'styles/components/train'

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

const Train = ({ arrival, departure, isCancelled, isDelayed, platform }) =>
    <article className={classes('train', { 'train--cancelled': isCancelled, 'train--delayed': isDelayed })}>
        <TrainLocation isCancelled={isCancelled} location={departure} platform={platform || 'TBC'} />
        <div className="train__separator"><Icon name="forward" /></div>
        <TrainLocation isCancelled={isCancelled} location={arrival} />
    </article>

Train.propTypes = {
    arrival: PropTypes.object.isRequired,
    departure: PropTypes.object.isRequired,
    isCancelled: PropTypes.bool.isRequired,
    isDelayed: PropTypes.bool.isRequired,
    platform: PropTypes.string
}

export default Train
