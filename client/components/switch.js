import React, { Component, PropTypes } from 'react'
import classes from 'classnames'

import 'styles/components/switch'

class Switch extends Component {
    constructor(props) {
        super(props)

        this.state = this.props.state
    }

    handleSwitchClick() {
        let newState = this.state
        newState.on = !this.state.on
        this.setState(newState)
        this.props.handleClick(this.state.on)
    }

    render() {
        return (
            <button className={classes('switch', { 'switch--on': this.state.reachable && this.state.on })} disabled={!this.state.reachable} onClick={this.handleSwitchClick.bind(this)}>
                <span className="switch__container">
                    <span className="switch__state">{this.state.reachable && this.state.on ? 'On' : 'Off'}</span>
                </span>
            </button>
        )
    }
}

Switch.propTypes = {
    handleClick: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired
}

export default Switch
