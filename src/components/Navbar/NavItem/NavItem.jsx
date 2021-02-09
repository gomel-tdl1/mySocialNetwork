import React from 'react';
import s from "./NavItem.module.css";
import profile from '../../../assets/images/NavBar/profile.png'
import news from '../../../assets/images/NavBar/news.png'
import messages from '../../../assets/images/NavBar/msg.png'
import friends from '../../../assets/images/NavBar/friends.png'
import music from '../../../assets/images/NavBar/music.png'
import setting from '../../../assets/images/NavBar/setting.png'
import {NavLink} from "react-router-dom";

export default function NavItem(props) {
    return (
        <div className={`${Array.isArray(props.classes) ? props.classes.map(i => s[i]).join(' ') : s[props.classes]}`}>
            <div className={s.item__image}><img src={
                /^dialogs/.test(props.src)? messages:
                    /^profile/.test(props.src)? profile:
                        /^news/.test(props.src)? news:
                            /^music/.test(props.src)? music:
                                /^setting/.test(props.src)? setting:
                                    /^friends/.test(props.src)? friends:null
            } alt=""/></div>
            <div className={s.item__text}>
                <NavLink to={`/${props.src}`} activeClassName={s.active}>{props.name}</NavLink>
            </div>
        </div>
    );
}