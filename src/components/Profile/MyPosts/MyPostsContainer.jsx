import React from 'react';
import {addPostActionCreator, newPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";


function MyPostsContainer(props) {

    function addPost() {
        if (props.newPostText) props.store.dispatch(addPostActionCreator(props.user.id), props.user.id);
    }

    function updateNewPostText(text) {
        props.store.dispatch(newPostTextActionCreator(props.user.id, text), props.user.id);
    }

    return (
        <MyPosts updateNewPostText={updateNewPostText} addPost={addPost} posts={props.user.profilePage.postsData}
                 avatar={props.user.profilePage.profileDescription.avatar} newPostText={props.newPostText}/>
    );
}

export default MyPostsContainer;