import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classes from 'classnames'
import Icon from 'components/icon'

const ScreenHeader = ({ backUrl, title }) =>
    <header className={classes('screen__header', { 'screen__header--standalone': window.navigator.standalone })}>
        <div className={classes('screen__header-wrap', { 'screen__header-wrap--standalone': window.navigator.standalone })}>
            <p><Link to={backUrl} className="screen__back"><Icon name="back" /></Link></p>
            <h2 className="screen__title">{title}</h2>
        </div>
    </header>

ScreenHeader.propTypes = {
    backUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}

export default ScreenHeader
