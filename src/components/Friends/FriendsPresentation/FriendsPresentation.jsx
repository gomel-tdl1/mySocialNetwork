import React from 'react'
import s from './FriendsPresentation.module.css'
import unknownAvatar from '../../../assets/images/unknownAvatar.png'
import {NavLink} from "react-router-dom";

function FriendsPresentation(props) {
    return (
        <div className={s.content}>
            {props.users.map(u => (
                <div key={u.id} className={s.user}>
                    <div className={s.avatar}>
                        <NavLink to={`/profile/${u.id}`}><img src={u.photos.small ? u.photos.small : unknownAvatar}
                                                              alt=""/></NavLink>
                    </div>
                    <div className={s.description}>
                        <h2 className={s.name}>{`${u.name}`}</h2>
                        <p className={s.location}>{`{u.location.city}, {u.location.country}`}</p>
                        <p className={s.status}>{u.status}</p>
                    </div>
                    {u.followed ? <button className={s.button} disabled={props.buttonInProgress.some(id => id === u.id)}
                                          onClick={() => {
                                              props.removeFriend(u.id)
                                          }}>Delete</button> :
                        <button className={s.button} disabled={props.buttonInProgress.some(id => id === u.id)}
                                onClick={() => {
                                    props.addFriend(u.id)
                                }}>Follow</button>}
                </div>
            ))}
            <div className={s.pages}>
                {props.pages.map(p => {
                    return <span key={p} className={props.currentPage === p && s.selected}
                                 onClick={(e) => {
                                     props.onPageChanged(p)
                                 }}>{p}</span>
                })}
            </div>
        </div>
    );
}

export default FriendsPresentation;