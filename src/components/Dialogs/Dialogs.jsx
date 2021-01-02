import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./Dialog/DialogItem";
import MessagesContainer from "./Messages/MessagesContainer";

const Dialogs = (props) => {

    const dialogsData = props.state.dialogsPage.dialogsData.map(key => {
        return <DialogItem
            name={key.name}
            avatar={key.avatar}
            id={key.id}/>
    });

    return (
        <div className={s.content}>
            <div className={s.dialogs}>
                {dialogsData}
            </div>
            <MessagesContainer />
        </div>
    );
};
export default Dialogs;