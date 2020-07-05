// import {createSelector} from "reselect";

export const getDeviceDetailList = (state) => {
    return state.deviceDetailPage.deviceDetailList;
}

export const getIsFetching = (state) => {
    return state.deviceDetailPage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.deviceDetailPage.message;
}
export const getCurrentPage = (state) => {
    return state.deviceDetailPage.currentPage;
}

export const getPageSize = (state) => {
    return state.deviceDetailPage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.deviceDetailPage.totalItemsCount;
}
export const getIsCreated = (state) => {
    return state.deviceDetailPage.isCreated;
}
export const getDeviceDetailItemSel = (state) => {
    return state.deviceDetailPage.deviceDetailItem;
}
export const getSortData = (state) => {
    return state.deviceDetailPage.sortData;
}
export const getDeviceDetailListAll = (state) => {
    return state.deviceDetailPage.deviceDetailListAll;
}
export const getStatusListAll = (state) =>{
    return state.deviceDetailPage.statusListAll;
}
export const getSimcardListAll= (state) =>{
    return state.deviceDetailPage.simcardListAll;
}
export const getVehicleListAll = (state) =>{
    return state.deviceDetailPage.vehicleListAll;
}
export const getCompanyListAll = (state) =>{
    return state.deviceDetailPage.companyListAll;
}
export const getDeviceLocationListAll = (state) =>{
    return state.deviceDetailPage.deviceLocationListAll;
}
export const getConfigurationListAll = (state) =>{
    return state.deviceDetailPage.configurationListAll;
}
export const getProjectListAll = (state) =>{
    return state.deviceDetailPage.projectListAll;
}
export const getRegionListAll = (state) =>{
    return state.deviceDetailPage.regionListAll;
}