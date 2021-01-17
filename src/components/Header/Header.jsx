import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

function Header(props) {
    return (
        <header className={s.header}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMpnedANDT8qHb79WEcoCEYx20wvFvpUEsNg&usqp=CAU" alt="Oops"/>
            <div className={s.loginBlock}>
                {!props.isAuth? <NavLink to={'/login'}>Login</NavLink>:props.login}
            </div>
        </header>
    );
}
export default Header;