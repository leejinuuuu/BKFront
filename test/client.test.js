import withReduxSaga from '..'

import FunctionalComponent from './components/functional-component'

import wrapper from './store/store-wrapper'

import createSnapshot from './utils/create-snapshot'

test('Wrapped component passes along React props', () => {
    const WrappedComponent = wrapper.withRedux(
        withReduxSaga(FunctionalComponent),
    )

    createSnapshot(WrappedComponent)
})