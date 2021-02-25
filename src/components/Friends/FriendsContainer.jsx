import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {addFriend, getUsers, getUsersChange, removeFriend} from "../../redux/friends-reducer";
import FriendsPresentation from "./FriendsPresentation/FriendsPresentation";
import s from "./FriendsContainer.module.css";
import SearchBar from "./SearchBar/SearchBar";
import Preloader from "../common/Preloader/Preloader";
import withAuthRedirect from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {
    getButtonInProgressSelector,
    getCurrentPageSelector,
    getIsFetchingSelector,
    getPageSizeSelector,
    getTotalCountSelector,
    getUsersSelector
} from "../../redux/selectors/users-selectors";

const FriendsAPIComponent = (props) => {
    useEffect(() => {
        props.getUsers(props.pageSize, props.currentPage);
    }, [props.getUsers]);

    const onPageChanged = (pageNumber) => {
        props.getUsersChange(props.pageSize, pageNumber);
    };

    const pagesView = () => {
        let pagesCount = Math.ceil(props.totalCount / props.pageSize);
        let pages;
        if (props.currentPage > 0 && props.currentPage <= 3) {
            pages = [1, 2, 3, 4, 5];
        } else if (props.currentPage <= pagesCount && props.currentPage > pagesCount - 2) {
            pages = [props.currentPage - 4, props.currentPage - 3, props.currentPage - 2, props.currentPage - 1, props.currentPage]
        } else {
            pages = [props.currentPage - 2, props.currentPage - 1, props.currentPage, props.currentPage + 1, props.currentPage + 2]
        }
        return pages;
    };

    return (
        <div className={s.content}>
            <div className={s.users}>
                {props.isFetching ?
                    <Preloader height='690px'/> :
                    <FriendsPresentation currentPage={props.currentPage} users={props.users}
                                         buttonInProgress={props.buttonInProgress}
                                         removeFriend={props.removeFriend} addFriend={props.addFriend}
                                         onPageChanged={onPageChanged} isAuth={props.isAuth}
                                         pages={pagesView()}/>}
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
    buttonInProgress: getButtonInProgressSelector(state)
});

export default compose(
    connect(mapStateToProps, {
        getUsers,
        getUsersChange,
        removeFriend,
        addFriend
    })
)(FriendsAPIComponent);