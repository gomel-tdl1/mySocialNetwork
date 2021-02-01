import {profileAPI} from "../API/API";

const ADD_POST = 'ADD-POST';
const POST_MESSAGE_EDIT = 'POST_MESSAGE_EDIT';
const STATUS_MESSAGE_EDIT = 'STATUS_MESSAGE_EDIT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_USER_STATUS = 'SET_USER_STATUS';

export const addPost = (id) => ({
    type: ADD_POST,
    userId: id
});
export const updateNewPostText = (text) => ({
    type: POST_MESSAGE_EDIT,
    newText: text
});
export const updateNewStatusText = (text) => ({
    type: STATUS_MESSAGE_EDIT,
    newStatusText: text
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
    newPostText: '',
    newStatusText: '',
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
                message: stateCopy.newPostText,
                likesCount: 0
            };
            stateCopy.postsData.push(newPost);
            stateCopy.newPostText = '';
            break;
        case POST_MESSAGE_EDIT:
            return {...state, newPostText: action.newText};
        case SET_USER_PROFILE:
            return {...state, profile: action.profile};
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        case SET_USER_STATUS:
            return {...state, status: action.status};
        case STATUS_MESSAGE_EDIT:
            return {...state, newStatusText: action.newStatusText};

        default:
            break;
    }
    return stateCopy;
};

//getUserProfileThunkCreator
export const getUserProfile = (id) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        profileAPI.getProfile(id).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUserProfile(data));
        });
    }
};
//getUserStatusThunkCreator
export const getUserStatus = (id) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        profileAPI.getStatus(id).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUserStatus(data));
        })
    }
};
// updateUserStatusThunkCreator
export const updateUserStatus = (status) => {
    return (dispatch) => {
      profileAPI.updateStatus(status).then(response =>{
          if(response.data.resultCode === 0){
              dispatch(setUserStatus(status))
          }
      });
    };
};

export default profileReducer;