import React, { Component, PropTypes } from 'react'

class ScreenContainer extends Component {
    componentDidMount() {
        setTimeout(() => this._root.classList.add('app__screen--display'), 0)
    }

    componentWillLeave(callback) {
        this._root.addEventListener('transitionend', callback)
        this._root.classList.remove('app__screen--display')
    }

    render() {
        return <div className="app__screen" ref={(c) => this._root = c}>{this.props.children}</div>
    }
}

ScreenContainer.propTypes = {
    children: PropTypes.element,
    location: PropTypes.object
}

export default ScreenContainer
