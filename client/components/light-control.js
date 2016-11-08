import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as HueActions from 'actions/hue'
import { mapDispatchToProps } from 'utilities/store'
import Switch from 'components/switch'
import throttle from 'lodash.throttle'

import 'styles/components/light-control'

const LightControl = ({ actions, lightId, name, state }) => {
    const maxBrightness = 254
    const brightnessPercentage = Math.round((state.bri / maxBrightness) * 100)
    const handleBrightnessChange = throttle(event => actions.hue.putUpdate(`lights/${lightId}/state`, {
        bri: Math.round((event.target.value / 100) * maxBrightness)
    }), 100)
    const handleToggleChange = throttle(on => actions.hue.putUpdate(`lights/${lightId}/state`, { on }), 100)

    return (
        <article className="light-control">
            <h4 className="light-control__name">{name}</h4>
            <p className="light-control__switch"><Switch state={state} handleClick={handleToggleChange} /></p>
            <p><input onChange={handleBrightnessChange} className="light-control__range" type="range" min="0" max="100" disabled={!state.reachable || !state.on} defaultValue={brightnessPercentage} /></p>
        </article>
    )
}

LightControl.propTypes = {
    actions: PropTypes.object.isRequired,
    lightId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    state: PropTypes.object.isRequired
}

export default connect(
    null,
    mapDispatchToProps({ HueActions })
)(LightControl)
