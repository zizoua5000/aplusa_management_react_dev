
export const getUserList = (state) => {
    return state.userPage.userList;
}

export const getUserItemSel = (state) => {
    return state.userPage.userItem;
}

export const getIsFetching = (state) => {
    return state.userPage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.userPage.message;
}

export const getCurrentPage = (state) => {
    return state.userPage.currentPage;
}

export const getPageSize = (state) => {
    return state.userPage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.userPage.totalItemsCount;
}
export const getIsCreated= (state) => {
    return state.userPage.isCreated;
}

export const getSortData = (state) => {
    return state.userPage.sortData;
}
export const getUserListAll = (state) => {
    return state.userPage.userListAll;
}