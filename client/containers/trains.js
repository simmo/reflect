import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from 'utilities/store'
import Loading from 'components/loading'
import Error from 'components/error'
import Train from 'components/train'
import { load } from 'modules/trains'
import Screen from 'components/screen'

class TrainsContainer extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        trains: PropTypes.object.isRequired
    }

    componentWillMount() {
        this.props.actions.load()
    }

    render() {
        const { trains } = this.props
        let content = null

        if (trains.isFetching) {
            content = <Loading message="Fetching train times..." />
        } else if (trains.error) {
            content = <Error message="Could not load trains." details={trains.error} cta={this.props.actions.load} />
        } else {
            if (trains.data && trains.data.services.length) {
                content = trains.data.services.map((service, index) => <Train key={index} {...service} />)
            } else {
                content = <Error message="No services found." cta={this.props.actions.load.bind(this)} />
            }
        }

        return <Screen backUrl="/" className="trains" title="Trains">{content}</Screen>
    }
}

export default connect(mapStateToProps(['trains']), mapDispatchToProps({ load }))(TrainsContainer)
