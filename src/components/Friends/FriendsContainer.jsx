import React from 'react'
import {connect} from "react-redux";
import {
    addFriend,
    removeFriend,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleButtonInProgress,
    toggleIsFetching
} from "../../redux/friends-reducer";
import FriendsPresentation from "./FriendsPresentation/FriendsPresentation";
import s from "./FriendsContainer.module.css";
import SearchBar from "./SearchBar/SearchBar";
import Preloader from "../common/Preloader/Preloader";
import {usersAPI} from "../../API/API";

class FriendsAPIComponent extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(this.props.pageSize, this.props.currentPage).then(data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount);
        });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(this.props.pageSize, pageNumber).then(data => {
            window.get = data;
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items, data.totalCount);
        });
    };

    render() {
        return (
            <div className={s.content}>
                <div className={s.users}>
                    {this.props.isFetching ?
                        <Preloader height='690px'/> :
                        <FriendsPresentation totalUsersCount={this.props.totalCount} pageSize={this.props.pageSize}
                                             currentPage={this.props.currentPage} users={this.props.users}
                                             removeFriend={this.props.removeFriend} addFriend={this.props.addFriend}
                                             buttonInProgress={this.props.buttonInProgress}
                                             toggleButtonInProgress={this.props.toggleButtonInProgress}
                                             onPageChanged={this.onPageChanged}/>}
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

const FriendsContainer = connect(mapStateToProps, {
    addFriend,
    removeFriend,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleButtonInProgress
})(FriendsAPIComponent);
export default FriendsContainer;