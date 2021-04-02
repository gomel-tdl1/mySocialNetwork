import {dialogsAPI} from "../API/API";
import {asyncErrorMessageView} from "./app-reducer";

const UPDATE_DIALOGS_DATA = 'dialogs-reducer/UPDATE_DIALOGS_DATA';
const UPDATE_MESSAGES_DATA = 'dialogs-reducer/UPDATE_MESSAGES_DATA';

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
export const startChatting = (userId) => async (dispatch) => {
    try {
        let data = await dialogsAPI.startChatting(userId);
        if (trueResultCode(data)) {
            dispatch(getDialogs());
        } else {
            throw new Error(data.messages[0]);
        }
    } catch (e) {
        dispatch(asyncErrorMessageView(e));
    }
};
//getDialogsThunkCreator
export const getDialogs = () => async (dispatch) => {
    let data = await dialogsAPI.getDialogs();
    dispatch(updateDialogsData(data));
};
//getMessagesThunkCreator
export const getMessages = (friendId) => async (dispatch) => {
    let data = await dialogsAPI.getMessages(friendId);
    dispatch(updateMessagesData(data.items));
};
//sendMessageThunkCreator
export const sendMessage = (friendId, messageText) => async (dispatch) => {
    let data = await dialogsAPI.sendMessage(friendId, messageText);
    dispatch(getMessages(friendId));
};

export default dialogsReducer;