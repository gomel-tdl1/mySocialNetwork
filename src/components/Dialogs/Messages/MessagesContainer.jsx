import React from 'react';
import Message from "./Message/Message";
import {messageTextActionCreator, sendMessageActionCreator} from "../../../redux/dialogs-reducer";
import Messages from "./Messages";

const MessagesContainer = (props) => {

    let messagesData=props.user.dialogsPage.messagesData.find(p => props.user.id === p.interlocutorId).data.map(mes => {
        return <Message who={mes.who} message={mes.message} id={mes.id}/>
    });

    function messageTextEdit(text) {
        props.store.dispatch(messageTextActionCreator(props.user.id, text), props.user.id);
    }

    function sendMessage() {
        if (props.messageText) props.store.dispatch(sendMessageActionCreator(props.user.id), props.user.id);
    }

    return (
        <Messages messageTextEdit={messageTextEdit} sendMessage={sendMessage} messageText={props.messageText}
                  user={props.user} messagesData={messagesData}/>
    );
};
export default MessagesContainer;