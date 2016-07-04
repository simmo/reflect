import React, { PropTypes } from 'react'
import classes from 'classnames'
import moment from 'moment'

import 'styles/components/train'

const Train = ({ arrival, departure, isCancelled, isDelayed, platform }) => {
    const estimatedDeparture = isDelayed && departure.estimated ? <span className="train__status">{moment(departure.estimated).format('HH:mm')}</span> : null

    const cssClasses = classes('train', {
        'train--cancelled': isCancelled
    })

    return (
        <tr className={cssClasses}>
            <td>
                {moment(departure.scheduled).format('HH:mm')}
                {estimatedDeparture}
            </td>
            <td>{arrival.name}<br/><span className="train__status">{departure.status}</span></td>
            <td>{platform}</td>
        </tr>
    )
}

Train.propTypes = {
    arrival: PropTypes.object.isRequired,
    departure: PropTypes.object.isRequired,
    isCancelled: PropTypes.bool.isRequired,
    isDelayed: PropTypes.bool.isRequired,
    platform: PropTypes.string
}

export default Train
