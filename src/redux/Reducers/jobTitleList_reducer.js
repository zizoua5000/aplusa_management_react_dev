import { jobTitleAPI } from "../../api/jobTitleAPI";
import { stopSubmit } from "redux-form";

const SET_REGIONS = "SET_REGIONS"
const IS_FETCHING = "IS_FETCHING"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_PAGE_SIZE = "SET_PAGE_SIZE"
const SET_TOTAL_ITEMS_COUNT = "SET_TOTAL_ITEMS_COUNT"
const IS_CREATED = "IS_CREATED"
const SET_REGION_ITEM = "SET_REGION_ITEM"
const SET_FORM_GET_DATA="SET_FORM_GET_DATA"
const ADD_PAGE_TO_FORM_GET_DATA="ADD_PAGE_TO_FORM_GET_DATA"
const SET_SORT_DATA="SET_SORT_DATA"
const ADD_SORT_DATA_TO_FORM_GET_DATA="ADD_SORT_DATA_TO_FORM_GET_DATA"
const SET_REGION_LIST_ALL = "SET_REGION_LIST_ALL"

let initialState = {
    jobTitleList: null,
    jobTitleItem: null,
    jobTitleListAll:null,
    isFetching: false,
    message: null,
    currentPage: 1,
    pageSize: 10,
    max_page_size:10000,
    totalItemsCount: 0,
    isCreated: false,
    formGetData:{},
    sortData:{}
};

const jobTitleListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REGIONS:
            {
                return { ...state, jobTitleList: action.jobTitleList }
            }
        case IS_FETCHING:
            {
                return { ...state, isFetching: action.isFetching }
            }
        case SET_ERROR_MESSAGE:
            {
                return { ...state, message: action.message }
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
        case IS_CREATED:
            {
                return { ...state, isCreated: action.isCreated }
            }
        case SET_REGION_ITEM:
            {
                return { ...state, jobTitleItem: action.jobTitleItem }
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
        case SET_REGION_LIST_ALL:
            {
                return { ...state, jobTitleListAll: action.jobTitleListAll }
            }                     
        default:
            return state;
    }
}


export const actions = {
    setJobTitleList: (jobTitleList) => ({ type: SET_REGIONS, jobTitleList }),
    setIsFetching: (isFetching) => ({ type: IS_FETCHING, isFetching }),
    setErrorMessage: (message) => ({ type: SET_ERROR_MESSAGE, message }),
    setCurrentPage: (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage }),
    setPageSize: (pageSize) => ({ type: SET_PAGE_SIZE, pageSize }),
    setTotalItemsCount: (totalItemsCount) => ({ type: SET_TOTAL_ITEMS_COUNT, totalItemsCount }),
    setIsCreated: (isCreated) => ({ type: IS_CREATED, isCreated }),
    setJobTitleItem: (jobTitleItem) => ({ type: SET_REGION_ITEM, jobTitleItem }),
    setFormGetData: (formGetData) => ({ type: SET_FORM_GET_DATA, formGetData }),
    setAddPageToFormGetData: (pageNumber) => ({ type: ADD_PAGE_TO_FORM_GET_DATA, pageNumber }),
    setSortData: (sortData) => ({ type: SET_SORT_DATA, sortData }),
    setAddSortDataToFormGetData: (sortData) => ({ type: ADD_SORT_DATA_TO_FORM_GET_DATA, sortData }),
    setJobTitleListAll: (jobTitleListAll) => ({ type: SET_REGION_LIST_ALL, jobTitleListAll }),
}

export const sortJobTitleList = (sortData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setJobTitleList(null));
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().jobTitlePage.sortData));
        let response = await jobTitleAPI.getJobTitleListNEW(getState().jobTitlePage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setJobTitleList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterJobTitleList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setJobTitleList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await jobTitleAPI.getJobTitleListNEW(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setJobTitleList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestJobTitleList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setJobTitleList(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        // let response = await jobTitleAPI.getJobTitleList(pageNumber);        
        let response = await jobTitleAPI.getJobTitleListNEW(getState().jobTitlePage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setJobTitleList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestJobTitleListAll = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setJobTitleListAll(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        // let response = await jobTitleAPI.getJobTitleList(pageNumber);        
        let response = await jobTitleAPI.getJobTitleListNEW(1,
                                                                getState().jobTitlePage.max_page_size);                                            
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setJobTitleListAll(response.results));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const createJobTitle = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await jobTitleAPI.createJobTitle(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('jobTitleCreate', response.data))
        }
    }
}

export const getJobTitleItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await jobTitleAPI.getJobTitle(id);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setJobTitleItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('jobTitleUpdate', response.data))
        }

    }
}

export const updateJobTitleItem = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await jobTitleAPI.updateJobTitle(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('jobTitleUpdate', response.data))
        }
        
    }
}

export const deleteJobTitleItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        await jobTitleAPI.deleteJobTitle(id);
        dispatch(actions.setIsFetching(false));
    }
}

export default jobTitleListReducer;
