import React, { PropTypes } from 'react'
import ScreenContent from 'components/screen-content'
import ScreenHeader from 'components/screen-header'
import Train from 'components/train'

const Trains = ({ trains }) =>
    <div className="trains">
        <ScreenHeader backUrl="/dashboard" title="Trains" />
        <ScreenContent>{trains.data.services.map((service, index) => <Train key={index} {...service} />)}</ScreenContent>
    </div>

Trains.propTypes = {
    trains: PropTypes.object.isRequired
}

export default Trains
