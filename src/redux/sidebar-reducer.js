import {profileAPI} from "../API/API";
import {setUserProfile} from "./profile-reducer";

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
export const getUserProfile = (ids) => {
    return (dispatch) => {
        let profiles = [];
        ids.forEach(id =>{
            profileAPI.getProfile(id).then(data => {
                profiles.push(data);
            });
        });
        setTimeout(()=>{
            dispatch(transformIdToProfile(profiles));
        },1000);
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