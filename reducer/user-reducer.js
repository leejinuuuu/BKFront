import produce from "immer";
import {
    GET_LOGIN_PLATFORM_REQUEST, LOAD_USER_FAILURE,
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS
} from "../config/event/eventName/userEvent";

const initialState = {
    isLoggedIn: false,
    isLoggingIn: false,
    logInError: "",

    isSignedUp: false,
    isSigningUp: false,
    signUpError: "",

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
            case SIGNUP_REQUEST:
                draft.isSigningUp = true;
                break;
            case SIGNUP_SUCCESS:
                draft.isSignedUp = true;
                draft.isSigningUp = false;
                break;
            case SIGNUP_FAILURE:
                draft.isSignedUp = false;
                draft.isSigningUp = false;
                draft.signUpError = action.error;
                break;
            case LOAD_USER_REQUEST:
                draft.isLoadingProfile = true;
                break;
            case LOAD_USER_SUCCESS:
                draft.isLoadingProfile = false;
                draft.isLoadedProfile = true;
                draft.user = action.data;
                break;
            case LOAD_USER_FAILURE:
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