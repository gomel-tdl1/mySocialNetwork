import React from 'react';
import Message from "./Message/Message";
import {sendMessageActionCreator} from "../../../redux/dialogs-reducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import {compose} from "redux";

function mapStateToProps(state) {
    return ({
        messagesData: (() => {
            return state.dialogsPage.messagesData.find(p => 3 === p.interlocutorId).data.map(mes => {
                return <Message who={mes.who} message={mes.message} key={mes.id}/>
            });
        })(),
        messageText: state.dialogsPage.messageText
    });
}

function mapDispatchToProps(dispatch) {
    return ({
        sendMessage(text) {
            dispatch(sendMessageActionCreator(3, text));
        }
    });
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(Messages);