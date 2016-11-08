import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from 'utilities/store'
import * as HueActions from 'actions/hue'
import * as TimeActions from 'actions/time'
import * as TrainsActions from 'actions/trains'
import * as WeatherActions from 'actions/weather'
import * as WifiActions from 'actions/wifi'
import Loading from 'components/loading'
import FullscreenModal from 'components/fullscreen-modal'

import 'styles/components/app'

const LOCATION_DEFAULT = ['50.9977', '-0.1037']
const TIME_15_MINS = (1000 * 60) * 15 // 15 mins

class App extends Component {
    fetchLights() {
        if (!this.props.hue.isFetching) {
            return this.props.actions.hue.fetchLights()
        }
    }

    fetchTrains() {
        if (!this.props.trains.isFetching) {
            return this.props.actions.trains.fetchTrains()
        }
    }

    fetchWifi() {
        if (!this.props.wifi.isFetching) {
            return this.props.actions.wifi.fetchStats()
        }
    }

    fetchWeather() {
        if (!this.props.weather.isFetching) {
            return this.props.actions.weather.fetchWeather(LOCATION_DEFAULT.join(','))
        }
    }

    componentWillMount() {
        // Update time
        this.props.actions.time.updateTime(Date.now())

        this.fetchLights()
        this.fetchTrains()
        this.fetchWeather()
        this.fetchWifi()

        // Set intervals for more fetching
        setInterval(() => this.props.actions.time.updateTime(Date.now()), 5000)
        setInterval(this.fetchLights.bind(this), TIME_15_MINS)
        setInterval(this.fetchWeather.bind(this), TIME_15_MINS)
        setInterval(this.fetchWifi.bind(this), TIME_15_MINS)
        setInterval(this.fetchTrains.bind(this), TIME_15_MINS)
    }

    render() {
        const content = this.props.hue.lastUpdated && this.props.trains.lastUpdated && this.props.weather.lastUpdated && this.props.wifi.lastUpdated ? this.props.children : <Loading />

        return (
            <div className="app">
                <FullscreenModal hide={document.webkitIsFullScreen || document.mozFullScreen || document.fullScreenEnabled} />
                {content}
            </div>
        )
    }
}

App.propTypes = {
    actions: PropTypes.object.isRequired,
    children: PropTypes.element,
    hue: PropTypes.object.isRequired,
    trains: PropTypes.object.isRequired,
    weather: PropTypes.object.isRequired,
    wifi: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps(['hue', 'time', 'trains', 'weather', 'wifi']),
    mapDispatchToProps({
        HueActions,
        TimeActions,
        TrainsActions,
        WeatherActions,
        WifiActions
    })
)(App)
