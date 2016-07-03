import React, { PropTypes } from 'react'
import Module from 'components/module'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Weather = ({ data, lastUpdated }) => {
    // Feels like
    let feelsLike = ''
    if (data.temperature.feelsLike < data.temperature.current) {
        feelsLike = ' but feels a little cooler'
    } else if (data.temperature.feelsLike > data.temperature.current) {
        feelsLike = ' but feels a little hotter'
    }

    // Precipitation
    let precipitationWarning = data.precipitation.chance > 20 ? ' - take an umbrella' : ''

    // Build description
    const description = (
        <span>
            {data.description}, currently <strong>{data.temperature.current}&deg;</strong>
            {feelsLike} with <strong>{data.precipitation.chance}%</strong> chance of {data.precipitation.type}{precipitationWarning}.
        </span>
    )

    return <Module title="Weather" description={description} icon={data.icon} updated={lastUpdated} />
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
    lastUpdated: PropTypes.number/*,
    location: PropTypes.string.isRequired*/
}

export default connect(mapStateToProps/*, mapDispatchToProps*/)(Weather)
