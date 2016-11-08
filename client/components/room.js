import React, { PropTypes } from 'react'
import ScreenContent from 'components/screen-content'
import ScreenHeader from 'components/screen-header'
import LightControl from 'components/light-control'

const Room = ({ name, lights }) =>
    <div className="room">
        <ScreenHeader backUrl="/lights" title={name} />
        <ScreenContent>
            <h3>Lights</h3>
            {lights.map((light, index) => <LightControl key={index} {...light} />)}
        </ScreenContent>
    </div>

Room.propTypes = {
    lights: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired
}

export default Room
