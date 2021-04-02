import {usersAPI} from "../API/API";
import {asyncErrorMessageView} from "./app-reducer";

const ADD_FRIEND = 'friends-reducer/ADD_FRIEND';
const REMOVE_FRIEND = 'friends-reducer/REMOVE_FRIEND';
const SET_USERS = 'friends-reducer/SET_USERS';
const SET_CURRENT_PAGE = 'friends-reducer/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'friends-reducer/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'friends-reducer/TOGGLE_IS_FETCHING';
const TOGGLE_BUTTON_IN_PROGRESS = 'friends-reducer/TOGGLE_BUTTON_IN_PROGRESS';

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
    // currentPage: 1,
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
        // case SET_CURRENT_PAGE:
        //     return {
        //         ...state,
        //         currentPage: action.currentPage
        //     };
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
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await usersAPI.getUsers(pageSize, currentPage);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
};
//getUsersChangeThunkCreator
export const getUsersChange = (pageSize, pageNumber) => {
    return async (dispatch) => {
        // dispatch(setCurrentPage(pageNumber));
        dispatch(toggleIsFetching(true));
        let data = await usersAPI.getUsers(pageSize, pageNumber);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items, data.totalCount));
    }
};

async function addRemoveFlow(dispatch, userId, apiMethod, actionCreator) {
    try {
        dispatch(toggleButtonInProgress(true, userId));
        let data = await apiMethod(userId);
        if (data.resultCode === 0) {
            dispatch(actionCreator(userId));
        } else {
            throw new Error(data.messages[0])
        }
        dispatch(toggleButtonInProgress(false, userId));
    } catch (e) {
        dispatch(asyncErrorMessageView(e));
    }
}

// removeFriendThunkCreator
export const removeFriend = (id) => {
    return async (dispatch) => {
        let apiMethod = usersAPI.deleteFriend.bind(usersAPI);
        addRemoveFlow(dispatch, id, apiMethod, removeFriendSuccess);
    }
};
// addFriendThunkCreator
export const addFriend = (id) => {
    return async (dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI);
        addRemoveFlow(dispatch, id, apiMethod, addFriendSuccess);
    }
};


export default friendsReducer;