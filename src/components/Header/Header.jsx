import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import unknown from '../../assets/images/unknownAvatar.png'

function Header(props) {
    return (
        <header className={s.header}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMpnedANDT8qHb79WEcoCEYx20wvFvpUEsNg&usqp=CAU"
                alt="Oops"/>
            <div className={s.loginBlock}>
                {!props.isAuth ? <NavLink to={'/login'}>Login</NavLink> :
                    <NavLink to={`/profile/${props.userId}`} className={s.profile}>
                        <div className={s.avatar}><img src={props.avatar ? props.avatar : unknown} alt=""/></div>
                        <p>{props.login}</p>
                    </NavLink>}
            </div>
        </header>
    );
}

export default Header;