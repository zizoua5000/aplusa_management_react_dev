// import {createSelector} from "reselect";

export const getFWVersionList = (state) => {
    return state.fwVersionPage.fwVersionList;
}

export const getIsFetching = (state) => {
    return state.fwVersionPage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.fwVersionPage.message;
}
export const getCurrentPage = (state) => {
    return state.fwVersionPage.currentPage;
}

export const getPageSize = (state) => {
    return state.fwVersionPage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.fwVersionPage.totalItemsCount;
}
export const getIsCreated = (state) => {
    return state.fwVersionPage.isCreated;
}
export const getFWVersionItemSel = (state) => {
    return state.fwVersionPage.fwVersionItem;
}
export const getSortData = (state) => {
    return state.fwVersionPage.sortData;
}
export const getFWVersionListAll = (state) => {
    return state.fwVersionPage.fwVersionListAll;
}