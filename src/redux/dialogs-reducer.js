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
    dialogsData: [
        {
            id: 3,
            name: 'Daniel',
            avatar: 'https://sun9-73.userapi.com/impf/c854532/v854532471/ae0b/lhY7_MxVUv4.jpg?size=1536x2048&quality=96&proxy=1&sign=5db7444735ab438f75e0f92aa8acf5f0'
        },
        {
            id: 1,
            name: 'Arina',
            avatar: 'https://sun2.velcom-by-minsk.userapi.com/impf/c858224/v858224468/afea6/domWQuDwnNY.jpg?size=1679x1700&quality=96&proxy=1&sign=4c5145fd05ad6fbca9bb07c6ac725b81'
        },
        {
            id: 4,
            name: 'Andrew',
            avatar: 'https://sun9-63.userapi.com/impg/lRByKuTJM11ForAGkU0TkmhidmM2miJNpsIqpg/qZr6hYoueIQ.jpg?size=1612x2160&quality=96&proxy=1&sign=0896a68ac3e0c606ef42847b822e8f2c'
        }
    ],
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

const dialogsReducer = (state = initialState, action) => {

    let stateCopy = {...state};
    stateCopy.messagesData = [...state.messagesData];

    switch (action.type) {
        case MESSAGE_TEXT_EDIT:

            stateCopy.messageText = action.newText;
            break;

        case SEND_MESSAGE:

            stateCopy.messagesData[action.userId].data = [...state.messagesData[action.userId].data];
            const lastMes = stateCopy.messagesData[action.userId].data[stateCopy.messagesData[action.userId].data.length - 1];
            let nextMesId = lastMes ? lastMes.id + 1 : 1;
            let newMes = {
                id: nextMesId,
                message: stateCopy.messageText,
                who: 'me'
            };
            stateCopy.messagesData.find(p => action.userId === p.interlocutorId).data.push(newMes);
            stateCopy.messageText = '';
            break;

        default:
            break;
    }
    return stateCopy;
};
export default dialogsReducer;