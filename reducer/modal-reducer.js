import produce from "immer";
import {
  CLOSE_MODAL,
  SHOW_MODAL,
} from "../config/event/eventName/modal";

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