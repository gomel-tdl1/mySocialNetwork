import React from 'react-dom'
import s from './SideBar.module.css'
import SideItem from "./SideItem";

export default function SideBar(props) {
    const sideItems = props.views.map(i => {
        if(typeof i !== "number") return <SideItem name={i.fullName} avatar={i.photos.small} key={i.userId}/>
    });
    return (
        <div className={s.content}>
            {sideItems}
        </div>
    );
}

