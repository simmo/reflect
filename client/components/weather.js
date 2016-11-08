import React from 'react'
import ScreenContent from 'components/screen-content'
import ScreenHeader from 'components/screen-header'

const Weather = () =>
    <div className="weather">
        <ScreenHeader backUrl="/dashboard" title="Weather" />
        <ScreenContent>
            <h2>Today</h2>
            <h2>Tomorrow</h2>
            <h2>Next 5 days</h2>
        </ScreenContent>
    </div>

export default Weather
