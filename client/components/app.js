import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Module from 'components/module'
import Loading from 'components/loading'
import Summary from 'components/summary'
import * as TimeActions from 'actions/time'
import * as TrainActions from 'actions/trains'
import * as WeatherActions from 'actions/weather'
import * as WifiActions from 'actions/wifi'

import 'styles/components/app'

const LOCATION_DEFAULT = '50.9977,-0.1037'

class App extends Component {
    componentWillMount() {
        // Fetch weather
        this.fetchWeather()
        setInterval(this.fetchWeather.bind(this), 1000)

        // Fetch WiFi
        this.fetchWifi()
        setInterval(this.fetchWifi.bind(this), 1000)

        // Fetch Trains
        this.fetchTrains()
        setInterval(this.fetchTrains.bind(this), 1000)

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
            this.props.actions.weather.fetchWeather(LOCATION_DEFAULT)
        }
    }

    render() {
        if (this.props.weather.data && this.props.wifi.data && this.props.trains.data) {
            return (
                <section className="app">
                    <div className="app__summary">
                        <Summary />
                    </div>
                    <div className="app__modules">
                        <div className="app__module-wrap">
                            <Module title="WiFi" description={this.props.wifi.data} icon="wifi" updated={this.props.wifi.lastUpdated} />
                            <Module title="Trains" description={this.props.trains.data} icon="train" />
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
    actions: React.PropTypes.object.isRequired,
    time: React.PropTypes.object,
    trains: React.PropTypes.object,
    weather: React.PropTypes.object,
    wifi: React.PropTypes.object
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
