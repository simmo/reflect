import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Icon from 'components/icon'

import 'styles/components/module'

const Module = ({ description, icon, name, url }) =>
    <Link to={url} className="module">
        <span className="module__icon"><Icon name={icon} /></span>
        <h2 className="module__name">{name}</h2>
        {description && <p className="module__description">{description}</p>}
    </Link>

Module.propTypes = {
    description: PropTypes.string,
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}

export default Module
