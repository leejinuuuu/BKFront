import {all, fork} from 'redux-saga/effects';
import createSaga from "../utils/createSaga";
import {backURL} from "../config/config";

const watchGetPost = createSaga("LOAD_ALL_POST", backURL + "/posts", "get");

const watchUploadPost = createSaga("UPLOAD_POST", backURL + "/upload", "post");

const watchLikedPost = createSaga("LIKED_POST", backURL + "/post/like", "post");

const watchUnLikedPost = createSaga("UNLIKED_POST", backURL + "/post/unlike", "post");

const watchAddComment = createSaga("ADD_COMMENT", backURL + "/post/comment", "post");

const watchAddReply = createSaga("ADD_REPLY", backURL + "/post/comment/reply", "post");

const watchGetFullPost = createSaga("LOAD_FULL_POST", backURL + "/post", "get")

const watchGetTop20LikedPosts = createSaga("LOAD_TOP20_LIKED_POST", backURL + "/post/liked/top", "get")

const watchDeletePost = createSaga("DELETE_POST", backURL + "/post/delete", "get")

export default function* postSaga() {
  yield all([
    fork(watchGetPost),
    fork(watchUploadPost),
    fork(watchLikedPost),
    fork(watchUnLikedPost),
    fork(watchAddComment),
    fork(watchAddReply),
    fork(watchGetFullPost),
    fork(watchGetTop20LikedPosts),
    fork(watchDeletePost)
  ]);
}