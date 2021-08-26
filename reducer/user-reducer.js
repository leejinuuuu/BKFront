import produce from "immer";
import {
    GET_LOGIN_PLATFORM_REQUEST,
    GOOGLE_LOAD_USER_FAILURE,
    GOOGLE_LOAD_USER_REQUEST, GOOGLE_LOAD_USER_SUCCESS,
    GOOGLE_LOGIN_REQUEST, LOCAL_LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS
} from "../config/event/eventName/userEvent";

const initialState = {
    isLoggedIn: false,
    isLoggingIn: false,
    logInError: "",

    isLoadingProfile: false,
    isLoadedProfile: false,
    LoadingProfileError: "",

    user: null,
    isSent: false,
    login_platform: ""
}

const userReducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case GET_LOGIN_PLATFORM_REQUEST:
                draft.login_platform = action.data;
                break;
            case LOGIN_REQUEST:
                draft.isLoggingIn = true;
                break;
            case LOGIN_SUCCESS:
                draft.isLoggingIn = false;
                draft.isLoggedIn = true;
                draft.user = action.data;
                break;
            case LOGIN_FAILURE:
                draft.isLoggingIn = false;
                draft.isLoggedIn = true;
                draft.logInError = action.error;
                break;
            case GOOGLE_LOGIN_REQUEST:
                draft.login_platform = "google";
                break;
            case LOCAL_LOGIN_REQUEST:
                draft.login_platform = "local";
                break;
            case GOOGLE_LOAD_USER_REQUEST:
                draft.isLoadingProfile = true;
                break;
            case GOOGLE_LOAD_USER_SUCCESS:
                draft.isLoadingProfile = false;
                draft.isLoadedProfile = true;
                draft.user = action.data;
                break;
            case GOOGLE_LOAD_USER_FAILURE:
                draft.isLoadingProfile = false;
                draft.isLoadedProfile = false;
                draft.LoadingProfileError = action.error;
                break;
            default:
                break;
        }
    })
}

export default userReducer;