import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Home = ({ children }) =>
    <div>
        <h1>Home</h1>
        {children}
    </div>

Home.propTypes = {
    children: PropTypes.element
}

export default Home
