
export const getPermissionList = (state) => {
    return state.permissionPage.permissionList;
}

export const getPermissionItemSel = (state) => {
    return state.permissionPage.permissionItem;
}

export const getContentTypeList = (state) => {
    return state.permissionPage.contentTypeList;
}

export const getIsFetching = (state) => {
    return state.permissionPage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.permissionPage.message;
}

export const getCurrentPage = (state) => {
    return state.permissionPage.currentPage;
}

export const getPageSize = (state) => {
    return state.permissionPage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.permissionPage.totalItemsCount;
}
export const getIsCreated= (state) => {
    return state.permissionPage.isCreated;
}

export const getSortData = (state) => {
    return state.permissionPage.sortData;
}
export const getPermissionListAll = (state) => {
    return state.permissionPage.permissionListAll;
}