import { applyMiddleware, bindActionCreators, combineReducers, createStore } from 'redux'
import createLogger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import * as reducers from 'reducers'

const store = createStore(
    combineReducers(reducers),
    __DEV__ ? applyMiddleware(thunk, promiseMiddleware(), createLogger()) : applyMiddleware(thunk, promiseMiddleware())
)

const mapDispatchToProps = actions => dispatch => Object.keys(actions).reduce((obj, key) => {
    obj.actions[key.replace('Actions', '').toLowerCase()] = bindActionCreators(actions[key], dispatch)

    return obj
}, { actions: {} })

const mapStateToProps = properties => store => properties.reduce((obj, property) => {
    if (store.hasOwnProperty(property)) {
        obj[property] = store[property].toJS()
    } else {
        console && console.error(`Cannot read '${property}' in store`)
    }

    return obj
}, {})

export { mapDispatchToProps, mapStateToProps, store as default }
