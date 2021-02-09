import React from 'react';
import s from './Messages.module.css';
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../../utils/validators";

const Messages = (props) => {
    function addNewMessage(data) {
        props.sendMessage(data.message)
    }

    return (
        <div className={s.container}>
            <div className={s.messages}>
                {props.messagesData}
            </div>
            <MessagesReduxForm onSubmit={addNewMessage}/>
        </div>

    );
};

const maxLength300 = maxLengthCreator(300);

const MessagesForm = (props) => {
    return (
        <form className={s.form} onSubmit={props.handleSubmit}>
            <Field component={Textarea} validate={[required, maxLength300]} name={'message'} placeholder='Enter message...'/>
            <button>Send</button>
        </form>
    )
};
const MessagesReduxForm = reduxForm({
    form: 'newMessage'
})(MessagesForm);

export default Messages;