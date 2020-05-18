// import {createSelector} from "reselect";

export const getVehicleTypeList = (state) => {
    return state.vehicleTypePage.vehicleTypeList;
}

export const getIsFetching = (state) => {
    return state.vehicleTypePage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.vehicleTypePage.message;
}
export const getCurrentPage = (state) => {
    return state.vehicleTypePage.currentPage;
}

export const getPageSize = (state) => {
    return state.vehicleTypePage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.vehicleTypePage.totalItemsCount;
}
export const getIsCreated = (state) => {
    return state.vehicleTypePage.isCreated;
}
export const getVehicleTypeItemSel = (state) => {
    return state.vehicleTypePage.vehicleTypeItem;
}
export const getSortData = (state) => {
    return state.vehicleTypePage.sortData;
}