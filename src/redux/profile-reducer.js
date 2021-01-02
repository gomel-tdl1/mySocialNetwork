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

function getBirthdayString(date) {
    let month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'Jule',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
}
let initialState = {
    profileDescription: {
        name: 'Ilya',
        surname: 'Taldykin',
        avatar: 'https://sun2.velcom-by-minsk.userapi.com/c855232/v855232866/106acd/yIVKUNKmgfY.jpg',
        birthday: getBirthdayString(new Date(2000, 0, 21)),
        location:{
            city: 'Gent',
            country: 'Belgium'
        },
        education: 'GSTU',
        webSite: 'https://gomel-tdl1-shelter.netlify.app'
    },
    postsData: [],
    newPostText: ''
};

const profileReducer = (state = initialState, action) => {

    let stateCopy = {...state};
    stateCopy.profileDescription = {...state.profileDescription};
    stateCopy.postsData = [...state.postsData];
    switch (action.type) {
        case ADD_POST:

            let lastPosts = stateCopy.postsData[stateCopy.postsData.length - 1];
            let nextPostId = lastPosts ? lastPosts.id + 1 : 1;
            let newPost = {
                id: nextPostId,
                message: stateCopy.newPostText,
                likesCount: 0
            };
            stateCopy.postsData.push(newPost);
            stateCopy.newPostText = '';
            break;

        case POST_MESSAGE_EDIT:

            stateCopy.newPostText = action.newText;
            break;

        default:
            break;
    }
    return stateCopy;
};
export default profileReducer;