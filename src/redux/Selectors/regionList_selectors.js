// import {createSelector} from "reselect";

export const getRegionList = (state) => {
    return state.regionPage.regionList;
}

export const getIsFetching = (state) => {
    return state.regionPage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.regionPage.message;
}
export const getCurrentPage = (state) => {
    return state.regionPage.currentPage;
}

export const getPageSize = (state) => {
    return state.regionPage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.regionPage.totalItemsCount;
}
export const getIsCreated = (state) => {
    return state.regionPage.isCreated;
}
export const getRegionItemSel = (state) => {
    return state.regionPage.regionItem;
}
export const getSortData = (state) => {
    return state.regionPage.sortData;
}
export const getRegionListAll = (state) => {
    return state.regionPage.regionListAll;
}