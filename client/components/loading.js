import React from 'react'

import 'styles/components/loading'

const Loading = props =>
    <div className="loading">
        <p className="loading__message">{props.message}</p>
    </div>

Loading.propTypes = {
    message: React.PropTypes.string
}

Loading.defaultProps = {
    message: 'Loading...'
}

export default Loading
