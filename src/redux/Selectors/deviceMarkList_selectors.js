// import {createSelector} from "reselect";

export const getDeviceMarkList = (state) => {
    return state.deviceMarkPage.deviceMarkList;
}

export const getIsFetching = (state) => {
    return state.deviceMarkPage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.deviceMarkPage.message;
}
export const getCurrentPage = (state) => {
    return state.deviceMarkPage.currentPage;
}

export const getPageSize = (state) => {
    return state.deviceMarkPage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.deviceMarkPage.totalItemsCount;
}
export const getIsCreated = (state) => {
    return state.deviceMarkPage.isCreated;
}
export const getDeviceMarkItemSel = (state) => {
    return state.deviceMarkPage.deviceMarkItem;
}
export const getSortData = (state) => {
    return state.deviceMarkPage.sortData;
}
export const getDeviceMarkListAll = (state) => {
    return state.deviceMarkPage.deviceMarkListAll;
}