import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from "./MyProfile/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

function Profile(props) {
    const state = props.store.getState();
    const user = state.getProfile(props.id);
    const userInfo=user.profilePage.profileDescription;

    return (
        <main className={s.content}>
            <div className={s.content__image}>
                <img src="https://cameralabs.org/media/camera/may/23may2/33_4caaf6d27a395dc6b511eb570f701c60.jpg"
                     alt=""/>
            </div>
            <ProfileInfo
                name={`${userInfo.name} ${userInfo.surname}`}
                avatar={userInfo.avatar}
                birthday={userInfo.birthday}
                location={userInfo.location}
                education={userInfo.education ? userInfo.education : ''}
                site={userInfo.webSite ? userInfo.webSite : ''}/>
            <MyPostsContainer user={user} store={props.store} newPostText={props.newPostText}/>
        </main>
    );
}

export default Profile;