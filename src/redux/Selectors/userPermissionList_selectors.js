
export const getUserPermissionList = (state) => {
    return state.userPermissionPage.userPermissionList;
}

export const getUserPermissionItemSel = (state) => {
    return state.userPermissionPage.userPermissionItem;
}

export const getUserList = (state) => {
    return state.userPermissionPage.userList;
}

export const getPermissionList = (state) => {
    return state.userPermissionPage.permissionList;
}

export const getIsFetching = (state) => {
    return state.userPermissionPage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.userPermissionPage.message;
}

export const getCurrentPage = (state) => {
    return state.userPermissionPage.currentPage;
}

export const getPageSize = (state) => {
    return state.userPermissionPage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.userPermissionPage.totalItemsCount;
}
export const getIsCreated= (state) => {
    return state.userPermissionPage.isCreated;
}

export const getSortData = (state) => {
    return state.userPermissionPage.sortData;
}
export const getUserPermissionListAll = (state) => {
    return state.userPermissionPage.userPermissionListAll;
}