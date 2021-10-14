import {all, fork} from 'redux-saga/effects';

import createSaga from "../utils/createSaga";

const watchLogIn = createSaga("LOGIN", "http://localhost:8081/login", "post");

const watchLogOut = createSaga("LOGOUT", "http://localhost:8081/logout", "get");

const watchSignUp  = createSaga("SIGNUP", "http://localhost:8081/signup", "post");

const watchLoadUser = createSaga("LOAD_USER", "http://localhost:8081/user", "get");

const watchLoadMyProfile = createSaga("LOAD_MY_PROFILE", "http://localhost:8081/profile", "get");

const watchEmailAuth = createSaga("AUTH_WITH_EMAIL", "http://localhost:8081/email", "post");

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLoadUser),
    fork(watchSignUp),
    fork(watchLogOut),
    fork(watchLoadMyProfile),
    fork(watchEmailAuth)
  ]);
}