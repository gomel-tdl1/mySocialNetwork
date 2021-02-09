import {authAPI, profileAPI} from "../API/API";

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_AUTH = 'TOGGLE_IS_AUTH';
const GET_AVATAR_FOR_HEADER = 'GET_AVATAR_FOR_HEADER';
const SET_CAPTCHA = 'SET_CAPTCHA';
const TOGGLE_IS_CAPTCHA_NEED = 'TOGGLE_IS_CAPTCHA_NEED'

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
export const getAvatar = (avatar) => ({
    type: GET_AVATAR_FOR_HEADER,
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
        case GET_AVATAR_FOR_HEADER:
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
    return (dispatch) => {
        authAPI.isAuth().then(data => {
            let userData = data.data;
            if (data.resultCode === 0) {
                dispatch(toggleIsAuth(true));
                dispatch(setAuthUserData(userData.id, userData.email, userData.login, true));
                profileAPI.getProfile(userData.id).then(data => {
                    dispatch(getAvatar(data.photos.small));
                });
            } else {
                dispatch(toggleIsAuth(false));
            }
        });
    };
};
//loginOnSiteThunkCreator
export const loginOnSite = (email, password, rememberMe, captcha) => {
    return (dispatch) => {
        authAPI.loginOnSite(email, password, rememberMe, captcha).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(checkAuthentication());
                dispatch(toggleIsCaptchaNeed(false));
                dispatch(setCaptcha(null));
            } else if (response.data.resultCode === 10) {
                dispatch(toggleIsCaptchaNeed(true));
                authAPI.getCaptcha().then(data => {
                   dispatch(setCaptcha(data.url))
                });
            }
        });
    };
};
//logoutThunkCreator
export const logout = () => {
    return (dispatch) => {
        authAPI.logout().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(checkAuthentication());
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
    };
};

export default authReducer;