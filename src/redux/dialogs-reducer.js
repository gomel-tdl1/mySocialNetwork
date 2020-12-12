const MESSAGE_TEXT_EDIT = 'MESSAGE-TEXT-EDIT';
const SEND_MESSAGE = 'SEND_MESSAGE';
export const messageTextActionCreator = (id, text) => ({
    type: MESSAGE_TEXT_EDIT,
    userId: id,
    newText: text
});
export const sendMessageActionCreator = (id) => ({
    type: SEND_MESSAGE,
    userId: id
});

const initialState = {
    messagesData: [
        {
            interlocutorId: 1,
            data: [
                {id: 1, message: 'Hi!', who: 'you'},
                {id: 2, message: 'Hello!', who: 'me'},
                {id: 3, message: 'La lala?', who: 'you'},
                {id: 4, message: 'oyy?', who: 'me'}
            ]
        },
        {
            interlocutorId: 2,
            data: [
                {id: 1, message: 'Hi!', who: 'you'},
                {id: 2, message: 'Hello!', who: 'me'}
            ]
        },
        {
            interlocutorId: 3,
            data: [
                {id: 1, message: 'Hi!', who: 'you'}
            ]
        },
        {
            interlocutorId: 4,
            data: [
                {id: 1, message: 'Hi!', who: 'you'},
                {id: 2, message: 'Hello!', who: 'me'},
                {id: 3, message: 'La lala?', who: 'you'}
            ]
        },
        {
            interlocutorId: 5,
            data: [
                {id: 1, message: 'Hi!', who: 'you'},
                {id: 2, message: 'Hello!', who: 'me'}
            ]
        }
    ],
    messageText: ''
};

function messageTextEdit(id, text, dialogsPage) {
    dialogsPage.messageText = text;
}
function sendMessage(id, dialogsPage) {
    const lastMes = dialogsPage.messagesData[id][dialogsPage.messagesData[id].length - 1];
    let nextMesId = lastMes ? lastMes.id + 1 : 1;
    let newPost = {
        id: nextMesId,
        message: dialogsPage.messageText,
        who: 'me'
    };
    dialogsPage.messagesData.find(p => id === p.interlocutorId).data.push(newPost);
    dialogsPage.messageText = '';
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case MESSAGE_TEXT_EDIT:
            messageTextEdit(action.userId, action.newText, state);
            break;
        case SEND_MESSAGE:
            sendMessage(action.userId, state);
            break;
        default:
            break;
    }
    return state;
};
export default dialogsReducer;