import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import AppContainer from 'containers/app'
import DashboardContainer from 'containers/dashboard'
import LightsContainer from 'containers/lights'
import TrainsContainer from 'containers/trains'
import WeatherContainer from 'containers/weather'
import WifiContainer from 'containers/wifi'
import NoMatchContainer from 'containers/no-match'
import { Provider } from 'react-redux'
import store from 'utilities/store'
import 'fullscreen-api-polyfill'

import 'styles/app'

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={AppContainer}>
                <IndexRoute component={DashboardContainer} />
                <Route path="/lights" component={LightsContainer} />
                <Route path="/trains" component={TrainsContainer} />
                <Route path="/weather" component={WeatherContainer} />
                <Route path="/wifi" component={WifiContainer} />
                <Route path="*" component={NoMatchContainer} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('react')
)
