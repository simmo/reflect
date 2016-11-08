import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classes from 'classnames'
import Module from 'components/module'
import screen from 'components/screen'
import { mapStateToProps } from 'utilities/store'
import { pluralise, toMbps, toUppercaseFirst } from 'utilities/format'

import 'styles/components/dashboard'

const Dashboard = ({ hue, time, trains, weather, wifi }) => {
    const dashboardCssClasses = classes('dashboard', {
        'dashboard--standalone': window.navigator.standalone,
        'dashboard--twilight': time.isTwilight,
        'dashboard--day': time.isDay,
        'dashboard--night': time.isNight
    })

    return (
        <section className={dashboardCssClasses}>
            <header className="dashboard__header">
                <h1 className="dashboard__time">{time.hours}:{time.minutes}</h1>
                <h2 className="dashboard__date">{time.day} {time.date}</h2>
            </header>

            <div className="dashboard__modules">
                <Module icon="light-bulb" url="/lights" name="Lights" description={hue.error ? hue.error : `${hue.data.stats.lights.on} ${pluralise(hue.data.stats.lights.on, 'light is', 'lights are')} on`} />
                <Module icon="wifi" url="/wifi" name="WiFi" description={wifi.error ? wifi.error : `${toMbps(wifi.data.speed.downstream)} down, ${toMbps(wifi.data.speed.upstream)} up`} />
                <Module icon="train" url="/trains" name="Trains" description={trains.data.summary} />
                <Module icon={weather.data.icon} url="/weather" name="Weather" description={toUppercaseFirst(weather.data.description)} />
            </div>
        </section>
    )
}

Dashboard.propTypes = {
    children: PropTypes.element,
    hue: PropTypes.object.isRequired,
    time: PropTypes.object.isRequired,
    trains: PropTypes.object.isRequired,
    weather: PropTypes.object.isRequired,
    wifi: PropTypes.object.isRequired
}

export default connect(mapStateToProps(['hue', 'time', 'trains', 'weather', 'wifi']))(screen(Dashboard))
