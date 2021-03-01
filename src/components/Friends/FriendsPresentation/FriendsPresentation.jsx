import React from 'react'
import s from './FriendsPresentation.module.css'
import Paginator from "../Paginator";
import User from "./User";

function FriendsPresentation(props) {
    return (
        <div className={s.content}>
            {props.users.map(u => (
                <User key={u.id} userId={u.id} photos={u.photos} status={u.status} name={u.name} followed={u.followed}
                      buttonInProgress={props.buttonInProgress} removeFriend={props.removeFriend}
                      addFriend={props.addFriend} isAuth={props.isAuth}/>
            ))}
            <Paginator pages={props.pages} currentPage={props.currentPage} onPageChanged={props.onPageChanged}/>
        </div>
    );
}

export default FriendsPresentation;