import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Module from 'components/module'

const Train = (props) => {
    return (
        <tr>
            <td>{moment(props.scheduledTime).format('HH:mm')}</td>
            <td>{props.status}</td>
        </tr>
    )
}

Train.propTypes = {
    scheduledTime: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
}

const Trains = ({ trains }) => {
    return (
        <Module title="Trains" description={trains.data.summary} icon="train" updated={trains.lastUpdated}>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {trains.data && trains.data.services.map((train, key) => <Train {...train} key={key} />)}
                </tbody>
            </table>
        </Module>
    )
}

Trains.propTypes = {
    trains: PropTypes.object.isRequired
}

const mapStateToProps = store => ({
    trains: store.trains.toJS()
})

const mapDispatchToProps = () => ({
    actions: {}
})

export default connect(mapStateToProps, mapDispatchToProps)(Trains)
