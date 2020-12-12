import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";

function MyPosts(props) {

    const newPostElement = React.createRef();

    function addPost() {
        props.addPost();
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
                    return <Post message={post.message} likesCount={post.likesCount} id={post.id}
                                 avatar={props.avatar}/>
                })}
            </div>
        </div>

    );
}

export default MyPosts;