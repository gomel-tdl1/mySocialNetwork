import React from 'react'
import s from './FriendsPresentation.module.css'
import unknownAvatar from '../../../assets/images/unknownAvatar.png'
import {NavLink} from "react-router-dom";
import axios from "axios";

function FriendsPresentation(props) {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages;
    if (props.currentPage > 0 && props.currentPage <= 3) {
        pages = [1, 2, 3, 4, 5];
    } else if (props.currentPage <= pagesCount && props.currentPage > pagesCount - 2) {
        pages = [props.currentPage - 4, props.currentPage - 3, props.currentPage - 2, props.currentPage - 1, props.currentPage]
    } else {
        pages = [props.currentPage - 2, props.currentPage - 1, props.currentPage, props.currentPage + 1, props.currentPage + 2]
    }
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
                    {u.followed ? <button className={s.button} onClick={() => {

                            axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                withCredentials: true,
                                headers: {
                                    'API-KEY': '6c3a4efe-d4a8-4320-a83f-28987b239f1b'
                                }
                            }).then(response => {
                                if (response.data.resultCode === 0) props.removeFriend(u.id)
                            });

                        }}>Delete</button> :
                        <button className={s.button} onClick={() => {

                            axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                withCredentials: true,
                                headers: {
                                    'API-KEY': '6c3a4efe-d4a8-4320-a83f-28987b239f1b'
                                }
                            }).then(response => {
                                if (response.data.resultCode === 0) props.addFriend(u.id)
                            });

                        }}>Follow</button>}
                </div>
            ))}
            <div className={s.pages}>
                {pages.map(p => {
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