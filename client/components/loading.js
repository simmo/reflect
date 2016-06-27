import React, { PropTypes } from 'react'

import 'styles/components/loading'

const Loading = ({ message }) =>
    <div className="loading">
        <p className="loading__message">{message}</p>
    </div>

Loading.propTypes = {
    message: PropTypes.string
}

Loading.defaultProps = {
    message: 'Loading...'
}

export default Loading
