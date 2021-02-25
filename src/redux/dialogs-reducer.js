import {dialogsAPI} from "../API/API";

const UPDATE_DIALOGS_DATA = 'UPDATE_DIALOGS_DATA';
const UPDATE_MESSAGES_DATA = 'UPDATE_MESSAGES_DATA';

export const updateDialogsData = (dialogsData) => ({
    type: UPDATE_DIALOGS_DATA,
    dialogsData
});
export const updateMessagesData = (messagesData) => ({
    type: UPDATE_MESSAGES_DATA,
    messagesData
});

const initialState = {
    dialogsData: [],
    messagesData: []
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_DIALOGS_DATA:
            return {
                ...state,
                dialogsData: action.dialogsData
            };
        case UPDATE_MESSAGES_DATA:
            return {
                ...state,
                messagesData: action.messagesData
            };

        default:
            return {...state};
    }
};

function trueResultCode(data) {
    return data.resultCode === 0;
}

//startChattingThunkCreator
export const startChatting = (userId) => (dispatch) => {
    dialogsAPI.startChatting(userId).then(data => {
        if (trueResultCode(data)) {
            dispatch(getDialogs());
        }
    });
};
//getDialogsThunkCreator
export const getDialogs = () => (dispatch) => {
    dialogsAPI.getDialogs().then(data => {
        dispatch(updateDialogsData(data));
    });
};
//getMessagesThunkCreator
export const getMessages = (friendId) => (dispatch) => {
    dialogsAPI.getMessages(friendId).then(data => {
        dispatch(updateMessagesData(data.items));
    });
};
//sendMessageThunkCreator
export const sendMessage = (friendId, messageText) => (dispatch) => {
    dialogsAPI.sendMessage(friendId, messageText).then(data => {
        dispatch(getMessages(friendId));
    });
};


export default dialogsReducer;