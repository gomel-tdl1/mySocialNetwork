import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {addFriend, getUsers, getUsersChange, removeFriend} from "../../redux/friends-reducer";
import FriendsPresentation from "./FriendsPresentation/FriendsPresentation";
import s from "./FriendsContainer.module.css";
import SearchBar from "./SearchBar/SearchBar";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getButtonInProgressSelector,
    getCurrentPageSelector,
    getIsFetchingSelector,
    getPageSizeSelector,
    getTotalCountSelector,
    getUsersSelector
} from "../../redux/selectors/users-selectors";
import {getIsAuthSelector} from "../../redux/selectors/auth-selectors";
import {withRouter} from "react-router-dom";

const FriendsContainer = (props) => {
    let [pagesCount, setPaginatorCount] = useState(1);
    const pagesCountIsBig = !props.match.params.currentPage ? 1 :
        props.match.params.currentPage < pagesCount ?
            props.match.params.currentPage : pagesCount;
    useEffect(() => {
        props.getUsers(props.pageSize, pagesCountIsBig);
    }, [pagesCount]);

    const onPageChanged = (pageNumber) => {
        props.getUsersChange(props.pageSize, pageNumber);
    };
    const handlePagesCountMath = (count) => {
        setPaginatorCount(count);
    };

    return (
        <div className={s.content}>
            <div className={s.users}>
                {props.isFetching ?
                    <Preloader height='690px'/> :
                    <FriendsPresentation {...props} onPageChanged={onPageChanged}
                                         handlePagesCountMath={handlePagesCountMath}/>}
            </div>
            <div className={s.search_container}>
                <div className={s.search}><SearchBar/></div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    users: getUsersSelector(state),
    totalCount: getTotalCountSelector(state),
    pageSize: getPageSizeSelector(state),
    currentPage: getCurrentPageSelector(state),
    isFetching: getIsFetchingSelector(state),
    buttonInProgress: getButtonInProgressSelector(state),
    isAuth: getIsAuthSelector(state)
});

export default compose(
    connect(mapStateToProps, {
        getUsers,
        getUsersChange,
        removeFriend,
        addFriend
    }),
    withRouter
)(FriendsContainer);