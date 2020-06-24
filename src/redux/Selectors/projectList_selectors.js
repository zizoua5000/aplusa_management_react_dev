// import {createSelector} from "reselect";

export const getProjectList = (state) => {
    return state.projectPage.projectList;
}

export const getIsFetching = (state) => {
    return state.projectPage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.projectPage.message;
}
export const getCurrentPage = (state) => {
    return state.projectPage.currentPage;
}

export const getPageSize = (state) => {
    return state.projectPage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.projectPage.totalItemsCount;
}
export const getIsCreated = (state) => {
    return state.projectPage.isCreated;
}
export const getProjectItemSel = (state) => {
    return state.projectPage.projectItem;
}
export const getSortData = (state) => {
    return state.projectPage.sortData;
}
export const getProjectListAll = (state) => {
    return state.projectPage.projectListAll;
}