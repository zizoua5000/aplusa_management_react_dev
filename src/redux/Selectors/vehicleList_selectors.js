
export const getVehicleList = (state) => {
    return state.vehiclePage.vehicleList;
}
export const getVehicleItemSel = (state) => {
    return state.vehiclePage.vehicleItem;
}
export const getVehicleModelListAll = (state) => {
    return state.vehiclePage.vehicleModelListAll;
}
export const getVehicleMarkListAll = (state) => {
    return state.vehiclePage.vehicleMarkListAll;
}
export const getVehicleTypeListAll = (state) => {
    return state.vehiclePage.vehicleTypeListAll;
}

export const getIsFetching = (state) => {
    return state.vehiclePage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.vehiclePage.message;
}

export const getCurrentPage = (state) => {
    return state.vehiclePage.currentPage;
}

export const getPageSize = (state) => {
    return state.vehiclePage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.vehiclePage.totalItemsCount;
}
export const getIsCreated= (state) => {
    return state.vehiclePage.isCreated;
}

export const getSortData = (state) => {
    return state.vehiclePage.sortData;
}
export const getVehicleListAll = (state) => {
    return state.vehiclePage.vehicleListAll;
}
export const getIsExport= (state) => {
    return state.vehiclePage.isExport;
}