import React from 'react';
import s from './Messages.module.css';
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../../utils/validators";
import Message from "./Message/Message";

const Messages = (props) => {
    function handleSendMessageClick(data) {
        props.sendMessage(props.match.params.friendId, data.message)
    }

    function whoSendMessage(senderId) {
        return senderId === props.authUserId ? 'me' : 'you';
    }

    return (
        <div className={s.container}>
            <div className={s.messages}>
                {props.messagesData.map(item => {
                    let who = whoSendMessage(item.senderId);
                    return <Message key={item.id} who={who} message={item.body}/>
                })}
            </div>
            <MessagesReduxForm onSubmit={handleSendMessageClick}/>
        </div>

    );
};

const maxLength300 = maxLengthCreator(300);

const MessagesForm = (props) => {
    return (
        <form className={s.form} onSubmit={props.handleSubmit}>
            <Field component={Textarea} validate={[required, maxLength300]} name={'message'}
                   placeholder='Enter message...'/>
            <button>Send</button>
        </form>
    )
};
const MessagesReduxForm = reduxForm({
    form: 'newMessage'
})(MessagesForm);

export default Messages;