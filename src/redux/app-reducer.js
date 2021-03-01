import {checkAuthentication} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'app-reducer/INITIALIZED_SUCCESS';

export const initializedSuccess = () => ({
    type: INITIALIZED_SUCCESS
});

const initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };

        default:
            return {...state};
    }
};

export const initializeApp = () => async (dispatch) => {
    await dispatch(checkAuthentication());
    dispatch(initializedSuccess());
};

export default appReducer;