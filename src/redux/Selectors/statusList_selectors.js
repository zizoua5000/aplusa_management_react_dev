// import {createSelector} from "reselect";

export const getStatusList = (state) => {
    return state.statusPage.statusList;
}

export const getIsFetching = (state) => {
    return state.statusPage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.statusPage.message;
}
export const getCurrentPage = (state) => {
    return state.statusPage.currentPage;
}

export const getPageSize = (state) => {
    return state.statusPage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.statusPage.totalItemsCount;
}
export const getIsCreated = (state) => {
    return state.statusPage.isCreated;
}
export const getStatusItemSel = (state) => {
    return state.statusPage.statusItem;
}
export const getSortData = (state) => {
    return state.statusPage.sortData;
}
export const getStatusListAll = (state) => {
    return state.statusPage.statusListAll;
}