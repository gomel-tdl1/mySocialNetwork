export const getProfileSelector = (state) => {
    return state.profilePage.profile;
};

export const getIsFetchingSelector = (state) => {
    return state.profilePage.isFetching;
};

export const getStatusSelector = (state) => {
    return state.profilePage.status;
};

export const getPostsDataSelector = (state) => {
    return state.profilePage.postsData;
};
