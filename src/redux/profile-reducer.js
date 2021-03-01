import {profileAPI} from "../API/API";

const ADD_POST = 'profile-reducer/ADD-POST';
const SET_USER_PROFILE = 'profile-reducer/SET_USER_PROFILE';
const TOGGLE_IS_FETCHING = 'profile-reducer/TOGGLE_IS_FETCHING';
const SET_USER_STATUS = 'profile-reducer/SET_USER_STATUS';

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
        let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setUserStatus(status))
        }
    };
};

export default profileReducer;