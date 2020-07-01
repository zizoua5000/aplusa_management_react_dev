import { statusAPI } from "../../api/statusAPI";
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
    statusList: null,
    statusItem: null,
    statusListAll:null,
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

const statusListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REGIONS:
            {
                return { ...state, statusList: action.statusList }
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
                return { ...state, statusItem: action.statusItem }
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
                return { ...state, statusListAll: action.statusListAll }
            }                     
        default:
            return state;
    }
}


export const actions = {
    setStatusList: (statusList) => ({ type: SET_REGIONS, statusList }),
    setIsFetching: (isFetching) => ({ type: IS_FETCHING, isFetching }),
    setErrorMessage: (message) => ({ type: SET_ERROR_MESSAGE, message }),
    setCurrentPage: (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage }),
    setPageSize: (pageSize) => ({ type: SET_PAGE_SIZE, pageSize }),
    setTotalItemsCount: (totalItemsCount) => ({ type: SET_TOTAL_ITEMS_COUNT, totalItemsCount }),
    setIsCreated: (isCreated) => ({ type: IS_CREATED, isCreated }),
    setStatusItem: (statusItem) => ({ type: SET_REGION_ITEM, statusItem }),
    setFormGetData: (formGetData) => ({ type: SET_FORM_GET_DATA, formGetData }),
    setAddPageToFormGetData: (pageNumber) => ({ type: ADD_PAGE_TO_FORM_GET_DATA, pageNumber }),
    setSortData: (sortData) => ({ type: SET_SORT_DATA, sortData }),
    setAddSortDataToFormGetData: (sortData) => ({ type: ADD_SORT_DATA_TO_FORM_GET_DATA, sortData }),
    setStatusListAll: (statusListAll) => ({ type: SET_REGION_LIST_ALL, statusListAll }),
}

export const sortStatusList = (sortData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setStatusList(null));
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().statusPage.sortData));
        let response = await statusAPI.getStatusListNEW(getState().statusPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setStatusList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterStatusList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setStatusList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await statusAPI.getStatusListNEW(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setStatusList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestStatusList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setStatusList(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        // let response = await statusAPI.getStatusList(pageNumber);        
        let response = await statusAPI.getStatusListNEW(getState().statusPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setStatusList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestStatusListAll = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setStatusListAll(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        // let response = await statusAPI.getStatusList(pageNumber);        
        let response = await statusAPI.getStatusListNEW(1,
                                                                getState().statusPage.max_page_size);                                            
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setStatusListAll(response.results));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const createStatus = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await statusAPI.createStatus(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('statusCreate', response.data))
        }
    }
}

export const getStatusItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await statusAPI.getStatus(id);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setStatusItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('statusUpdate', response.data))
        }

    }
}

export const updateStatusItem = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await statusAPI.updateStatus(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('statusUpdate', response.data))
        }
        
    }
}

export const deleteStatusItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        await statusAPI.deleteStatus(id);
        dispatch(actions.setIsFetching(false));
    }
}

export default statusListReducer;
