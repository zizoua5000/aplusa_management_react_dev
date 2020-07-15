// import {createSelector} from "reselect";

export const getPriceList = (state) => {
    return state.pricePage.priceList;
}

export const getIsFetching = (state) => {
    return state.pricePage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.pricePage.message;
}
export const getCurrentPage = (state) => {
    return state.pricePage.currentPage;
}

export const getPageSize = (state) => {
    return state.pricePage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.pricePage.totalItemsCount;
}
export const getIsCreated = (state) => {
    return state.pricePage.isCreated;
}
export const getPriceItemSel = (state) => {
    return state.pricePage.priceItem;
}
export const getSortData = (state) => {
    return state.pricePage.sortData;
}
export const getPriceListAll = (state) => {
    return state.pricePage.priceListAll;
}
export const getDeviceModelListAll = (state) => {
    return state.pricePage.deviceModelListAll;
}
export const getDeviceMarkListAll = (state) => {
    return state.pricePage.deviceMarkListAll;
}
export const getAccessoryModelListAll = (state) => {
    return state.pricePage.accessoryModelListAll;
}
export const getProjectListAll = (state) => {
    return state.pricePage.projectListAll;
}

export const getPriceTypeListAll = (state) => {
    return state.pricePage.priceTypeListAll;
}