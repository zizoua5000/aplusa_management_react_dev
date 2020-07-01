// import {createSelector} from "reselect";

export const getJobTitleList = (state) => {
    return state.jobTitlePage.jobTitleList;
}

export const getIsFetching = (state) => {
    return state.jobTitlePage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.jobTitlePage.message;
}
export const getCurrentPage = (state) => {
    return state.jobTitlePage.currentPage;
}

export const getPageSize = (state) => {
    return state.jobTitlePage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.jobTitlePage.totalItemsCount;
}
export const getIsCreated = (state) => {
    return state.jobTitlePage.isCreated;
}
export const getJobTitleItemSel = (state) => {
    return state.jobTitlePage.jobTitleItem;
}
export const getSortData = (state) => {
    return state.jobTitlePage.sortData;
}
export const getJobTitleListAll = (state) => {
    return state.jobTitlePage.jobTitleListAll;
}