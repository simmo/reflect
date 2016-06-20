import React from 'react'
import ReactDom from 'react-dom'
import App from 'components/app'
import { Provider } from 'react-redux'
import store from 'utilities/store'

if (window.navigator.standalone) {
    document.documentElement.classList.add('standalone')
}

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('react')
)
