const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_AUTH = 'TOGGLE_IS_AUTH';

export const setAuthUserData = (id, email, login) => ({
    type: SET_USER_DATA,
    data: {
        id,
        email,
        login
    }
});
export const toggleIsAuth = (isAuth) => ({
    type:TOGGLE_IS_AUTH,
    isAuth
});

const initialState = {
    id: null,
    login: null,
    email: null,
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

        default:
            return {...state};
    }
};
export default authReducer;