import React from 'react'
import s from './ProfileInfo.module.css'

export default function ProfileInfo(props) {
    return (
        <div className={s.content__profile}>
            <div className={s.profile__avatar}>
                <img src={props.avatar} alt=""/>
            </div>
            <div className={s.profile__description}>
                <div className={s.description__name}>{props.name}</div>
                <div className={s.description__info}>
                    <div className={s.description__item} id='birthday'>
                        <span className="key">Date of Birthday: </span>
                        <span className="value">{props.birthday}</span>
                    </div>
                    <div className={s.description__item} id='city'>
                        <span className="key">City: </span>
                        <span className="value">{props.location}</span>
                    </div>
                    <div className={s.description__item} id='education'>
                        <span className="key">Education: </span>
                        <span className="value">{props.education}</span>
                    </div>
                    <div className={s.description__item} id='webSite'>
                        <span className="key">Web site: </span>
                        <a href={props.site}><span
                            className="value">{props.site}</span></a>
                    </div>
                </div>
            </div>
        </div>
    );
}