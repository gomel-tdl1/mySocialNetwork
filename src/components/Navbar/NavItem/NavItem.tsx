import React, {FC} from 'react';
import s from "./NavItem.module.css";
import profile from '../../../assets/images/NavBar/profile.png'
import news from '../../../assets/images/NavBar/news.png'
import dialogs from '../../../assets/images/NavBar/msg.png'
import friends from '../../../assets/images/NavBar/friends.png'
import music from '../../../assets/images/NavBar/music.png'
import setting from '../../../assets/images/NavBar/setting.png'
import {NavLink} from "react-router-dom";


type PropsType = {
    classes: string | Array<string>
    name: string
    src: string
}

const NavItem: FC<PropsType> = (props) => {
    function checkItem(src: string): boolean {
        return props.src === src;
    }

    return (
        <div className={`${Array.isArray(props.classes) ? props.classes.map(i => s[i]).join(' ') : s[props.classes]}`}>
            {/*@ts-ignore*/}
            <div className={s.item__image}><img src={
                checkItem('dialogs') ? dialogs :
                    checkItem('profile') ? profile :
                        checkItem('news') ? news :
                            checkItem('music') ? music :
                                checkItem('setting') ? setting :
                                    checkItem('friends') ? friends : null
            } alt=""/></div>
            <div className={s.item__text}>
                <NavLink to={`/${props.src}`} activeClassName={s.active}>{props.name}</NavLink>
            </div>
        </div>
    );
}
export default NavItem;