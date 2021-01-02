import React from 'react'
import {connect} from "react-redux";
import Friends from "./Friends";
import {addFriendAC, removeFriendAC, setUsersAC} from "../../redux/friends-reducer";

const mapStateToProps = (state)=>({
    users: state.friendsPage.users
});
const mapDispatchToProps = (dispatch)=>({
    addFriend:  (userId)=>{
        dispatch(addFriendAC(userId));
    },
    removeFriend: (userId)=>{
        dispatch(removeFriendAC(userId));
    },
    setUsers: (users)=>{
        dispatch(setUsersAC(users));
    }
});

const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends);
export default FriendsContainer;