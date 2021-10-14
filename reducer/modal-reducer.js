import produce from "immer";
import {
  CLOSE_MODAL,
  SHOW_MODAL,
  SHOW_MODAL_FAILURE,
  SHOW_MODAL_REQUEST,
  SHOW_MODAL_SUCCESS
} from "../config/event/eventName/modal";
import {
  LIKED_POST_REQUEST,
  LIKED_POST_SUCCESS,
  UNLIKED_POST_FAILURE,
  UNLIKED_POST_SUCCESS
} from "../config/event/eventName/postEvent";

const initialState = {
  show: false,
  postInfo: {}
}

const modalReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case SHOW_MODAL:
        draft.show = true;
        draft.postInfo = action.plus;
        break;
      case CLOSE_MODAL:
        draft.show = false;
        draft.postInfo = {};
        break;
      default:
        break;
    }
  })
}

export default modalReducer;