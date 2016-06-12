import React from 'react'
import classnames from 'classnames'
import moment from 'moment'
import Icon from 'components/icon'
import Time from 'components/time'
import { connect } from 'react-redux'

import 'styles/components/summary'
import 'styles/components/module'

const Summary = (props) => {
    let sunriseMoment = moment.unix(props.weather.data.sunrise)
    let sunsetMoment = moment.unix(props.weather.data.sunset)
    let nowMoment = moment.utc(props.time.timestamp)

    let classes = classnames('summary', {
        'summary--night': !(nowMoment.isAfter(sunriseMoment) && nowMoment.isBefore(sunsetMoment))
    })

    return (
        <header className={classes}>
            <div className="summary__weather-primary">
                <p className="summary__icon-value">
                    <span className="summary__icon"><Icon image={props.weather.data.icon} /></span>
                    <span className="summary__value">{props.weather.data.temperature.current}&deg;</span>
                </p>
            </div>
            <div className="summary__time">
                <Time {...props.time} />
            </div>
            <div className="summary__weather-secondary">
                <p className="summary__icon-value">
                    <span className="summary__icon"><Icon image="umbrella" /></span>
                    <span className="summary__value">{props.weather.data.rain}%</span>
                </p>
                <p className="summary__icon-value">
                    <span className="summary__icon"><Icon image="thermometer" /></span>
                    <span className="summary__value">{props.weather.data.humidity}%</span>
                </p>
            </div>
        </header>
    )
}

const mapStateToProps = store => ({
    time: store.time.toJS(),
    weather: store.weather.toJS()
})

Summary.propTypes = {
    time: React.PropTypes.object.isRequired,
    weather: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Summary)
