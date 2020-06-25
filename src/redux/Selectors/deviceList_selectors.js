
export const getDeviceList = (state) => {
    return state.devicePage.deviceList;
}
export const getDeviceItemSel = (state) => {
    return state.devicePage.deviceItem;
}
export const getDeviceModelListAll = (state) => {
    return state.devicePage.deviceModelListAll;
}
export const getDeviceMarkListAll = (state) => {
    return state.devicePage.deviceMarkListAll;
}
export const getDeviceTypeListAll = (state) => {
    return state.devicePage.deviceTypeListAll;
}

export const getIsFetching = (state) => {
    return state.devicePage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.devicePage.message;
}

export const getCurrentPage = (state) => {
    return state.devicePage.currentPage;
}

export const getPageSize = (state) => {
    return state.devicePage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.devicePage.totalItemsCount;
}
export const getIsCreated= (state) => {
    return state.devicePage.isCreated;
}

export const getSortData = (state) => {
    return state.devicePage.sortData;
}
export const getDeviceListAll = (state) => {
    return state.devicePage.deviceListAll;
}
export const getCompanyListAll = (state) => {
    return state.devicePage.companyListAll;
}