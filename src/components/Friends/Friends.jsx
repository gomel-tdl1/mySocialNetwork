import React from 'react'
import s from './Friends.module.css'
import * as axios from "axios";
import unknownAvatar from '../../assets/images/unknownAvatar.png'
import downArrow from '../../assets/images/down-arrow.png'
import SearchBar from "./SearchBar/SearchBar";

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.pageNumber = 1;
    }

    getMoreUsers = () => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=5&page=${++this.pageNumber}`).then(response => {
            this.props.setUsers(response.data.items);
        });
    };

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=5&page=${this.pageNumber}`).then(response => {
            this.props.setUsers(response.data.items);
        });
    }

    render() {
        return (
            <div className={s.content}>
                {this.props.users.map(u => (
                    <div key={u.id} className={s.user}>
                        <div className={s.avatar}>
                            <img src={u.photos.small ? u.photos.small : unknownAvatar} alt=""/>
                        </div>
                        <div className={s.description}>
                            <h2 className={s.name}>{`${u.name} {u.surname}`}</h2>
                            <p className={s.location}>{`{u.location.city}, {u.location.country}`}</p>
                            <p className={s.status}>{u.status}</p>
                        </div>
                        {u.followed ? <button className={s.button} onClick={() => {
                                this.props.removeFriend(u.id)
                            }}>Delete</button> :
                            <button className={s.button} onClick={() => {
                                this.props.addFriend(u.id)
                            }}>Follow</button>}
                    </div>
                ))}
                <button onClick={this.getMoreUsers} className={s.getMore}><img src={downArrow} alt=""/></button>
                {/*<SearchBar/>*/}
            </div>
        );
    }
}

export default Friends;


// export default function Friends(props) {
//     if (props.users.length === 0) {
//         debugger
//         axios.get('https://social-network.samuraijs.com/api/1.0/users?count=5').then(response => {
//             props.setUsers(response.data.items);
//         });
//     }
//
//     return (
//         <div className={s.content}>
//             {props.users.map(u => (
//                 <div key={u.id} className={s.user}>
//                     <div className={s.avatar}>
//                         <img src={u.photos.small ? u.photos.small : unknownAvatar} alt=""/>
//                     </div>
//                     <div className={s.description}>
//                         <h2 className={s.name}>{`${u.name} {u.surname}`}</h2>
//                         <p className={s.location}>{`{u.location.city}, {u.location.country}`}</p>
//                         <p className={s.status}>{u.status}</p>
//                     </div>
//                     {u.followed ? <button className={s.button} onClick={() => {
//                             props.removeFriend(u.id)
//                         }}>Delete</button> :
//                         <button className={s.button} onClick={() => {
//                             props.addFriend(u.id)
//                         }}>Follow</button>}
//                 </div>
//             ))}
//             {/*<SearchBar/>*/}
//         </div>
//     );
// }