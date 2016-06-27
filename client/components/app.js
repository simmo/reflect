import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Module from 'components/module'
import Loading from 'components/loading'
import Weather from 'components/weather'
import Trains from 'components/trains'
import * as TimeActions from 'actions/time'
import * as TrainActions from 'actions/trains'
import * as WeatherActions from 'actions/weather'
import * as WifiActions from 'actions/wifi'
import classes from 'classnames'
import Icon from 'components/icon'

import 'styles/components/app'

const LOCATION_DEFAULT = ['50.9977', '-0.1037']
const TIME_15_MINS = (1000 * 60) * 15 // 15 mins

class App extends Component {
    componentWillMount() {
        // Fetch weather
        this.fetchWeather()
        setInterval(this.fetchWeather.bind(this), TIME_15_MINS)

        // Fetch WiFi
        this.fetchWifi()
        setInterval(this.fetchWifi.bind(this), TIME_15_MINS)

        // Fetch Trains
        this.fetchTrains()
        setInterval(this.fetchTrains.bind(this), TIME_15_MINS)

        // Update time
        setInterval(() => this.props.actions.time.updateTime(Date.now()), 1000)
    }

    fetchTrains() {
        if (!this.props.trains.isFetching && (Date.now() - this.props.trains.lastUpdated) / 1000 > 900) {
            this.props.actions.trains.fetchTrains()
        }
    }

    fetchWifi() {
        if (!this.props.wifi.isFetching && (Date.now() - this.props.wifi.lastUpdated) / 1000 > 3600) {
            this.props.actions.wifi.fetchStats()
        }
    }

    fetchWeather() {
        if (!this.props.weather.isFetching && (Date.now() - this.props.weather.lastUpdated) / 1000 > 3600) {
            this.props.actions.weather.fetchWeather(LOCATION_DEFAULT.join(','))
        }
    }

    render() {
        const { time, weather, wifi, trains } = this.props

        const cssClasses = classes('app', {
            'app--standalone': window.navigator.standalone,
            'app--twilight': time.isTwilight,
            'app--day': time.isDay,
            'app--night': time.isNight
        })

        if (weather.data && wifi.data && trains.data) {
            return (
                <section className={cssClasses}>
                    <header className="app__header">
                        <nav className="app__nav">
                            <h1 className="app__location">3 Oakdene</h1>
                            <button className="app__settings">
                                <Icon image="cog" />Settings
                            </button>
                            <button className="app__toggle-mode">Lock</button>
                        </nav>
                        <div className="app__summary">
                            <p className="app__time">{time.hours}:{time.minutes}</p>
                            <p className="app__date">{time.day}, {time.date}</p>
                        </div>
                    </header>
                    <div className="app__modules">
                        <div className="app__module-wrap">
                            <Weather />
                            <Module title="WiFi" description={wifi.data} icon="wifi" updated={wifi.lastUpdated} />
                            <Trains />
                        </div>
                    </div>
                </section>
            )
        } else {
            return (
                <div className="app">
                    <Loading message="Loading data..." />
                </div>
            )
        }
    }
}

App.propTypes = {
    actions: PropTypes.object.isRequired,
    time: PropTypes.object,
    trains: PropTypes.object,
    weather: PropTypes.object,
    wifi: PropTypes.object
}

const mapStateToProps = store => ({
    time: store.time.toJS(),
    trains: store.trains.toJS(),
    weather: store.weather.toJS(),
    wifi: store.wifi.toJS()
})

const mapDispatchToProps = dispatch => ({
    actions: {
        time: bindActionCreators(TimeActions, dispatch),
        trains: bindActionCreators(TrainActions, dispatch),
        weather: bindActionCreators(WeatherActions, dispatch),
        wifi: bindActionCreators(WifiActions, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
