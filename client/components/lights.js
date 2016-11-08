import React, { PropTypes } from 'react'
// import { Link } from 'react-router'
import ScreenContent from 'components/screen-content'
import ScreenHeader from 'components/screen-header'
import LightControl from 'components/light-control'

import 'styles/components/lights'

const Lights = ({ lights }) =>
    <div className="lights">
        <ScreenHeader backUrl="/dashboard" title="Lights" />
        <ScreenContent>
            {lights.data.rooms.map((room, index) =>
                <div className="lights__group" key={index}>
                    <h3>{room.name}</h3>
                    {room.lights.map(lightId => lights.data.lights.find(light => light.lightId === lightId)).map((light, index) => <LightControl key={index} {...light} />)}
                </div>
            )}
        </ScreenContent>
    </div>

Lights.propTypes = {
    lights: PropTypes.object.isRequired
}

export default Lights
