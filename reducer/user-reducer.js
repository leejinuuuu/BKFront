import produce from "immer";
import {
  ADD_TO_FAVORITE_LIST_SUCCESS,
  AUTH_WITH_EMAIL_FAILURE,
  AUTH_WITH_EMAIL_REQUEST,
  AUTH_WITH_EMAIL_SUCCESS,
  CREATE_CLAN_FAILURE,
  CREATE_CLAN_REQUEST,
  CREATE_CLAN_SUCCESS, CREATE_FAVORITE_LIST_SUCCESS, FOLLOW_ACCOUNT_SUCCESS,
  GET_CLAN_DATA_FAILURE,
  GET_CLAN_DATA_REQUEST,
  GET_CLAN_DATA_SUCCESS,
  GET_LOGIN_PLATFORM_REQUEST,
  GET_RECOMMEND_ACCOUNT_FAILURE,
  GET_RECOMMEND_ACCOUNT_REQUEST,
  GET_RECOMMEND_ACCOUNT_SUCCESS,
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
  LOGOUT_SUCCESS, REMOVE_TO_FAVORITE_LIST_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS, SUBSCRIBE_CLAN_SUCCESS, UNFOLLOW_ACCOUNT_SUCCESS, UNSUBSCRIBE_CLAN_SUCCESS
} from "../config/event/eventName/userEvent";
import {UPLOAD_CLAN_POST_SUCCESS} from "../config/event/eventName/postEvent";

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

  isSendingEmail: false,
  isSendEmail: false,
  sendingEmailError: "",

  isCreatingClan: false,
  isCreatedClan: false,
  createClanError: "",

  isGettingClanData: false,
  isGetClanData: false,
  gettingClanDataError: "",

  isGettingRecommendAccount : false,
  isGetRecommendAccount : false,
  getRecommendAccountError : "",

  emailCode: "",
  user: null,
  myProfile: null,
  clanInfo: {},
  recommendAccount: []
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
      case AUTH_WITH_EMAIL_REQUEST:
        draft.isSendingEmail = true;
        break;
      case AUTH_WITH_EMAIL_SUCCESS:
        draft.isSendingEmail = false;
        draft.isSendEmail = true;
        draft.emailCode = "" + action.data;
        break;
      case AUTH_WITH_EMAIL_FAILURE:
        draft.isSendingEmail = false;
        draft.isSendEmail = true;
        draft.emailCode = null;
        draft.sendingEmailError = "ERROR";
        break;
      case CREATE_CLAN_REQUEST:
        draft.isCreatingClan = true;
        break;
      case CREATE_CLAN_SUCCESS:
        draft.isCreatingClan = false;
        draft.isCreatedClan = true;
        draft.myProfile.clans.push(action.data);
        break;
      case CREATE_CLAN_FAILURE:
        draft.isCreatingClan = false;
        draft.isCreatedClan = false;
        draft.createClanError = "ERROR";
        break;
      case GET_CLAN_DATA_REQUEST:
        draft.isGettingClanData = true;
        break;
      case GET_CLAN_DATA_SUCCESS:
        draft.isGettingClanData = false;
        draft.isGetClanData = true;
        draft.clanInfo = action.data;
        break;
      case GET_CLAN_DATA_FAILURE:
        draft.isGettingClanData = false;
        draft.isGetClanData = false;
        draft.clanInfo = {};
        draft.gettingClanDataError = "ERROR"
        break;
      case GET_RECOMMEND_ACCOUNT_REQUEST:
        draft.isGettingRecommendAccount = false;
        break;
      case GET_RECOMMEND_ACCOUNT_SUCCESS:
        draft.isGettingRecommendAccount = true;
        draft.isGetRecommendAccount = true;
        draft.recommendAccount = action.data;
        break;
      case GET_RECOMMEND_ACCOUNT_FAILURE:
        draft.isGettingRecommendAccount = true;
        draft.isGetRecommendAccount = true;
        draft.recommendAccount = action.data;
        draft.getRecommendAccountError = "ERROR";
        break;
      case UPLOAD_CLAN_POST_SUCCESS:
        draft.clanInfo.posts.push(action.data);
        break;
      case SUBSCRIBE_CLAN_SUCCESS:
        draft.clanInfo.subscriber.push(action.data);
        break;
      case UNSUBSCRIBE_CLAN_SUCCESS:
        let index1 = 0;
        draft.clanInfo.subscriber.forEach((v, i) => {
          if(v.id === action.data.id) {
            index1 = i;
          }
        });
        draft.clanInfo.subscriber.splice(index1, 1);
        break;
      case FOLLOW_ACCOUNT_SUCCESS:
      case UNFOLLOW_ACCOUNT_SUCCESS:
        draft.user.recommends.forEach((v, i) => {
          if(v.id === action.plus.userId) {
            v.isFollowed = !v.isFollowed;
          }
        });
        break;
      case CREATE_FAVORITE_LIST_SUCCESS:
        draft.user.favorites = [action.data, ...draft.user.favorites];
        break;
      case ADD_TO_FAVORITE_LIST_SUCCESS:
        draft.user.favorites.forEach((v, i) => {
          action.plus.favoriteList.forEach((fv, fi) => {
            if(v.id === fv) {
              v.posts = [{id: action.plus.postId}, ...v.posts]
            }
          })
        });
        break;
      case REMOVE_TO_FAVORITE_LIST_SUCCESS:
        let index2 = [];
        draft.user.favorites.map(v => {
          action.plus.favoriteList.forEach((fv, fi) => {
              if(v.id === fv) {
                index2.push(fi);
            }
          })
        })
        console.log(index2)
        index2.map(v => {
          draft.user.favorites[v].posts.forEach((pv, pi) => {
            console.log(pv.id, action.plus.postId)
            if(pv.id === action.plus.postId) {
              console.log(pi, v)
              draft.user.favorites[v].posts.splice(pi, 1);
            }
          })
        })
        break;
      default:
        break;
    }
  })
}

export default userReducer;