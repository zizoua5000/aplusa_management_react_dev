
export const getMProjectCompanyList = (state) => {
    return state.mProjectCompanyPage.mProjectCompanyList;
}

export const getMProjectCompanyItemSel = (state) => {
    return state.mProjectCompanyPage.mProjectCompanyItem;
}

export const getProjectList = (state) => {
    return state.mProjectCompanyPage.projectList;
}

export const getCompanyList = (state) => {
    return state.mProjectCompanyPage.companyList;
}

export const getIsFetching = (state) => {
    return state.mProjectCompanyPage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.mProjectCompanyPage.message;
}

export const getCurrentPage = (state) => {
    return state.mProjectCompanyPage.currentPage;
}

export const getPageSize = (state) => {
    return state.mProjectCompanyPage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.mProjectCompanyPage.totalItemsCount;
}

export const getIsCreated= (state) => {
    return state.mProjectCompanyPage.isCreated;
}

export const getSortData = (state) => {
    return state.mProjectCompanyPage.sortData;
}

export const getMProjectCompanyListAll = (state) => {
    return state.mProjectCompanyPage.mProjectCompanyListAll;
}