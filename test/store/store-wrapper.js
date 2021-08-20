import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'

import rootReducer from '../store/root-reducer'
import rootSaga from '../store/root-saga'

const makeStore = context => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        applyMiddleware(sagaMiddleware),
    );

    store.sagaTask = sagaMiddleware.run(rootSaga)

    return store
}

const wrapper = createWrapper(makeStore, { debug: true })

export default wrapper