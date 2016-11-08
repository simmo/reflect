import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from 'utilities/store'
import Wifi from 'components/wifi'
import screen from 'components/screen'

const WifiContainer = ({ wifi }) => <Wifi stats={wifi} />

WifiContainer.propTypes = {
    wifi: PropTypes.object.isRequired
}

export default connect(mapStateToProps(['wifi']))(screen(WifiContainer))
