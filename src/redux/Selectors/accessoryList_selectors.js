
export const getAccessoryList = (state) => {
    return state.accessoryPage.accessoryList;
}
export const getAccessoryItemSel = (state) => {
    return state.accessoryPage.accessoryItem;
}
export const getAccessoryModelListAll = (state) => {
    return state.accessoryPage.accessoryModelListAll;
}
export const getAccessoryTypeListAll = (state) => {
    return state.accessoryPage.accessoryTypeListAll;
}

export const getIsFetching = (state) => {
    return state.accessoryPage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.accessoryPage.message;
}

export const getCurrentPage = (state) => {
    return state.accessoryPage.currentPage;
}

export const getPageSize = (state) => {
    return state.accessoryPage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.accessoryPage.totalItemsCount;
}
export const getIsCreated= (state) => {
    return state.accessoryPage.isCreated;
}

export const getSortData = (state) => {
    return state.accessoryPage.sortData;
}
export const getAccessoryListAll = (state) => {
    return state.accessoryPage.accessoryListAll;
}
export const getCompanyListAll = (state) => {
    return state.accessoryPage.companyListAll;
}
export const getAccessoryHistoryListById = (state) => {
    return state.accessoryPage.accessoryHistoryListById;
}