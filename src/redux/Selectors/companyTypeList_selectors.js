// import {createSelector} from "reselect";

export const getCompanyTypeList = (state) => {
    return state.companyTypePage.companyTypeList;
}

export const getIsFetching = (state) => {
    return state.companyTypePage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.companyTypePage.message;
}
export const getCurrentPage = (state) => {
    return state.companyTypePage.currentPage;
}

export const getPageSize = (state) => {
    return state.companyTypePage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.companyTypePage.totalItemsCount;
}
export const getIsCreated = (state) => {
    return state.companyTypePage.isCreated;
}
export const getCompanyTypeItemSel = (state) => {
    return state.companyTypePage.companyTypeItem;
}
export const getSortData = (state) => {
    return state.companyTypePage.sortData;
}
export const getCompanyTypeListAll = (state) => {
    return state.companyTypePage.companyTypeListAll;
}