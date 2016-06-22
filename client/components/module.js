import React, { PropTypes } from 'react'
import moment from 'moment'
import Icon from 'components/icon'

import 'styles/components/module'

const Module = (props) => {
    let description = null
    let updated = null

    if (props.description instanceof Array) {
        description = (
            <ul>
                {props.description.map((item, index) => <li key={index}>{item.label}: <strong>{item.value}</strong></li>)}
            </ul>
        )
    } else {
        description = <p>{props.description}</p>
    }

    if (props.updated) {
        updated = <p className="module__updated">Updated {moment.utc(props.updated).local().fromNow()}</p>
    }

    return (
        <article className="module">
            <div className="module__content">
                <h2 className="module__title">{props.title}</h2>
                <div className="module__description">{description}</div>
                <div className="module__details">{props.children}</div>
                {updated}
            </div>
            <div className="module__icon">
                <Icon image={props.icon} />
            </div>
        </article>
    )
}

Module.propTypes = {
    children: PropTypes.element,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.any.isRequired,
    updated: PropTypes.number
}

export default Module
