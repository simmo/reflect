import React, { Component, PropTypes } from 'react'

const CSS_CLASS_DISPLAY = 'app__screen--display'

class ScreenContainer extends Component {
    show() {
        this._root.classList.add(CSS_CLASS_DISPLAY)
    }

    hide() {
        this._root.classList.remove(CSS_CLASS_DISPLAY)
    }

    componentWillAppear(callback) {
        this.show()
        callback()
    }

    componentDidEnter() {
        setTimeout(this.show.bind(this), 50)
    }

    componentWillLeave(callback) {
        this._root.addEventListener('transitionend', callback)
        this.hide()
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
