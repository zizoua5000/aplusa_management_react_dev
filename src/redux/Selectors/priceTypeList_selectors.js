// import {createSelector} from "reselect";

export const getPriceTypeList = (state) => {
    return state.priceTypePage.priceTypeList;
}

export const getIsFetching = (state) => {
    return state.priceTypePage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.priceTypePage.message;
}
export const getCurrentPage = (state) => {
    return state.priceTypePage.currentPage;
}

export const getPageSize = (state) => {
    return state.priceTypePage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.priceTypePage.totalItemsCount;
}
export const getIsCreated = (state) => {
    return state.priceTypePage.isCreated;
}
export const getPriceTypeItemSel = (state) => {
    return state.priceTypePage.priceTypeItem;
}
export const getSortData = (state) => {
    return state.priceTypePage.sortData;
}
export const getPriceTypeListAll = (state) => {
    return state.priceTypePage.priceTypeListAll;
}