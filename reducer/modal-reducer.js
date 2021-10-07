import produce from "immer";
import {
  CLOSE_MODAL,
  SHOW_MODAL,
  SHOW_MODAL_FAILURE,
  SHOW_MODAL_REQUEST,
  SHOW_MODAL_SUCCESS
} from "../config/event/eventName/modal";

const initialState = {
  show: false,

  isLoadingData: false,
  isLoadedData: false,
  LoadingDataError: "",

  postInfo: {}
}

const modalReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case SHOW_MODAL_REQUEST:
        draft.isLoadingData = true;
        break;
      case SHOW_MODAL_SUCCESS:
        draft.isLoadingData = false;
        draft.isLoadingData = true;
        draft.show = true;
        draft.postInfo = action.data;
        break;
      case SHOW_MODAL_FAILURE:
        draft.isLoadingData = false;
        draft.isLoadingData = false;
        draft.show = false;
        draft.postInfo = null;
        draft.LoadingDataError = "ERROR"
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