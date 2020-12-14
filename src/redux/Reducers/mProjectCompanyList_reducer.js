import { mProjectCompanyAPI } from "../../api/mProjectCompanyAPI";
import { companyAPI } from "../../api/companyAPI";
import { projectAPI } from "../../api/projectAPI";
import { stopSubmit } from "redux-form";

const SET_M_PROJECT_COMPANIES = "SET_M_PROJECT_COMPANIES"
const SET_PROJECTS = "SET_PROJECTS"
const SET_COMPANIES = "SET_COMPANIES"
const SET_M_PROJECT_COMPANY_ITEM = "SET_M_PROJECT_COMPANY_ITEM"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_PAGE_SIZE = "SET_PAGE_SIZE"
const SET_TOTAL_ITEMS_COUNT = "SET_TOTAL_ITEMS_COUNT"
const IS_FETCHING = "IS_FETCHING"
const IS_CREATED = "IS_CREATED"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"
const SET_FORM_GET_DATA="SET_FORM_GET_DATA"
const ADD_PAGE_TO_FORM_GET_DATA="ADD_PAGE_TO_FORM_GET_DATA"
const SET_SORT_DATA="SET_SORT_DATA"
const ADD_SORT_DATA_TO_FORM_GET_DATA="ADD_SORT_DATA_TO_FORM_GET_DATA"
const SET_M_PROJECT_COMPANY_LIST_ALL = "SET_M_PROJECT_COMPANY_LIST_ALL"

let initialState = {
    mProjectCompanyList: [],
    projectList: [],
    companyList: [],
    mProjectCompanyItem: null,
    currentPage: 1,
    pageSize: 10,
    max_page_size:10000,
    totalItemsCount: 0,
    isFetching: false,
    isCreated: false,
    message: null,
    mProjectCompanyListAll: [],
    sortData:{},
    formGetData:{},
};

const mProjectCompanyListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_M_PROJECT_COMPANIES:
            {
                return { ...state, mProjectCompanyList: action.mProjectCompanyList }
            }
        case SET_PROJECTS:
            {
                return { ...state, projectList: action.projectList }
            }          
        case SET_COMPANIES:
            {
                return { ...state, companyList: action.companyList }
            }
        case SET_M_PROJECT_COMPANY_ITEM:
            {
                return { ...state, mProjectCompanyItem: action.mProjectCompanyItem }
            }
        case SET_CURRENT_PAGE:
            {
                return { ...state, currentPage: action.currentPage }
            }
        case SET_PAGE_SIZE:
            {
                return { ...state, pageSize: action.pageSize }
            }
        case SET_TOTAL_ITEMS_COUNT:
            {
                return { ...state, totalItemsCount: action.totalItemsCount }
            }
        case IS_FETCHING:
            {
                return { ...state, isFetching: action.isFetching }
            }
        case SET_ERROR_MESSAGE:
            {
                return { ...state, message: action.message }
            }
        case IS_CREATED:
            {
                return { ...state, isCreated: action.isCreated }
            }
        case SET_FORM_GET_DATA:
            {
                return { ...state, formGetData:action.formGetData }
            }
        case ADD_PAGE_TO_FORM_GET_DATA:
            {
                let newFormGetData=state.formGetData
                newFormGetData.page=action.pageNumber
                return { ...state, formGetData:newFormGetData }
            }
        case SET_SORT_DATA:
            {
                let newSortData=state.sortData
                if(action.sortData!=null){
                    for (let [key, value] of Object.entries(action.sortData)) {
                        newSortData[key]=value
                    }
                }else{
                    newSortData={}
                }
               
                return { ...state, sortData:newSortData }
            }
        case ADD_SORT_DATA_TO_FORM_GET_DATA:
            {
                let newFormGetData=state.formGetData
                newFormGetData.sortData=action.sortData
                return { ...state, formGetData:newFormGetData }
            }
        case SET_M_PROJECT_COMPANY_LIST_ALL:
            {
                return { ...state, mProjectCompanyListAll: action.mProjectCompanyListAll }
            }         
        default:
            return state;
    }
}


