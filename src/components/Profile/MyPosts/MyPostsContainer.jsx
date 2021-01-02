import React from 'react';
import {addPostActionCreator, newPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

function mapStateToProps(state) {
    return ({
        posts: state.profilePage.postsData,
        avatar: state.profilePage.profileDescription.avatar,
        newPostText: state.profilePage.newPostText
    });
}
function mapDispatchToProps(dispatch) {
    return ({
        updateNewPostText(text){
            dispatch(newPostTextActionCreator(2, text));
        },
        addPost(){
            dispatch(addPostActionCreator(2));
        }
    });
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;