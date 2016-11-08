import React, { PropTypes } from 'react'
import ScreenContent from 'components/screen-content'
import ScreenHeader from 'components/screen-header'
import { toMbps } from 'utilities/format'

const Wifi = ({ stats }) =>
    <div className="wifi">
        <ScreenHeader backUrl="/dashboard" title="WiFi" />
        <ScreenContent>
            <h3>Speed</h3>
            <ul>
                <li>{toMbps(stats.data.speed.downstream)}</li>
                <li>{toMbps(stats.data.speed.upstream)}</li>
            </ul>
            <h3>Attenuation</h3>
            <ul>
                <li>{stats.data.attenuation.downstream}</li>
                <li>{stats.data.attenuation.upstream}</li>
            </ul>
        </ScreenContent>
    </div>

Wifi.propTypes = {
    stats: PropTypes.object.isRequired
}

export default Wifi
