// import {createSelector} from "reselect";

export const getAccessoryTypeList = (state) => {
    return state.accessoryTypePage.accessoryTypeList;
}

export const getIsFetching = (state) => {
    return state.accessoryTypePage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.accessoryTypePage.message;
}
export const getCurrentPage = (state) => {
    return state.accessoryTypePage.currentPage;
}

export const getPageSize = (state) => {
    return state.accessoryTypePage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.accessoryTypePage.totalItemsCount;
}
export const getIsCreated = (state) => {
    return state.accessoryTypePage.isCreated;
}
export const getAccessoryTypeItemSel = (state) => {
    return state.accessoryTypePage.accessoryTypeItem;
}
export const getSortData = (state) => {
    return state.accessoryTypePage.sortData;
}
export const getAccessoryTypeListAll = (state) => {
    return state.accessoryTypePage.accessoryTypeListAll;
}