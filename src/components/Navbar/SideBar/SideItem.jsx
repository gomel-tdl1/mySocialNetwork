import s from "./SideBar.module.css";
import React from "react-dom";
import unknown from '../../../assets/images/unknownAvatar.png'


export default function SideItem(props) {
    return (
        <div className={s.sidebar}>
            <div className={s.avatar}>
                <img src={props.avatar ? props.avatar : unknown} alt=""/>
            </div>
            <div className={s.name}>{props.name}</div>
        </div>
    );
}