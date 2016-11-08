import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from 'utilities/store'
import Trains from 'components/trains'
import screen from 'components/screen'

const TrainsContainer = ({ trains }) => <Trains trains={trains} />

TrainsContainer.propTypes = {
    trains: PropTypes.object.isRequired
}

export default connect(mapStateToProps(['trains']))(screen(TrainsContainer))
