import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import ReactTransitionGroup from 'react-addons-transition-group'

import 'styles/components/screen'

class ScreenTransitionWrapper extends Component {
    componentWillLeave(callback) {
        // When component wants to leave pass callback to parent
        setTimeout(callback, 1100)
    }

    render() {
        return <div>{this.props.children}</div>
    }
}

ScreenTransitionWrapper.propTypes = {
    children: PropTypes.any
}

function screen(Component) {
    const ScreenWrapper = props =>
        <div className={classnames('screen', { 'screen--sub': !!props.children })}>
            <div className="screen__primary"><Component {...props} /></div>
            <ReactTransitionGroup component="div" className="screen__secondary">
                {props.children && <ScreenTransitionWrapper>{props.children}</ScreenTransitionWrapper>}
            </ReactTransitionGroup>
        </div>

    ScreenWrapper.propTypes = {
        children: PropTypes.element
    }

    return ScreenWrapper
}

export default screen
