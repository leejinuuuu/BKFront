import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import createSaga from "../utils/createSaga";
import {LIKED_POST_FAILURE, LIKED_POST_REQUEST, LIKED_POST_SUCCESS} from "../config/event/eventName/postEvent";
import axios from "axios";

const watchGetPost = createSaga("LOAD_ALL_POST", "http://localhost:8081/posts", "get");

const watchGetPostWithComment = createSaga("SHOW_MODAL", "http://localhost:8081/fullpost", "get");

const watchUploadPost = createSaga("UPLOAD_POST", "http://localhost:8081/upload", "post");

const watchLikedPost = createSaga("LIKED_POST", "http://localhost:8081/post/like", "post");

const watchUnLikedPost = createSaga("UNLIKED_POST", "http://localhost:8081/post/unlike", "post");

export default function* postSaga() {
  yield all([
    fork(watchGetPost),
    fork(watchGetPostWithComment),
    fork(watchUploadPost),
    fork(watchLikedPost),
    fork(watchUnLikedPost)
  ]);
}