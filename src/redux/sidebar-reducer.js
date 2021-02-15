import {profileAPI} from "../API/API";

const TRANSFORM_ID_TO_PROFILE = 'TRANSFORM_ID_TO_PROFILE';

const transformIdToProfile = (data) => ({
    type: TRANSFORM_ID_TO_PROFILE,
    data
});

const initialState = {
    views: [
        14593,
        14581,
        14473
    ]
};

//getUserProfileThunkCreator
export const getUsersProfile = (ids) => {
    return (dispatch) => {
        let profiles = [...ids];
        Promise.all(profiles.map(id =>{
            return profileAPI.getProfile(id).then(data => {
                return data;
            });
        })).then((data) => {
            dispatch(transformIdToProfile(data));
        });

    }
};

const sideBarReducer = (state = initialState, action) => {
    if (action.type === TRANSFORM_ID_TO_PROFILE) {
        return {
            ...state,
            views: action.data
        }
    } else {
        return {...state};
    }
};
export default sideBarReducer;