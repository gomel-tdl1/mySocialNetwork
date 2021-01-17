import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {updateNewPostText} from "../../../redux/profile-reducer";
import {addPost} from "../../../redux/profile-reducer";

function mapStateToProps(state) {
    return ({
        posts: state.profilePage.postsData,
        profile: state.profilePage.profile,
        newPostText: state.profilePage.newPostText
    });
}

const MyPostsContainer = connect(mapStateToProps,{
    updateNewPostText,
    addPost
})(MyPosts);
export default MyPostsContainer;