import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Icon from 'components/icon'

import 'styles/components/module'

const Module = ({ icon, title, primary, secondary, unit, url }) =>
    <article className="module">
        <Link to={url} className="module__link">
            <h2 className="module__title">{title}</h2>
            <div className="module__inner">
                <div className="module__icon">
                    <Icon image={icon}/>
                </div>
                <div className="module__content">
                    <p className="module__primary">{primary}<span className="module__unit">&nbsp;{unit}</span></p>
                    <p className="module__secondary">{secondary}</p>
                </div>
            </div>
        </Link>
    </article>

Module.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string,
    unit: PropTypes.string,
    url: PropTypes.string
}

export default Module
