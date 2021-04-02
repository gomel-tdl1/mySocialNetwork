import {profileAPI} from "../API/API";
import {setAvatarForHeader} from "./auth-reducer";
import {asyncErrorMessageView} from "./app-reducer";

const ADD_POST = 'profile-reducer/ADD-POST';
const SET_USER_PROFILE = 'profile-reducer/SET_USER_PROFILE';
const TOGGLE_IS_FETCHING = 'profile-reducer/TOGGLE_IS_FETCHING';
const SET_USER_STATUS = 'profile-reducer/SET_USER_STATUS';
const UPDATE_PHOTO_SUCCESS = 'profile-reducer/UPDATE_PHOTO_SUCCESS';

export const addPost = (id, text) => ({
    type: ADD_POST,
    userId: id,
    newPostText: text
});
export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile
});
export const setUserStatus = (status) => ({
    type: SET_USER_STATUS,
    status
});
export const toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
});
export const updateProfilePhotoSuccess = (photos) => ({
    type: UPDATE_PHOTO_SUCCESS,
    photos
});

let initialState = {
    postsData: [],
    profile: null,
    status: null,
    isFetching: false
};

const profileReducer = (state = initialState, action) => {
    let stateCopy = {...state};
    stateCopy.postsData = [...state.postsData];
    switch (action.type) {
        case ADD_POST:
            let lastPosts = stateCopy.postsData[stateCopy.postsData.length - 1];
            let nextPostId = lastPosts ? lastPosts.id + 1 : 1;
            let newPost = {
                id: nextPostId,
                message: action.newPostText,
                likesCount: 0
            };
            stateCopy.postsData.push(newPost);
            break;
        case SET_USER_PROFILE:
            return {...state, profile: action.profile};
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        case SET_USER_STATUS:
            return {...state, status: action.status};
        case UPDATE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos}};

        default:
            break;
    }
    return stateCopy;
};

//getUserProfileThunkCreator
export const getUserProfile = (id) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await profileAPI.getProfile(id);
        dispatch(toggleIsFetching(false));
        dispatch(setUserProfile(data));
    }
};
//getUserStatusThunkCreator
export const getUserStatus = (id) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await profileAPI.getStatus(id);
        dispatch(toggleIsFetching(false));
        dispatch(setUserStatus(data));
    }
};
// updateUserStatusThunkCreator
export const updateUserStatus = (status) => {
    return async (dispatch) => {
        try {
            let response = await profileAPI.updateStatus(status);
            if (response.data.resultCode === 0) {
                dispatch(setUserStatus(status))
            } else {
                throw new Error(response.data.messages[0]);
            }
        } catch (e) {
            dispatch(asyncErrorMessageView(e));
        }
    };
};
//updateProfilePhotoThunkCreator
export const updateProfilePhoto = (file) => {
    return async (dispatch) => {
        try {
            let response = await profileAPI.updateProfilePhoto(file);
            if (response.resultCode === 0) {
                dispatch(updateProfilePhotoSuccess(response.data.photos));
                dispatch(setAvatarForHeader(response.data.photos.small))
            } else {
                throw new Error(response.messages[0]);
            }
        } catch (e) {
            dispatch(asyncErrorMessageView(e));
        }
    };
};
//updateProfileDescriptionThunkCreator
export const updateProfileDescription = (data, id) => {
    return async (dispatch) => {
        try {
            let response = await profileAPI.updateProfileDescription(data);
            if (response.resultCode === 0) {
                dispatch(getUserProfile(id));
            } else {
                throw new Error(response.messages[0]);
            }
        } catch (e) {
            dispatch(asyncErrorMessageView(e));
        }
    };
};

export default profileReducer;