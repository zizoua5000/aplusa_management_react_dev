// import {createSelector} from "reselect";

export const getDeviceModelList = (state) => {
    return state.deviceModelPage.deviceModelList;
}

export const getDeviceModelItemSel = (state) => {
    return state.deviceModelPage.deviceModelItem;
}

export const getCurrentPage = (state) => {
    return state.deviceModelPage.currentPage;
}

export const getPageSize = (state) => {
    return state.deviceModelPage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.deviceModelPage.totalItemsCount;
}

export const getIsFetching = (state) => {
    return state.deviceModelPage.isFetching;
}

export const getIsCreated= (state) => {
    return state.deviceModelPage.isCreated;
}

export const getSetErrorMessage = (state) => {
    return state.deviceModelPage.message;
}

export const getSortData = (state) => {
    return state.deviceModelPage.sortData;
}
export const getDeviceModelListAll = (state) => {
    return state.deviceModelPage.deviceModelListAll;
}
export const getDeviceMarkListAll = (state) => {
    return state.deviceModelPage.deviceMarkListAll;
}
