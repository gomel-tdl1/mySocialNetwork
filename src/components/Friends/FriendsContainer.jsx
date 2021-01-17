import React from 'react'
import {connect} from "react-redux";
import {
    addFriend,
    removeFriend,
    setUsers,
    setCurrentPage,
    setTotalUsersCount, toggleIsFetching
} from "../../redux/friends-reducer";
import * as axios from "axios";
import FriendsPresentation from "./FriendsPresentation/FriendsPresentation";
import s from "./FriendsContainer.module.css";
import SearchBar from "./SearchBar/SearchBar";
import Preloader from "../common/Preloader/Preloader";

class FriendsAPIComponent extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`, {
            withCredentials: true
        }).then(response => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount);
        });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`, {
            withCredentials: true
        }).then(response => {
            window.get = response;
            this.props.toggleIsFetching(false);
            this.props.setUsers(response.data.items, response.data.totalCount);
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
    isFetching: state.friendsPage.isFetching
});

const FriendsContainer = connect(mapStateToProps, {
    addFriend,
    removeFriend,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching
})(FriendsAPIComponent);
export default FriendsContainer;