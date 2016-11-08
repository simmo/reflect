import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from 'utilities/store'
import * as HueActions from 'actions/hue'
import Room from 'components/room'
import screen from 'components/screen'

const RoomContainer = ({ hue, params }) => {
    const room = hue.data.rooms.find(room => room.roomId === params.roomId)
    room.lights = room.lights.map(lightId => hue.data.lights.find(light => light.lightId === lightId))

    return <Room {...room} />
}

RoomContainer.propTypes = {
    hue: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps(['hue']),
    mapDispatchToProps({ HueActions })
)(screen(RoomContainer))
