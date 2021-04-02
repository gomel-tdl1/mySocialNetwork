import React, {useState} from 'react'
import s from './ProfileInfo.module.css'
import unknown from '../../../assets/images/unknownAvatar.png'
import {NavLink} from "react-router-dom";
import ProfileStatusWithHooksContainer from "../ProfileStatus/ProfileStatusWithHooksContainer";
import EditProfileDescription from "../EditProfileDescription/EditProfileDescForm";

export default function ProfileInfo(props) {
    const [editMode, setEditMode] = useState(false);

    let contacts = Object.entries(props.profile.contacts);
    let isFriend = (+props.userId !== props.authUserId) && (props.userId !== undefined);

    function nullChecker(item) {
        return item ? item : '';
    }

    const handleChooseNewPhoto = (e) => {
        const newProfilePhoto = e.target.files[0];
        if (newProfilePhoto) {
            props.updateProfilePhoto(newProfilePhoto);
        }
    };
    const handleClickEdit = () => {
        setEditMode(true);
    };

    const handleWriteMessageClick = () => {
        props.startChatting(props.userId);
    };

    return (
        <div className={s.content__profile}>
            <div className={s.avatar_container}>
                <div className={s.profile__avatar}>
                    <img src={props.profile.photos.large ? props.profile.photos.large : unknown} alt=""/>
                </div>
                {props.isOwner &&
                <div className={s.newAvatar}>
                    <input type="file" onChange={handleChooseNewPhoto}/>
                </div>}
                {isFriend &&
                <div className={s.message_button}>
                    <NavLink to={'/dialogs'}>
                        <button onClick={handleWriteMessageClick}>Write message</button>
                    </NavLink>
                </div>}
            </div>
            {!editMode &&
            <div className={s.profile__description}>
                <div className={s.description__name}>{props.profile.fullName}</div>
                <ProfileStatusWithHooksContainer/>

                <div className={s.description__info}>
                    <div className={s.description__item} id='aboutMe'>
                        <span className="key">About me: </span>
                        <span className="value">{nullChecker(props.profile.aboutMe)}</span>
                    </div>
                    <div className={s.description__item} id='searchJob'>
                        <span className="key">Looking job: </span>
                        <span className="value">{props.profile.lookingForAJob ? 'I search.' : 'I dont search.'}</span>
                    </div>
                    {props.profile.lookingForAJob &&
                    <div className={s.description__item} id='jobDescription'>
                        <span className="key">Job description: </span>
                        <span className="value">{nullChecker(props.profile.lookingForAJobDescription)}</span>
                    </div>}
                    <div className={s.description__item} id='contacts'>
                        {contacts.map(item => {
                            const key = item[0];
                            const value = item[1];
                            return (
                                <div key={key}>
                                    <span className="key">{key[0].toUpperCase() + key.slice(1)}: </span>
                                    <a href={nullChecker(value)}><span className="value">{nullChecker(value)}</span></a>
                                </div>
                            );
                        })}
                    </div>
                    <button onClick={handleClickEdit} className={s.edit_button}>Edit</button>
                </div>
            </div>}

            {editMode &&
            <EditProfileDescription setEditMode={setEditMode} authUserId={props.authUserId}
                                    updateProfileDescription={props.updateProfileDescription}/>}

        </div>
    );
}