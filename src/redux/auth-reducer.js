import {authAPI, profileAPI} from "../API/API";
import {stopSubmit} from "redux-form";
import {asyncErrorMessageView} from "./app-reducer";

const SET_USER_DATA = 'auth-reducer/SET_USER_DATA';
const TOGGLE_IS_AUTH = 'auth-reducer/TOGGLE_IS_AUTH';
const SET_AVATAR_FOR_HEADER = 'auth-reducer/SET_AVATAR_FOR_HEADER';
const SET_CAPTCHA = 'auth-reducer/SET_CAPTCHA';
const TOGGLE_IS_CAPTCHA_NEED = 'auth-reducer/TOGGLE_IS_CAPTCHA_NEED';

export const setAuthUserData = (id, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {
        id,
        email,
        login,
        isAuth
    }
});
export const toggleIsAuth = (isAuth) => ({
    type: TOGGLE_IS_AUTH,
    isAuth
});
export const setAvatarForHeader = (avatar) => ({
    type: SET_AVATAR_FOR_HEADER,
    avatar
});
export const setCaptcha = (captcha) => ({
    type: SET_CAPTCHA,
    captcha
});
export const toggleIsCaptchaNeed = (isNeed) => ({
    type: TOGGLE_IS_CAPTCHA_NEED,
    isNeed
});

const initialState = {
    id: null,
    login: null,
    email: null,
    avatar: null,
    isAuth: false,
    isFetching: false,
    isCaptchaNeed: false,
    captcha: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            };
        case TOGGLE_IS_AUTH:
            return {
                ...state,
                isAuth: action.isAuth
            };
        case SET_AVATAR_FOR_HEADER:
            return {
                ...state,
                avatar: action.avatar
            };
        case TOGGLE_IS_CAPTCHA_NEED:
            return {
                ...state,
                isCaptchaNeed: action.isNeed
            };
        case SET_CAPTCHA:
            return {
                ...state,
                captcha: action.captcha
            };

        default:
            return {...state};
    }
};

//checkAuthenticationThunkCreator
export const checkAuthentication = () => {
    return async (dispatch) => {
        try{
            let data = await authAPI.isAuth();
            let userData = data.data;
            if (data.resultCode === 0) {
                dispatch(toggleIsAuth(true));
                dispatch(setAuthUserData(userData.id, userData.email, userData.login, true));
                let profileData = await profileAPI.getProfile(userData.id);
                dispatch(setAvatarForHeader(profileData.photos.small));
            } else {
                dispatch(toggleIsAuth(false));
            }
        }catch (e) {
            dispatch(asyncErrorMessageView(e));
        }
    }
};
//loginOnSiteThunkCreator
export const loginOnSite = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        try {
            let response = await authAPI.loginOnSite(email, password, rememberMe, captcha);
            const actionStopSubmit = stopSubmit('login', {_error: response.data.messages[0]});
            if (response.data.resultCode === 0) {
                dispatch(checkAuthentication());
                dispatch(toggleIsCaptchaNeed(false));
                dispatch(setCaptcha(null));
            } else if (response.data.resultCode === 10) {
                dispatch(toggleIsCaptchaNeed(true));
                let data = await authAPI.getCaptcha();
                dispatch(setCaptcha(data.url));
                dispatch(actionStopSubmit);
            } else if (response.data.resultCode === 1) {
                dispatch(actionStopSubmit);
            }
        } catch (e) {
            dispatch(asyncErrorMessageView(e));
        }
    };
};
//logoutThunkCreator
export const logout = () => {
    return async (dispatch) => {
        try {
            let response = await authAPI.logout();
            if (response.data.resultCode === 0) {
                dispatch(checkAuthentication());
                dispatch(setAuthUserData(null, null, null, false));
            }
        } catch (e) {
            dispatch(asyncErrorMessageView(e));
        }
    };
};

export default authReducer;