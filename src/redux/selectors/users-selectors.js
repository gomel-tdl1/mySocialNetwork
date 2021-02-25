export const getUsersSelector = (state) => {
  return state.friendsPage.users;
};

export const getTotalCountSelector = (state) => {
  return state.friendsPage.usersTotalCount;
};

export const getPageSizeSelector = (state) => {
  return state.friendsPage.pageSize;
};

export const getCurrentPageSelector = (state) => {
  return state.friendsPage.currentPage;
};

export const getIsFetchingSelector = (state) => {
  return state.friendsPage.isFetching;
};

export const getButtonInProgressSelector = (state) => {
  return state.friendsPage.buttonInProgress;
};
