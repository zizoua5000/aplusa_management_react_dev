
export const getCompanyList = (state) => {
    return state.companyPage.companyList;
}

export const getCompanyItemSel = (state) => {
    return state.companyPage.companyItem;
}

export const getCompanyTypeList = (state) => {
    return state.companyPage.companyTypeList;
}

export const getIsFetching = (state) => {
    return state.companyPage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.companyPage.message;
}

export const getCurrentPage = (state) => {
    return state.companyPage.currentPage;
}

export const getPageSize = (state) => {
    return state.companyPage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.companyPage.totalItemsCount;
}
export const getIsCreated= (state) => {
    return state.companyPage.isCreated;
}

export const getSortData = (state) => {
    return state.companyPage.sortData;
}
export const getCompanyListAll = (state) => {
    return state.companyPage.companyListAll;
}