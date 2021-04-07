import {checkAuthentication} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'app-reducer/INITIALIZED_SUCCESS';
const SET_ERROR_MESSAGE = 'app-reducer/SET_ERROR_MESSAGE';

type InitializedSuccessActionType = { type: typeof INITIALIZED_SUCCESS }
export const initializedSuccess = (): InitializedSuccessActionType => ({
    type: INITIALIZED_SUCCESS
});

type SetErrorMessageActionType = { type: typeof SET_ERROR_MESSAGE, errorMessage: string | null }
export const setErrorMessage = (errorMessage: string | null): SetErrorMessageActionType => ({
    type: SET_ERROR_MESSAGE,
    errorMessage
});

export type InitialStateType = {
    initialized: boolean,
    errorMessage: string | null
}
const initialState: InitialStateType = {
    initialized: false,
    errorMessage: null
};

const appReducer = (state = initialState, action: any): InitialStateType => {
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
type InitializeAppThunkType = () => (dispatch: Function) => void;
export const initializeApp: InitializeAppThunkType = () => async (dispatch) => {
    await dispatch(checkAuthentication());
    dispatch(initializedSuccess());
};

type AsyncErrorMessageViewThunkType = (error: any) => (dispatch: Function) => void;
export const asyncErrorMessageView: AsyncErrorMessageViewThunkType = (error) => (dispatch) => {
    dispatch(setErrorMessage(error.message));
    setTimeout(() => {
        dispatch(setErrorMessage(null));
    }, 3000)
};

export default appReducer;