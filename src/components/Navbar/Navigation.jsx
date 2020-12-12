import React from 'react';
import s from './Navigation.module.css'
import NavItem from "./NavItem/NavItem";
import SideBarContainer from "./SideBar/SideBarContainer";

function Navigation(props) {
    const user = props.state.getProfile(props.id);
    return (
        <nav className={s.navigation}>
            <NavItem classes='navigation__item' name='Profile' src={`profile/${props.id + 1}`}/>
            <NavItem classes='navigation__item' name='News' src='news'/>
            <NavItem classes='navigation__item' name='Messages' src='dialogs'/>
            <NavItem classes='navigation__item' name='Friends' src='friends'/>
            <NavItem classes='navigation__item' name='Music' src='music'/>
            <NavItem classes={['navigation__item', 'setting']} name='Setting' src='setting'/>
            <SideBarContainer user={user} users={props.state.getProfile()}/>
        </nav>
    );
}

export default Navigation;