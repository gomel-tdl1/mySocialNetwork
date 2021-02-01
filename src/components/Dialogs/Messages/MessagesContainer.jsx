import React from 'react';
import Message from "./Message/Message";
import {messageTextActionCreator, sendMessageActionCreator} from "../../../redux/dialogs-reducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import {compose} from "redux";

function mapStateToProps(state) {
    return ({
        messagesData: (()=>{
            return state.dialogsPage.messagesData.find(p => 3 === p.interlocutorId).data.map(mes => {
                return <Message who={mes.who} message={mes.message} key={mes.id}/>
            });
        })(),
        messageText: state.dialogsPage.messageText
    });
}
function mapDispatchToProps(dispatch) {
    return ({
        messageTextEdit(text){
            dispatch(messageTextActionCreator(3, text));
        },
        sendMessage(){
            dispatch(sendMessageActionCreator(3));
        }
    });
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(Messages);