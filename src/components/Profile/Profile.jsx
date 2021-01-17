import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from "./MyProfile/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../common/Preloader/Preloader";

function Profile(props) {
    if (!props.profile || props.isFetching) return <Preloader height={'500px'}/>;
    return (
        <main className={s.content}>
            <ProfileInfo profile={props.profile} status={props.status}/>
            <MyPostsContainer/>
        </main>
    );
}

export default Profile;