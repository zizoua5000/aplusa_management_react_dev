
export const getPersonList = (state) => {
    return state.personPage.personList;
}

export const getPersonItemSel = (state) => {
    return state.personPage.personItem;
}

export const getCompanyList = (state) => {
    return state.personPage.companyList;
}

export const getDepartmentList = (state) => {
    return state.personPage.departmentList;
}

export const getJobTitleList = (state) => {
    return state.personPage.jobTitleList;
}

export const getUserList = (state) => {
    return state.personPage.userList;
}

export const getIsFetching = (state) => {
    return state.personPage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.personPage.message;
}

export const getCurrentPage = (state) => {
    return state.personPage.currentPage;
}

export const getPageSize = (state) => {
    return state.personPage.pageSize;
}

export const getTotalItemsCount = (state) => {
    return state.personPage.totalItemsCount;
}
export const getIsCreated= (state) => {
    return state.personPage.isCreated;
}

export const getSortData = (state) => {
    return state.personPage.sortData;
}
export const getPersonListAll = (state) => {
    return state.personPage.personListAll;
}