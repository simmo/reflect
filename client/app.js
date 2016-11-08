import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import App from 'components/app'
import Lock from 'components/lock'
import Dashboard from 'components/dashboard'
import LightsContainer from 'containers/lights-container'
import Settings from 'components/settings'
import RoomContainer from 'containers/room-container'
import TrainsContainer from 'containers/trains-container'
import WeatherContainer from 'containers/weather-container'
import WifiContainer from 'containers/wifi-container'
import NoMatch from 'components/no-match'
import { Provider } from 'react-redux'
import store from 'utilities/store'

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/lock" component={Lock} />
            <Route path="/" component={App}>
                <Route path="/dashboard" component={Dashboard}>
                    <Route path="/lights" component={LightsContainer}>
                        <Route path="room/:roomId" component={RoomContainer} />
                    </Route>
                    <Route path="/trains" component={TrainsContainer} />
                    <Route path="/weather" component={WeatherContainer} />
                    <Route path="/wifi" component={WifiContainer} />
                </Route>
                <Route path="/settings" component={Settings} />
            </Route>
            <Route path="*" component={NoMatch} />
        </Router>
    </Provider>,
    document.getElementById('react')
)
