import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from 'utilities/store'
import Weather from 'components/weather'
import screen from 'components/screen'

const WeatherContainer = ({ weather }) => <Weather weather={weather} />

WeatherContainer.propTypes = {
    weather: PropTypes.object.isRequired
}

export default connect(mapStateToProps(['weather']))(screen(WeatherContainer))
