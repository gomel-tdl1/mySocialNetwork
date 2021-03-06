import React from 'react'
import s from '../../Friends/FriendsPresentation/FriendsPresentation.module.css'
import {NavLink} from "react-router-dom";

function Paginator(props) {
    let pagesCount = Math.ceil(props.totalCount / props.pageSize);
    let currentPage = props.currentPage ? props.currentPage : 1;
    if (currentPage > pagesCount) {
        currentPage = pagesCount;
    }
    let pagesView;


    return (
        <div className={s.pages}>
            {pagesView.map(p => {
                const isSelected = currentPage === p;
                return (
                    <NavLink to={`/friends/${p}`} onClick={(e) => {
                        props.onPageChanged(p)
                    }} key={p}>
                        <span className={isSelected && s.selected}>{p}</span>
                    </NavLink>
                );
            })}
        </div>
    );
}

export default Paginator;