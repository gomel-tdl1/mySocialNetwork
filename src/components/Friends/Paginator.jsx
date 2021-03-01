import React from 'react'
import s from './FriendsPresentation/FriendsPresentation.module.css'

function Paginator(props) {
    return (
        <div className={s.pages}>
            {props.pages.map(p => {
                const isSelected = props.currentPage === p;
                return <span key={p} className={isSelected && s.selected}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}
        </div>
    );
}

export default Paginator;