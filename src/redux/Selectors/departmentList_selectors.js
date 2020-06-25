// import {createSelector} from "reselect";

export const getDepartmentList = (state) => {
    return state.departmentPage.departmentList;
}

export const getIsFetching = (state) => {
    return state.departmentPage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.departmentPage.message;
}
export const getCurrentPage = (state) => {
    return state.departmentPage.currentPage;
}

export const getPageSize = (state) => {
    return state.departmentPage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.departmentPage.totalItemsCount;
}
export const getIsCreated = (state) => {
    return state.departmentPage.isCreated;
}
export const getDepartmentItemSel = (state) => {
    return state.departmentPage.departmentItem;
}
export const getSortData = (state) => {
    return state.departmentPage.sortData;
}
export const getDepartmentListAll = (state) => {
    return state.departmentPage.departmentListAll;
}