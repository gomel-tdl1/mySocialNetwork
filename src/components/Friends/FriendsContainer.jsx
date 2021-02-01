import React from 'react'
import {connect} from "react-redux";
import {addFriend, getUsers, getUsersChange, removeFriend} from "../../redux/friends-reducer";
import FriendsPresentation from "./FriendsPresentation/FriendsPresentation";
import s from "./FriendsContainer.module.css";
import SearchBar from "./SearchBar/SearchBar";
import Preloader from "../common/Preloader/Preloader";
import withAuthRedirect from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

class FriendsAPIComponent extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.pageSize, this.props.currentPage);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsersChange(this.props.pageSize, pageNumber);
    };

    pagesView = () => {
        let pagesCount = Math.ceil(this.props.totalCount / this.props.pageSize);
        let pages;
        if (this.props.currentPage > 0 && this.props.currentPage <= 3) {
            pages = [1, 2, 3, 4, 5];
        } else if (this.props.currentPage <= pagesCount && this.props.currentPage > pagesCount - 2) {
            pages = [this.props.currentPage - 4, this.props.currentPage - 3, this.props.currentPage - 2, this.props.currentPage - 1, this.props.currentPage]
        } else {
            pages = [this.props.currentPage - 2, this.props.currentPage - 1, this.props.currentPage, this.props.currentPage + 1, this.props.currentPage + 2]
        }
        return pages;
    };

    render() {
        return (
            <div className={s.content}>
                <div className={s.users}>
                    {this.props.isFetching ?
                        <Preloader height='690px'/> :
                        <FriendsPresentation currentPage={this.props.currentPage} users={this.props.users}
                                             buttonInProgress={this.props.buttonInProgress}
                                             removeFriend={this.props.removeFriend} addFriend={this.props.addFriend}
                                             onPageChanged={this.onPageChanged} isAuth={this.props.isAuth}
                                             pages={this.pagesView()}/>}
                </div>
                <div className={s.search_container}>
                    <div className={s.search}><SearchBar/></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.friendsPage.users,
    totalCount: state.friendsPage.usersTotalCount,
    pageSize: state.friendsPage.pageSize,
    currentPage: state.friendsPage.currentPage,
    isFetching: state.friendsPage.isFetching,
    buttonInProgress: state.friendsPage.buttonInProgress
});

export default compose(
    connect(mapStateToProps, {
        getUsers,
        getUsersChange,
        removeFriend,
        addFriend
    }),
    withAuthRedirect
)(FriendsAPIComponent);