import {checkAuthentication} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'app-reducer/INITIALIZED_SUCCESS';
const SET_ERROR_MESSAGE = 'app-reducer/SET_ERROR_MESSAGE';

export const initializedSuccess = () => ({
    type: INITIALIZED_SUCCESS
});
export const setErrorMessage = (errorMessage) => ({
    type: SET_ERROR_MESSAGE,
    errorMessage
});

const initialState = {
    initialized: false,
    errorMessage: null
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.errorMessage
            };

        default:
            return {...state};
    }
};

export const initializeApp = () => async (dispatch) => {
    await dispatch(checkAuthentication());
    dispatch(initializedSuccess());
};

export const asyncErrorMessageView = (error) => (dispatch) => {
    dispatch(setErrorMessage(error.message));
    setTimeout(() => {
        dispatch(setErrorMessage(null));
    }, 3000)
};

export default appReducer;