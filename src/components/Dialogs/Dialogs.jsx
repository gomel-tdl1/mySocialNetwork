import React from 'react';
import s from './Dialogs.module.css';
import MessagesContainer from "./Messages/MessagesContainer";

const Dialogs = (props) => {
    // const dialogsData = props.state.dialogsPage.dialogsData.map(p => {
    //     return <DialogItem
    //         key={p.id}
    //         name={p.name}
    //         avatar={p.avatar}
    //         id={p.id}/>
    // });

    return (
        <div className={s.content}>
            <div className={s.dialogs}>
                {/*{dialogsData}*/}
            </div>
            <MessagesContainer/>
        </div>
    );
};
export default Dialogs;