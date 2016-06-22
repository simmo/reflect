import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import * as reducers from 'reducers'

const store = createStore(
    combineReducers(reducers),
    __DEV__ ? applyMiddleware(thunk, promiseMiddleware(), createLogger()) : applyMiddleware(thunk, promiseMiddleware())
)

export default store
