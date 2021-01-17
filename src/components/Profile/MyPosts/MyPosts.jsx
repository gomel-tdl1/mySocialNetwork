import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import unknown from '../../../assets/images/unknownAvatar.png'

function MyPosts(props) {

    const newPostElement = React.createRef();

    function addPost() {
        if (props.newPostText) props.addPost();
    }

    function newPostText() {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    return (
        <div className={s.container}>
            <h2 className={s.title}>My Posts</h2>
            <div className={s.main}>
                <textarea ref={newPostElement} onChange={newPostText} value={props.newPostText} cols="70" rows="5"
                          placeholder='Your news...'/>
                <button onClick={addPost}>Send</button>
            </div>
            <div className={s.content}>
                {props.posts.map(post => {
                    return <Post message={post.message} likesCount={post.likesCount} key={post.id}
                                 avatar={props.profile.photos.small ? props.profile.photos.small : unknown}/>
                })}
            </div>
        </div>

    );
}

export default MyPosts;