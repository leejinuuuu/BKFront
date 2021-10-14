import produce from "immer";
import {
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS,
  LIKED_POST_FAILURE,
  LIKED_POST_REQUEST,
  LIKED_POST_SUCCESS,
  LOAD_ALL_POST_FAILURE,
  LOAD_ALL_POST_REQUEST,
  LOAD_ALL_POST_SUCCESS,
  UNLIKED_POST_FAILURE,
  UNLIKED_POST_REQUEST,
  UNLIKED_POST_SUCCESS,
  UPLOAD_POST_SUCCESS
} from "../config/event/eventName/postEvent";

const initialState = {
  isLoadingPost: false,
  isLoadedPost: false,
  mainPost: [],
  loadingPostError: "",

  isLikingPost: false,
  isLikedPost: false,
  LikedPostError: "",

  isUnLikingPost: false,
  isUnLikedPost: false,
  UnLikedPostError: "",

  isAddingComment: false,
  isAddedComment: false,
  AddCommentError: ""
}

const postReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case UPLOAD_POST_SUCCESS:
        draft.mainPost.push(action.data)
      case LOAD_ALL_POST_REQUEST:
        draft.isLoadingPost = true;
        break;
      case LOAD_ALL_POST_SUCCESS:
        draft.isLoadingPost = false;
        draft.isLoadedPost = true;
        draft.mainPost = action.data
        break;
      case LOAD_ALL_POST_FAILURE:
        draft.isLoadingPost = false;
        draft.isLoadedPost = false;
        draft.loadingPostError = "ERROR";
        break;
      case LIKED_POST_REQUEST:
        console.log("qwerqwer")
        draft.isLikingPost = true;
        break;
      case LIKED_POST_SUCCESS:
        console.log("zxcvzxcv")
        draft.isLikingPost = false;
        draft.isLikedPost = true;
        draft.mainPost.map(v => {
          if(v.id === action.plus.postId) {
            v.likerAccount.push(action.plus.user)
          }
        })
        break;
      case LIKED_POST_FAILURE:
        draft.isLikingPost = false;
        draft.isLikedPost = false;
        break;
      case UNLIKED_POST_REQUEST:
        draft.isUnLikingPost = true;
        break;
      case UNLIKED_POST_SUCCESS:
        draft.isUnLikingPost = false;
        draft.isLikedPost = true;
        draft.mainPost.map(v => {
          if(v.id === action.plus.postId) {
            let index = 0;
            v.likerAccount.forEach((v, i) => {
              if(action.plus.user.id === v.id) {
                index = i;
              }
            });
            v.likerAccount.splice(index, 1);
          }
        })
        break;
      case UNLIKED_POST_FAILURE:
        draft.isUnLikingPost = false;
        draft.isUnLikedPost = false;
        break;
      case ADD_COMMENT_REQUEST:
        draft.isAddingComment = true;
        break;
      case ADD_COMMENT_SUCCESS:
        draft.isAddingComment = false;
        draft.isAddedComment = true;
        draft.mainPost.map(v => {
          if(v.id === action.plus.postId) {
            v.comment.push(action.data)
          }
        })
        break;
      default:
        break;
    }
  })
}

export default postReducer;