import {usersAPI} from "../API/API";

const ADD_FRIEND = 'ADD_FRIEND';
const REMOVE_FRIEND = 'REMOVE_FRIEND';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_BUTTON_IN_PROGRESS = 'TOGGLE_BUTTON_IN_PROGRESS';

export const addFriendSuccess = (id) => ({
    type: ADD_FRIEND,
    userId: id
});
export const removeFriendSuccess = (id) => ({
    type: REMOVE_FRIEND,
    userId: id
});
export const setUsers = (users) => ({
    type: SET_USERS,
    users
});
export const setTotalUsersCount = (totalCount) => ({
    type: SET_TOTAL_USERS_COUNT,
    totalCount
});
export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    currentPage: page
});
export const toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
});
export const toggleButtonInProgress = (isFetching, userId) => ({
    type: TOGGLE_BUTTON_IN_PROGRESS,
    isFetching,
    userId
});

const initialState = {
    users: [],
    pageSize: 5,
    usersTotalCount: 0,
    currentPage: 1,
    isFetching: false,
    buttonInProgress: []
};

const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FRIEND:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) return {...u, followed: true};
                    return u;
                })
            };
        case REMOVE_FRIEND:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) return {...u, followed: false};
                    return u;
                })
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                usersTotalCount: action.totalCount
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case TOGGLE_BUTTON_IN_PROGRESS:
            return {
                ...state,
                buttonInProgress: action.isFetching
                    ? [...state.buttonInProgress, action.userId]
                    : state.buttonInProgress.filter(id => id !== action.userId)
            };
        default:
            return {...state};
    }
};

//getUsersThunkCreator
export const getUsers = (pageSize, currentPage) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(pageSize, currentPage).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        });
    }
};
//getUsersChangeThunkCreator
export const getUsersChange = (pageSize, pageNumber) => {
    return (dispatch) => {
        dispatch(setCurrentPage(pageNumber));
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(pageSize, pageNumber).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items, data.totalCount));
        });
    }
};
// removeFriendThunkCreator
export const removeFriend = (id) => {
    return (dispatch) => {
        dispatch(toggleButtonInProgress(true, id));
        usersAPI.deleteFriend(id).then(data => {
            if (data.resultCode === 0) dispatch(removeFriendSuccess(id));
            dispatch(toggleButtonInProgress(false, id));
        });
    }
};
// addFriendThunkCreator
export const addFriend = (id) => {
    return (dispatch) => {
        dispatch(toggleButtonInProgress(true, id));
        usersAPI.follow(id).then(data => {
            if (data.resultCode === 0) dispatch(addFriendSuccess(id));
            dispatch(toggleButtonInProgress(false, id));
        });
    }
};


export default friendsReducer;