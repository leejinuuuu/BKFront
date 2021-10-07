import produce from "immer";
import {
    GET_LOGIN_PLATFORM_REQUEST,
    LOAD_MY_PROFILE_FAILURE,
    LOAD_MY_PROFILE_REQUEST,
    LOAD_MY_PROFILE_SUCCESS,
    LOAD_USER_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    SIGNUP_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS
} from "../config/event/eventName/userEvent";

const initialState = {
    isLoggedIn: false,
    isLoggingIn: false,
    logInError: "",

    isLoggedOut: false,
    isLoggingOut: false,
    logOutError: "",

    isSignedUp: false,
    isSigningUp: false,
    signUpError: "",

    isLoadingUser: false,
    isLoadedUser: false,
    LoadingUserError: "",

    isLoadingMyProfile: false,
    isLoadedMyProfile: false,
    LoadingMyProfileError: "",

    user: null,
    myProfile: null
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
            case LOGOUT_REQUEST:
                draft.isLoggingOut = true;
                break;
            case LOGOUT_SUCCESS:
                draft.isLoggingOut = false;
                draft.isLoggedOut = true;
                draft.user = null;
                break;
            case LOGOUT_FAILURE:
                draft.isLoggingOut = false;
                draft.isLoggedOut = true;
                draft.logOutError = action.error;
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
                draft.isLoadingUser = true;
                break;
            case LOAD_USER_SUCCESS:
                draft.isLoadingUser = false;
                draft.isLoadedUser = true;
                draft.user = action.data;
                break;
            case LOAD_USER_FAILURE:
                draft.isLoadingUser = false;
                draft.isLoadedUser = false;
                draft.LoadingUserError = "action.error";
                draft.user = null
                break;
            case LOAD_MY_PROFILE_REQUEST:
                draft.isLoadingMyProfile = true;
                break;
            case LOAD_MY_PROFILE_SUCCESS:
                draft.isLoadingMyProfile = false;
                draft.isLoadedMyProfile = true;
                draft.myProfile = action.data;
                break;
            case LOAD_MY_PROFILE_FAILURE:
                draft.isLoadingMyProfile = false;
                draft.isLoadedMyProfile = false;
                draft.myProfile = null;
                draft.LoadingMyProfileError = null;
                break;
            default:
                break;
        }
    })
}

export default userReducer;