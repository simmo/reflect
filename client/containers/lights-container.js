import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from 'utilities/store'
import Lights from 'components/lights'
import screen from 'components/screen'

const LightsContainer = ({ hue }) =>
    <Lights lights={hue} />

LightsContainer.propTypes = {
    hue: PropTypes.object.isRequired
}

export default connect(mapStateToProps(['hue']))(screen(LightsContainer))
