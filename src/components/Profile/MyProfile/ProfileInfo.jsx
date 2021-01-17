import React from 'react'
import s from './ProfileInfo.module.css'
import unknown from '../../../assets/images/unknownAvatar.png'

export default function ProfileInfo(props) {
    let contacts = Object.entries(props.profile.contacts);
    return (
        <div className={s.content__profile}>
            <div className={s.profile__avatar}>
                <img src={props.profile.photos.large ? props.profile.photos.large : unknown} alt=""/>
            </div>
            <div className={s.profile__description}>
                <div className={s.description__name}>{props.profile.fullName}</div>
                <div className={s.description__info}>
                    <div className={s.description__item} id='status'>
                        <span className="key">Status: </span>
                        <span className="value">{nullChecker(props.status)}</span>
                    </div>
                    <div className={s.description__item} id='aboutMe'>
                        <span className="key">About me: </span>
                        <span className="value">{nullChecker(props.profile.aboutMe)}</span>
                    </div>
                    <div className={s.description__item} id='searchJob'>
                        <span className="key">Looking job: </span>
                        <span className="value">{props.profile.lookingForAJob ? 'I search.' : 'I dont search.'}</span>
                    </div>
                    <div className={s.description__item} id='jobDescription'>
                        <span className="key">Job description: </span>
                        <span className="value">{nullChecker(props.profile.lookingForAJobDescription)}</span>
                    </div>
                    <div className={s.description__item} id='contacts'>
                        {contacts.map(item => {
                            const key = item[0];
                            const value = item[1];
                            return (
                                <div key={key}>
                                    <span className="key">{key[0].toUpperCase()+key.slice(1)}: </span>
                                    <a href={nullChecker(value)}><span className="value">{nullChecker(value)}</span></a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

function nullChecker(item) {
    return item ? item : '';
}