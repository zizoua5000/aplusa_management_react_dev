// import {createSelector} from "reselect";

export const getConfigurationList = (state) => {
    return state.configurationPage.configurationList;
}

export const getIsFetching = (state) => {
    return state.configurationPage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.configurationPage.message;
}
export const getCurrentPage = (state) => {
    return state.configurationPage.currentPage;
}

export const getPageSize = (state) => {
    return state.configurationPage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.configurationPage.totalItemsCount;
}
export const getIsCreated = (state) => {
    return state.configurationPage.isCreated;
}
export const getConfigurationItemSel = (state) => {
    return state.configurationPage.configurationItem;
}
export const getSortData = (state) => {
    return state.configurationPage.sortData;
}
export const getConfigurationListAll = (state) => {
    return state.configurationPage.configurationListAll;
}