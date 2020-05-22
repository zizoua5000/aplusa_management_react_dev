
export const getVehicleMarkList = (state) => {
    return state.vehicleMarkPage.vehicleMarkList;
}
export const getVehicleMarkItemSel = (state) => {
    return state.vehicleMarkPage.vehicleMarkItem;
}

export const getIsFetching = (state) => {
    return state.vehicleMarkPage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.vehicleMarkPage.message;
}

export const getCurrentPage = (state) => {
    return state.vehicleMarkPage.currentPage;
}

export const getPageSize = (state) => {
    return state.vehicleMarkPage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.vehicleMarkPage.totalItemsCount;
}
export const getIsCreated= (state) => {
    return state.vehicleMarkPage.isCreated;
}
export const getSortData = (state) => {
    return state.vehicleMarkPage.sortData;
}
export const getVehicleMarkListAll = (state) => {
    return state.vehicleMarkPage.vehicleMarkListAll;
}