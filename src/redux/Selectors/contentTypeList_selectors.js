// import {createSelector} from "reselect";

export const getContentTypeList = (state) => {
    return state.contentTypePage.contentTypeList;
}

export const getIsFetching = (state) => {
    return state.contentTypePage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.contentTypePage.message;
}
export const getCurrentPage = (state) => {
    return state.contentTypePage.currentPage;
}

export const getPageSize = (state) => {
    return state.contentTypePage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.contentTypePage.totalItemsCount;
}
export const getIsCreated = (state) => {
    return state.contentTypePage.isCreated;
}
export const getContentTypeItemSel = (state) => {
    return state.contentTypePage.contentTypeItem;
}
export const getSortData = (state) => {
    return state.contentTypePage.sortData;
}
export const getContentTypeListAll = (state) => {
    return state.contentTypePage.contentTypeListAll;
}