
export const getVehicleMarkList = (state) => {
    return state.vehicleMarkPage.vehicleMarkList;
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