import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Icon from 'components/icon'
import moment from 'moment'

import 'styles/components/screen'

const Screen = ({ children, lastUpdated, time, title }) =>
    <section className="screen">
        <header className="screen__header">
            <h1 className="screen__title">{title}</h1>
            <Link to="/" className="screen__back"><Icon image="back"/></Link>
        </header>
        <div className="screen__body">
            {children}
        </div>
        <footer className="screen__footer">
            <p>Last updated {moment(lastUpdated).from(moment(time.timestamp))}</p>
        </footer>
    </section>

Screen.propTypes = {
    children: PropTypes.element.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    time: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
}

const mapStateToProps = store => ({
    time: store.time.toJS()
})

export default connect(mapStateToProps, null)(Screen)
