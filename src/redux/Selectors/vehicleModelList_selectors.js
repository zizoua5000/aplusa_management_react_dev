// import {createSelector} from "reselect";

export const getVehicleModelList = (state) => {
    return state.vehicleModelPage.vehicleModelList;
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
    return state.vehicleTypePage.isFetching;
}
