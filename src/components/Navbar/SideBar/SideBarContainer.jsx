import React from 'react-dom'
import s from './SideBarContainer.module.css'
import SideBar from "./SideBar";

export default function SideBarContainer(props) {

    return (
        <div className={s.sidebar}>
            {props.user.sideBar.views.map(i => {
                let man = props.users.find(p => p.id === i ? true : false);
                return <SideBar state={man.profilePage.profileDescription}/>
            })}
        </div>
    );
}