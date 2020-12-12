import React from 'react';
import s from './Messages.module.css';

const Messages = (props) =>{

    const messageText = React.createRef();

    function messageTextEdit() {
        let text = messageText.current.value;
        props.messageTextEdit(text);
    }

    function sendMessage() {
        if (props.messageText) props.sendMessage();
    }

    return (
        <div className={s.container}>
            <div className={s.messages}>
                {props.messagesData}
            </div>

            <div className={s.form}>
                <textarea ref={messageText} onChange={messageTextEdit} value={props.messageText}
                              placeholder='Enter message...'/>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>

    );
};
export default Messages;