import React, { PropTypes } from 'react'
import Module from 'components/module'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Weather = ({ data, lastUpdated }) => {
    // Feels like
    let feelsLike = ''
    if (data.feelsLike < data.temperature.current) { // Hotter
        feelsLike = ', but feels a little cooler'
    } else if (data.feelsLike > data.temperature.current) {
        feelsLike = ', but feels a little hotter'
    }

    // Rain
    let rainWarning = data.rain > 20 ? ' - take an umbrella' : ''

    const description = <span>{data.description}, currently <strong>{data.temperature.current}&deg;</strong>{feelsLike} with <strong>{data.rain}%</strong> chance of rain{rainWarning}.</span>

    return (
        <Module title="Weather" description={description} icon={data.icon} updated={lastUpdated} />
    )
}

const mapStateToProps = store => store.weather.toJS()

// const mapDispatchToProps = dispatch => ({
//     actions: bindActionCreators(WeatherActions, dispatch)
// })

Weather.propTypes = {
    // actions: PropTypes.object.isRequired,
    data: PropTypes.object,
    error: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    location: PropTypes.string.isRequired
}

export default connect(mapStateToProps/*, mapDispatchToProps*/)(Weather)
