import React, {FC} from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import unknown from '../../assets/images/unknownAvatar.png'
import logout from '../../assets/images/Header/log-out.png'
import {HeaderPropsType} from "./HeaderContainer";

const Header: FC<HeaderPropsType> = React.memo((props) => {
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
                <div className={s.logout} onClick={props.logout}>
                    <img src={logout} alt="Oops"/>
                </div>
            </div>
        </header>
    );
});

export default Header;