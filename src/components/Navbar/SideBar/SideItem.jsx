import s from "./SideBar.module.css";
import React from "react-dom";


export default function SideItem(props) {
    return (
        <div className={s.sidebar}>
            <div className={s.avatar}>
                <img src={props.avatar} alt=""/>
            </div>
            <div className={s.name}>{props.name}</div>
        </div>
    );
}