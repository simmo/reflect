import React, { Component } from 'react'
import classnames from 'classnames'
import Icon from 'components/icon'
import Loading from 'components/loading'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as WeatherActions from 'actions/weather'

import 'styles/components/weather'

class Weather extends Component {
    componentWillMount() {
        // Fetch weather
        this.fetchWeather()
        setInterval(this.fetchWeather.bind(this), 1000)
    }

    fetchWeather() {
        if (!this.props.isFetching && (Date.now() - this.props.lastUpdated) / 1000 > 3600) {
            this.props.actions.fetchWeather(this.props.location)
        }
    }

    render() {
        let { isFetching, data, error } = this.props
        let cssClasses = classnames('weather', {
            'weather--loading': isFetching,
            'weather--error': !!error
        })

        if (error) {
            return (
                <div className={cssClasses}>
                    <p>Error: {error}</p>
                </div>
            )
        } else if (!isFetching && data) {
            return (
                <div className={cssClasses}>
                    <div className="weather__temp">
                        <p className="weather__current">{data.temperature.current}&deg;</p>
                        <div className="weather__icon"><Icon image={data.icon} /></div>
                    </div>
                    <p className="weather__description">{data.description}</p>
                    <div className="weather__range">
                        <p className="weather__min">Min: {data.temperature.min}&deg;</p>
                        <p className="weather__max">Max: {data.temperature.max}&deg;</p>
                    </div>
                    <div className="weather__sunlight">
                        <p className="weather__sunrise">Sunrise: {data.sunrise}</p>
                        <p className="weather__sunset">Sunset: {data.sunset}</p>
                    </div>
                    <p className="weather__rain-chance">Chance of rain: {data.rain}%</p>
                </div>
            )
        } else {
            return (
                <div className={cssClasses}>
                    <Loading message="Loading weather..." />
                </div>
            )
        }
    }
}

const mapStateToProps = store => store.weather

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(WeatherActions, dispatch)
})

Weather.propTypes = {
    actions: React.PropTypes.object.isRequired,
    data: React.PropTypes.object,
    error: React.PropTypes.string,
    isFetching: React.PropTypes.bool.isRequired,
    lastUpdated: React.PropTypes.number,
    location: React.PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather)
