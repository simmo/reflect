import React, { PropTypes } from 'react'
import classes from 'classnames'
import Header from 'components/header'

// import 'styles/components/wifi'

const Wifi = ({ attenuation, speed }) =>
    <article className={classes('wifi')}>
        <Header>Attenuation</Header>
        <p>Down: {attenuation.downstream}</p>
        <p>Up: {attenuation.upstream}</p>

        <Header>Speed</Header>
        <p>Down: {speed.downstream}</p>
        <p>Up: {speed.upstream}</p>
    </article>

Wifi.propTypes = {
    attenuation: PropTypes.object.isRequired,
    speed: PropTypes.object.isRequired
}

export default Wifi
