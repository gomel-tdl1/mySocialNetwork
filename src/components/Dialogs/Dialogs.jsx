import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./Dialog/DialogItem";
import MessagesContainer from "./Messages/MessagesContainer";

const Dialogs = (props) => {

    const state = props.store.getState();
    const users = state.getProfile();
    const user = state.getProfile(props.id);

    const dialogsData = user.dialogsPage.messagesData.map(key => {
        let man = users.find(p => key.interlocutorId === p.id);
        return <DialogItem
            name={`${man.profilePage.profileDescription.name} ${man.profilePage.profileDescription.surname[0]}.`}
            avatar={man.profilePage.profileDescription.avatar}
            id={man.id}/>
    });

    return (
        <div className={s.content}>
            <div className={s.dialogs}>
                {dialogsData}
            </div>
            <MessagesContainer store={props.store} messageText={props.messageText} user={user}/>
        </div>
    );
};
export default Dialogs;