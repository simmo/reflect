import React, { PropTypes } from 'react'

import 'styles/components/time'

const Time = (props) =>
    <p className="time">
        <span className="time__day">{props.day}</span> <span>{props.hours}</span><span className="time__separator">:</span><span className="time__minutes">{props.minutes}</span>
    </p>

Time.propTypes = {
    day: PropTypes.string.isRequired,
    hours: PropTypes.string.isRequired,
    minutes: PropTypes.string.isRequired
}

export default Time
