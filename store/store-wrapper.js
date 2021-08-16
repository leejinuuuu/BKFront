import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'

import rootReducer from '../reducer/root-reducer'
import rootSaga from '../saga/root-saga'

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV === 'development') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

const makeStore = context => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        bindMiddleware([sagaMiddleware]),
    );

    store.sagaTask = sagaMiddleware.run(rootSaga)

    return store
}

const wrapper = createWrapper(makeStore, { debug: true })

export default wrapper