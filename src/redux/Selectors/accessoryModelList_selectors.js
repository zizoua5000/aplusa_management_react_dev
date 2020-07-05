// import {createSelector} from "reselect";

export const getAccessoryModelList = (state) => {
    return state.accessoryModelPage.accessoryModelList;
}

export const getIsFetching = (state) => {
    return state.accessoryModelPage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.accessoryModelPage.message;
}
export const getCurrentPage = (state) => {
    return state.accessoryModelPage.currentPage;
}

export const getPageSize = (state) => {
    return state.accessoryModelPage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.accessoryModelPage.totalItemsCount;
}
export const getIsCreated = (state) => {
    return state.accessoryModelPage.isCreated;
}
export const getAccessoryModelItemSel = (state) => {
    return state.accessoryModelPage.accessoryModelItem;
}
export const getSortData = (state) => {
    return state.accessoryModelPage.sortData;
}
export const getAccessoryModelListAll = (state) => {
    return state.accessoryModelPage.accessoryModelListAll;
}