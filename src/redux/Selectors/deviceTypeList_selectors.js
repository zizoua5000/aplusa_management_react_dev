// import {createSelector} from "reselect";

export const getDeviceTypeList = (state) => {
    return state.deviceTypePage.deviceTypeList;
}

export const getIsFetching = (state) => {
    return state.deviceTypePage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.deviceTypePage.message;
}
export const getCurrentPage = (state) => {
    return state.deviceTypePage.currentPage;
}

export const getPageSize = (state) => {
    return state.deviceTypePage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.deviceTypePage.totalItemsCount;
}
export const getIsCreated = (state) => {
    return state.deviceTypePage.isCreated;
}
export const getDeviceTypeItemSel = (state) => {
    return state.deviceTypePage.deviceTypeItem;
}
export const getSortData = (state) => {
    return state.deviceTypePage.sortData;
}
export const getDeviceTypeListAll = (state) => {
    return state.deviceTypePage.deviceTypeListAll;
}