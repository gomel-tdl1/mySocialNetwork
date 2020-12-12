import React from 'react-dom'
import s from './SideBar.module.css'

export default function SideBar(props) {
    return (
      <div className={s.sidebar}>
          <div className={s.avatar}>
              <img src={props.state.avatar} alt=""/>
          </div>
          <div className={s.name}>{props.state.name}</div>
      </div>
    );
}