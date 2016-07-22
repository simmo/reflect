import React, { Component, PropTypes } from 'react'
import ReactTransitionGroup from 'react-addons-transition-group'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Module from 'components/module'
import Loading from 'components/loading'
import ScreenContainer from 'containers/screen'
import * as TimeActions from 'actions/time'
import * as TrainActions from 'actions/trains'
import * as WeatherActions from 'actions/weather'
import * as WifiActions from 'actions/wifi'
import classes from 'classnames'
import Icon from 'components/icon'
import { pluralise, toUppercaseFirst } from 'utilities/format'

import 'styles/components/app'

const LOCATION_DEFAULT = ['50.9977', '-0.1037']
const TIME_15_MINS = (1000 * 60) * 15 // 15 mins

class App extends Component {
    componentWillMount() {
        // Update time
        this.props.actions.time.updateTime(Date.now())

        // Fetch weather
        this.fetchWeather()

        // Fetch WiFi
        this.fetchWifi()

        // Fetch Trains
        this.fetchTrains()
    }

    componentDidMount() {
        setInterval(() => this.props.actions.time.updateTime(Date.now()), 5000)
        setInterval(this.fetchWeather.bind(this), TIME_15_MINS)
        setInterval(this.fetchWifi.bind(this), TIME_15_MINS)
        setInterval(this.fetchTrains.bind(this), TIME_15_MINS)
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
                        <Module title="Wifi" url="/wifi" icon="wifi" primary={(wifi.data.speed.downstream/1000).toFixed(1)} unit="mbps" secondary="Download"/>
                        <Module title="Weather" url="/weather" icon={weather.data.icon} primary={weather.data.temperature.current + 'º'} secondary={toUppercaseFirst(weather.data.description.toLowerCase())}/>
                        <Module title="Trains" url="/trains" icon="train" primary={trains.data.complications.toString()} secondary={pluralise(trains.data.complications, 'Issue', 'Issues')}/>
                    </div>
                    <ReactTransitionGroup component="div">
                        {this.props.children && <ScreenContainer>{this.props.children}</ScreenContainer>}
                    </ReactTransitionGroup>
                </section>
            )
        } else {
            return (
                <section className={cssClasses}>
                    <Loading message="Loading data..."/>
                </section>
            )
        }
    }
}

App.propTypes = {
    actions: PropTypes.object.isRequired,
    children: PropTypes.element,
    time: PropTypes.object,
    trains: PropTypes.object,
    weather: PropTypes.object,
    wifi: PropTypes.object,
    location: PropTypes.object
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
