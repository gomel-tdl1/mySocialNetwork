import React from 'react-dom'
import s from './SideBar.module.css'
import SideItem from "./SideItem";

export default function SideBar(props) {
    const sideItems = props.views.map(i => {
        return <SideItem name={i.name} avatar={i.avatar} key={i.id}/>
    });
    return (
        <div className={s.content}>
            {sideItems}
        </div>
    );
}

