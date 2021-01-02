import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from "./MyProfile/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

function Profile(props) {
    debugger
    let description = props.state.profilePage.profileDescription;
    return (
        <main className={s.content}>
            <div className={s.content__image}>
                <img src="https://cameralabs.org/media/camera/may/23may2/33_4caaf6d27a395dc6b511eb570f701c60.jpg"
                     alt=""/>
            </div>
            <ProfileInfo
                name={`${description.name} ${description.surname}`}
                avatar={description.avatar}
                birthday={description.birthday}
                location={`${description.location.city}, ${description.location.country}`}
                education={description.education ? description.education : ''}
                site={description.webSite ? description.webSite : ''}/>
            <MyPostsContainer />
        </main>
    );
}

export default Profile;