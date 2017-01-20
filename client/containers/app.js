import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { mapStateToProps, mapDispatchToProps } from 'utilities/store'
import { calculateTimeOfDay, fetchCoords, lock, unlock } from 'modules/app'
import Unlock from 'components/unlock'

import 'styles/components/app'

class App extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        app: PropTypes.object.isRequired,
        children: PropTypes.any
    }

    static settings = {
        timeout: 1000 * 60,
        events: ['mousemove', 'keydown', 'wheel', 'DOMMouseScroll', 'mouseWheel', 'mousedown', 'touchstart', 'touchmove', 'MSPointerDown', 'MSPointerMove']
    }

    state = {
        idle: false,
        lastActive: new Date(),
        timer: null,
        pageX: null,
        pageY: null
    }

    componentWillMount() {
        // Add activity listeners
        // App.settings.events.forEach(event => document.addEventListener(event, this._handleEvent.bind(this)))

        this.timeOfDay()
    }

    timeOfDay() {
        this.props.actions.fetchCoords().then(() => {
            if (!this.props.app.location.data) {
                return
            }

            const { latitude, longitude } = this.props.app.location.data

            this.props.actions.calculateTimeOfDay(latitude, longitude)
        })
    }

    componentWillUnmount() {
        // Remove activity listeners
        App.settings.events.forEach(event => document.removeEventListener(event, this._handleEvent.bind(this)))

        clearTimeout(this.timeout)
        clearTimeout(this.state.timer)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.app !== nextProps.app) {

            clearTimeout(this.timeout)

            // Recheck time of day every 5 minutes
            this.timeout = setTimeout(this.timeOfDay.bind(this), 1000 * 60 * 5)
        }
    }

    renderContent() {
        if (this.props.app.locked) {
            return <Unlock handleUnlock={this.props.actions.unlock} />
        } else {
            return this.props.children
        }
    }

    render() {
        const { app } = this.props
        const classes = classnames('app', {
            'app--standalone': window.navigator.standalone,
            'app--twilight': app.dayPeriod.isTwilight,
            'app--day': app.dayPeriod.isDay,
            'app--night': app.dayPeriod.isNight,
            'app--locked': app.locked
        })

        return (
            <div className={classes}>
                <div className="app__background" />
                <div className="app__screen">{this.renderContent()}</div>
            </div>
        )
    }

    _handleEvent(event) {
        if (event.type === 'mousemove') {
            if (typeof event.pageX === 'undefined' && typeof event.pageY === 'undefined') {
                return
            }

            if (event.pageX === this.state.pageX && event.pageY === this.state.pageY) {
                return
            }

            if (new Date() - this.state.lastActive < 200) {
                return
            }
        }

        if (this.state.timer) {
            clearTimeout(this.state.timer)
        }

        this.setState({
            lastActive: new Date(),
            pageX: event.pageX,
            pageY: event.pageY,
            timer: setTimeout(this.props.actions.lock, App.settings.timeout)
        })
    }
}

export default connect(mapStateToProps(['app']), mapDispatchToProps({ calculateTimeOfDay, fetchCoords, lock, unlock }))(App)
