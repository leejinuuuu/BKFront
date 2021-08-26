import {all, fork} from 'redux-saga/effects';

import createSaga from "../utils/createSaga";
import {GOOGLE_AUTH_CODE_REQUEST} from "../config/event/eventName/userEvent";

const watchLogin = createSaga("LOGIN", "http://localhost:8000/foo/login", "post")

const watchLoadGoogleProfile = createSaga("GOOGLE_LOAD_USER", "http://localhost:8000/foo/user", "get")

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLoadGoogleProfile)
    ]);
}