// import {createSelector} from "reselect";

export const getDeviceLocationList = (state) => {
    return state.deviceLocationPage.deviceLocationList;
}

export const getIsFetching = (state) => {
    return state.deviceLocationPage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.deviceLocationPage.message;
}
export const getCurrentPage = (state) => {
    return state.deviceLocationPage.currentPage;
}

export const getPageSize = (state) => {
    return state.deviceLocationPage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.deviceLocationPage.totalItemsCount;
}
export const getIsCreated = (state) => {
    return state.deviceLocationPage.isCreated;
}
export const getDeviceLocationItemSel = (state) => {
    return state.deviceLocationPage.deviceLocationItem;
}
export const getSortData = (state) => {
    return state.deviceLocationPage.sortData;
}
export const getDeviceLocationListAll = (state) => {
    return state.deviceLocationPage.deviceLocationListAll;
}