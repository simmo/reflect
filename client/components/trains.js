import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Screen from 'components/screen'
import moment from 'moment'

import 'styles/components/train'

const Train = ({ departure, arrival, platform, isDelayed }) => {
    let estimatedDeparture = isDelayed && departure.estimated ? <span className="train__status">{moment(departure.estimated).format('HH:mm')}</span> : null

    return (
        <tr>
            <td>
                {moment(departure.scheduled).format('HH:mm')}
                {estimatedDeparture}
            </td>
            <td>{arrival.name}<br/><span className="train__status">{departure.status}</span></td>
            <td>{platform}</td>
        </tr>
    )
}

Train.propTypes = {
    arrival: PropTypes.object.isRequired,
    departure: PropTypes.object.isRequired,
    isDelayed: PropTypes.bool.isRequired,
    platform: PropTypes.string
}

class Trains extends Component {
    render() {
        let { data, lastUpdated } = this.props

        return (
            <Screen title="Trains" lastUpdated={lastUpdated}>
                <table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Platform</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.services.map((train, key) => <Train {...train} key={key} />)}
                    </tbody>
                </table>
            </Screen>
        )
    }
}

Trains.propTypes = {
    data: PropTypes.object.isRequired,
    lastUpdated: PropTypes.number.isRequired
}

const mapStateToProps = store => store.trains.toJS()

const mapDispatchToProps = () => ({
    actions: {}
})

export default connect(mapStateToProps, mapDispatchToProps)(Trains)
