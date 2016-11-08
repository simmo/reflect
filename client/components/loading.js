import React, { PropTypes } from 'react'

import 'styles/components/loading'

const Loading = ({ message }) =>
    <div className="loading">
        <span className="loading__message">{message}</span>
    </div>

Loading.defaultProps = {
    message: 'Loading...'
}

Loading.propTypes = {
    message: PropTypes.string.isRequired
}

export default Loading
