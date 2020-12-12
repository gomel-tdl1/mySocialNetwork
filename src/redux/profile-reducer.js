const ADD_POST = 'ADD-POST';
const POST_MESSAGE_EDIT = 'POST-MESSAGE-EDIT';
export const addPostActionCreator = (id) => ({
    type: ADD_POST,
    userId: id
});
export const newPostTextActionCreator = (id, text) => ({
    type: POST_MESSAGE_EDIT,
    userId: id,
    newText: text
});

function addPost(id, profilePage) {
    let lastPosts = profilePage.postsData[profilePage.postsData.length - 1];
    let nextPostId = lastPosts ? lastPosts.id + 1 : 1;
    let newPost = {
        id: nextPostId,
        message: profilePage.newPostText,
        likesCount: 0
    };
    profilePage.postsData.push(newPost);
    profilePage.newPostText = '';
}
function postMessageEdit(id, text, profilePage) {
    profilePage.newPostText = text;
}

const profileReducer = (state, action) => {
    switch (action.type) {
        case ADD_POST:
            addPost(action.userId, state);
            break;
        case POST_MESSAGE_EDIT:
            postMessageEdit(action.userId, action.newText, state);
            break;
        default:
            break;
    }
    return state;
};
export default profileReducer;