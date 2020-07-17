// import {createSelector} from "reselect";

export const getResponsiblePersonList = (state) => {
    return state.responsiblePersonPage.responsiblePersonList;
}

export const getIsFetching = (state) => {
    return state.responsiblePersonPage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.responsiblePersonPage.message;
}
export const getCurrentPage = (state) => {
    return state.responsiblePersonPage.currentPage;
}

export const getPageSize = (state) => {
    return state.responsiblePersonPage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.responsiblePersonPage.totalItemsCount;
}
export const getIsCreated = (state) => {
    return state.responsiblePersonPage.isCreated;
}
export const getResponsiblePersonItemSel = (state) => {
    return state.responsiblePersonPage.responsiblePersonItem;
}
export const getSortData = (state) => {
    return state.responsiblePersonPage.sortData;
}
export const getResponsiblePersonListAll = (state) => {
    return state.responsiblePersonPage.responsiblePersonListAll;
}
export const getPersonListAll = (state) => {
    return state.responsiblePersonPage.personListAll;
}
export const getDepartmentListAll = (state) => {
    return state.responsiblePersonPage.departmentListAll;
}