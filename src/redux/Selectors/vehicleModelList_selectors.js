// import {createSelector} from "reselect";

export const getVehicleModelList = (state) => {
    return state.vehicleModelPage.vehicleModelList;
}

export const getVehicleMarkList = (state) => {
    return state.vehicleModelPage.vehicleMarkList;
}

export const getVehicleModelItemSel = (state) => {
    return state.vehicleModelPage.vehicleModelItem;
}

export const getCurrentPage = (state) => {
    return state.vehicleModelPage.currentPage;
}

export const getPageSize = (state) => {
    return state.vehicleModelPage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.vehicleModelPage.totalItemsCount;
}

export const getIsFetching = (state) => {
    return state.vehicleModelPage.isFetching;
}

export const getIsCreated= (state) => {
    return state.vehicleModelPage.isCreated;
}

export const getSetErrorMessage = (state) => {
    return state.vehicleModelPage.message;
}

export const getSortData = (state) => {
    return state.vehicleModelPage.sortData;
}
export const getVehicleModelListExcel = (state) => {
    return state.vehicleModelPage.vehicleModelListExcel;
}
