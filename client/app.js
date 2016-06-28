import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import App from 'components/app'
import NoMatch from 'components/no-match'
import { Provider } from 'react-redux'
import store from 'utilities/store'

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
            </Route>
            <Route path="*" component={NoMatch} />
        </Router>
    </Provider>,
    document.getElementById('react')
)
