import React from 'react';
import s from './Dialogs.module.css';
import MessagesContainer from "./Messages/MessagesContainer";
import DialogItem from "./Dialog/DialogItem";
import unknown from '../../assets/images/unknownAvatar.png';

const Dialogs = (props) => {
    const dialogsDataMap = props.dialogsData.map(p => {
        return <DialogItem
            key={p.id}
            name={p.userName}
            avatar={p.photos.small || unknown}
            id={p.id}/>
    });

    return (
        <div className={s.content}>
            <div className={s.dialogs}>
                {dialogsDataMap}
            </div>
            {!!props.match.params.friendId && <MessagesContainer/>}
        </div>
    );
};
export default Dialogs;