import {all, fork} from 'redux-saga/effects';

import createSaga from "../utils/createSaga";

const watchLogin = createSaga("LOGIN", "http://localhost:8081/login", "post");

const watchSignup  = createSaga("SIGNUP", "http://localhost:8081/signup", "post");

const watchLoadGoogleProfile = createSaga("GOOGLE_LOAD_USER", "http://localhost:8081/user", "get");

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLoadGoogleProfile),
        fork(watchSignup)
    ]);
}