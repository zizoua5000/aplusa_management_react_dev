// import {createSelector} from "reselect";

export const getSimcardList = (state) => {
    return state.SimcardPage.simcardList;
}

export const getIsFetching = (state) => {
    return state.simcardPage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.simcardPage.message;
}
export const getCurrentPage = (state) => {
    return state.simcardPage.currentPage;
}

export const getPageSize = (state) => {
    return state.simcardPage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.simcardPage.totalItemsCount;
}
export const getIsCreated = (state) => {
    return state.simcardPage.isCreated;
}
export const getSimcardItemSel = (state) => {
    return state.simcardPage.simcardItem;
}
