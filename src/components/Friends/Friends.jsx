import React from 'react'
import s from './Friends.module.css'

export default function Friends(props) {

    if(!props.users.length) props.setUsers([
        {
            id: 1,
            name: 'Arina',
            surname: 'Ivanova',
            avatar: 'https://sun2.velcom-by-minsk.userapi.com/impf/c858224/v858224468/afea6/domWQuDwnNY.jpg?size=1679x1700&quality=96&proxy=1&sign=4c5145fd05ad6fbca9bb07c6ac725b81',
            location: {
                city: 'Mogilev',
                country: 'Belarus'
            },
            status: 'I love Ilya!',
            followed: true
        },
        {
            id: 2,
            name: 'Ilya',
            surname: 'Taldykin',
            avatar: 'https://sun2.velcom-by-minsk.userapi.com/c855232/v855232866/106acd/yIVKUNKmgfY.jpg',
            location: {
                city: 'Gent',
                country: 'Belgium'
            },
            status: 'I love Arina!',
            followed: false
        },
        {
            id: 3,
            name: 'Daniel',
            surname: 'Bondarenko',
            avatar: 'https://sun9-73.userapi.com/impf/c854532/v854532471/ae0b/lhY7_MxVUv4.jpg?size=1536x2048&quality=96&proxy=1&sign=5db7444735ab438f75e0f92aa8acf5f0',
            location: {
                city: 'Smolensk',
                country: 'Russia'
            },
            status: 'Eaahhhh!',
            followed: true
        },
        {
            id: 4,
            name: 'Andrew',
            surname: 'Ryabtsev',
            avatar: 'https://sun9-63.userapi.com/impg/lRByKuTJM11ForAGkU0TkmhidmM2miJNpsIqpg/qZr6hYoueIQ.jpg?size=1612x2160&quality=96&proxy=1&sign=0896a68ac3e0c606ef42847b822e8f2c',
            location: {
                city: 'Gomel',
                country: 'Belarus'
            },
            status: 'Fuck my ass!',
            followed: true
        }
    ]);

    return (
        <div className={s.content}>
            {props.users.map(u => (
                <div key={u.id} className={s.user}>
                    <div className={s.avatar}>
                        <img src={u.avatar} alt=""/>
                    </div>
                    <div className={s.description}>
                        <h2 className={s.name}>{`${u.name} ${u.surname}`}</h2>
                        <p className={s.location}>{`${u.location.city}, ${u.location.country}`}</p>
                        <p className={s.status}>{u.status}</p>
                        </div>
                    {u.followed ? <button className={s.button} onClick={() => {
                            props.removeFriend(u.id)
                        }}>Delete</button> :
                        <button className={s.button} onClick={() => {
                            props.addFriend(u.id)
                        }}>Follow</button>}
                </div>
            ))}
        </div>
    );
}