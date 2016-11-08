import React, { PropTypes } from 'react'

const ScreenContent = ({ children }) =>
    <div className="screen__content">
        {children}
    </div>

ScreenContent.propTypes = {
    children: PropTypes.any.isRequired
}

export default ScreenContent
