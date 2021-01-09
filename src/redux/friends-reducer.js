const ADD_FRIEND = 'ADD_FRIEND';
const REMOVE_FRIEND = 'REMOVE_FRIEND';
const SET_USERS = 'SET_USERS';
export const addFriendAC = (id) => ({
    type: ADD_FRIEND,
    userId: id
});
export const removeFriendAC = (id) => ({
    type: REMOVE_FRIEND,
    userId: id
});
export const setUsersAC = (users) => ({
    type: SET_USERS,
    users
});

const initialState = {
    users: []
};

const friendsReducer = (state = initialState, action) => {
debugger
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
                users: [...state.users, ...action.users]
            };

        default:
            return {...state};
    }
};
export default friendsReducer;