export const actions = {
    setMProjectCompanyList: (mProjectCompanyList) => ({ type: SET_M_PROJECT_COMPANIES, mProjectCompanyList }),
    setProjectList: (projectList) => ({ type: SET_PROJECTS, projectList }),
    setCompanyList: (companyList) => ({ type: SET_COMPANIES, companyList }),
    setMProjectCompanyItem: (mProjectCompanyItem) => ({ type: SET_M_PROJECT_COMPANY_ITEM, mProjectCompanyItem }),
    setCurrentPage: (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage }),
    setPageSize: (pageSize) => ({ type: SET_PAGE_SIZE, pageSize }),
    setTotalItemsCount: (totalItemsCount) => ({ type: SET_TOTAL_ITEMS_COUNT, totalItemsCount }),
    setIsFetching: (isFetching) => ({ type: IS_FETCHING, isFetching }),
    setErrorMessage: (message) => ({ type: SET_ERROR_MESSAGE, message }),
    setIsCreated: (isCreated) => ({ type: IS_CREATED, isCreated }),
    setFormGetData: (formGetData) => ({ type: SET_FORM_GET_DATA, formGetData }),
    setAddPageToFormGetData: (pageNumber) => ({ type: ADD_PAGE_TO_FORM_GET_DATA, pageNumber }),
    setSortData: (sortData) => ({ type: SET_SORT_DATA, sortData }),
    setAddSortDataToFormGetData: (sortData) => ({ type: ADD_SORT_DATA_TO_FORM_GET_DATA, sortData }),
    setMProjectCompanyListAll: (mProjectCompanyListAll) => ({ type: SET_M_PROJECT_COMPANY_LIST_ALL, mProjectCompanyListAll }),

}
export const sortMProjectCompanyList = (sortData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setMProjectCompanyList(null));
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().mProjectCompanyPage.sortData));
        let response = await mProjectCompanyAPI.getMProjectCompanyList(getState().mProjectCompanyPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setMProjectCompanyList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterMProjectCompanyList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setMProjectCompanyList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await mProjectCompanyAPI.getMProjectCompanyList(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setMProjectCompanyList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestMProjectCompanyList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setMProjectCompanyList(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));

        let response = await mProjectCompanyAPI.getMProjectCompanyList(getState().mProjectCompanyPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setMProjectCompanyList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestMProjectCompanyListAll = (pageNumber = 1,forExport=false) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setMProjectCompanyListAll(null));
        var response;
        if (forExport){
            let formGetData=getState().mProjectCompanyPage.formGetData
            const {page, ...restformGetData}=formGetData
            await dispatch(actions.setAddPageToFormGetData(pageNumber));
            response = await mProjectCompanyAPI.getMProjectCompanyList(restformGetData, getState().mProjectCompanyPage.max_page_size); 
        }else{
            await dispatch(actions.setAddPageToFormGetData(pageNumber));
            response = await mProjectCompanyAPI.getMProjectCompanyList(1, getState().mProjectCompanyPage.max_page_size); 
        }                                                     
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {  
            let responseResult=response.results
            responseResult.forEach(function(item){ delete item.main_mProjectCompany })
            dispatch(actions.setMProjectCompanyListAll(responseResult));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestProjectList = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await projectAPI.getProjectList(1,getState().mProjectCompanyPage.max_page_size)
        console.log("TEST PROJECT_COMPANY")
        console.log(response)
        console.log("TEST PROJECT_COMPANY")
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setProjectList(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestCompanyList = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await companyAPI.getCompanyList(1,getState().mProjectCompanyPage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setCompanyList(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const getMProjectCompanyItem = (id) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await mProjectCompanyAPI.getMProjectCompany(id);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setMProjectCompanyItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('mProjectCompanyUpdate', response.data))
        }

    }
}

export const createMProjectCompany = (formData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await mProjectCompanyAPI.createMProjectCompany(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('mProjectCompanyCreate', response.data))
        }
    }
}

export const deleteMProjectCompanyItem = (id) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        await mProjectCompanyAPI.deleteMProjectCompany(id);
        dispatch(actions.setIsFetching(false));
    }
}

export default mProjectCompanyListReducer;