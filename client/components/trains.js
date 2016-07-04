import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Screen from 'components/screen'
import Train from 'components/train'

const Trains = ({ data, lastUpdated }) =>
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

Trains.propTypes = {
    data: PropTypes.object.isRequired,
    lastUpdated: PropTypes.number.isRequired
}

const mapStateToProps = store => store.trains.toJS()

export default connect(mapStateToProps)(Trains)
