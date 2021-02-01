import {authAPI, profileAPI, usersAPI} from "../API/API";

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_AUTH = 'TOGGLE_IS_AUTH';
const GET_AVATAR_FOR_HEADER = 'GET_AVATAR_FOR_HEADER';

export const setAuthUserData = (id, email, login) => ({
    type: SET_USER_DATA,
    data: {
        id,
        email,
        login
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

const initialState = {
    id: null,
    login: null,
    email: null,
    avatar: null,
    isAuth: false,
    isFetching: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
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
                dispatch(setAuthUserData(userData.id, userData.email, userData.login));
                profileAPI.getProfile(userData.id).then(data =>{
                    dispatch(getAvatar(data.photos.small));
                });
            } else {
                dispatch(toggleIsAuth(false));
            }
        });
    };
};

export default authReducer;