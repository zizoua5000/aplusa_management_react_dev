import { accessoryAPI } from "../../api/accessoryAPI";
import { accessoryModelAPI } from "../../api/accessoryModelAPI";
import { accessoryTypeAPI } from "../../api/accessoryTypeAPI";
import { companyAPI } from "../../api/companyAPI";
import { stopSubmit } from "redux-form";

const SET_ACCESSORYS = "SET_ACCESSORYS"
const SET_ACCESSORY_MODEL_ALL = "SET_ACCESSORY_MODEL_ALL"
const SET_ACCESSORY_TYPE_ALL = "SET_ACCESSORY_TYPE_ALL"
const SET_COMPANY_ALL = "SET_COMPANY_ALL"
const SET_ACCESSORY_ITEM = "SET_ACCESSORY_ITEM"
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
const SET_ACCESSORY_LIST_ALL = "SET_ACCESSORY_LIST_ALL"
const SET_ACCESSORY_HISTORY_LIST_BY_ID = "SET_ACCESSORY_HISTORY_LIST_BY_ID"
let initialState = {
    accessoryList: [],
    accessoryModelListAll: [],
    accessoryTypeListAll: [],
    companyListAll:[],
    accessoryHistoryListById:[],
    accessoryModelItem: null,
    currentPage: 1,
    pageSize: 10,
    max_page_size:10000,
    totalItemsCount: 0,
    isFetching: false,
    isCreated: false,
    message: null,
    accessoryListAll: [],
    sortData:{},
    formGetData:{},
};

const accessoryListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACCESSORYS:
            {
                return { ...state, accessoryList: action.accessoryList }
            }
        case SET_ACCESSORY_MODEL_ALL:
            {
                return { ...state, accessoryModelListAll: action.accessoryModelListAll }
            }       
        case SET_ACCESSORY_TYPE_ALL:
            {
                return { ...state, accessoryTypeListAll: action.accessoryTypeListAll }
            }
        case SET_COMPANY_ALL:
            {
                return { ...state, companyListAll: action.companyListAll }
            }     
        case SET_ACCESSORY_HISTORY_LIST_BY_ID:
            {
                return { ...state, accessoryHistoryListById: action.accessoryHistoryListById }
            }         
        case SET_ACCESSORY_ITEM:
            {
                return { ...state, accessoryItem: action.accessoryItem }
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
        case SET_ACCESSORY_LIST_ALL:
            {
                return { ...state, accessoryListAll: action.accessoryListAll }
            }           
        default:
            return state;
    }
}


export const actions = {
    setAccessoryList: (accessoryList) => ({ type: SET_ACCESSORYS, accessoryList }),
    setAccessoryModelListAll: (accessoryModelListAll) => ({ type: SET_ACCESSORY_MODEL_ALL, accessoryModelListAll }),
    setAccessoryTypeListAll: (accessoryTypeListAll) => ({ type: SET_ACCESSORY_TYPE_ALL, accessoryTypeListAll }),
    setAccessoryItem: (accessoryItem) => ({ type: SET_ACCESSORY_ITEM, accessoryItem }),
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
    setAccessoryListAll: (accessoryListAll) => ({ type: SET_ACCESSORY_LIST_ALL, accessoryListAll }),
    setCompanyListAll: (companyListAll) => ({ type: SET_COMPANY_ALL, companyListAll }),
    setAccessoryHistoryListById: (accessoryHistoryListById) => ({ type: SET_ACCESSORY_HISTORY_LIST_BY_ID, accessoryHistoryListById }),
}
export const sortAccessoryList = (sortData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setAccessoryList(null));
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().accessoryPage.sortData));
        let response = await accessoryAPI.getAccessoryList(getState().accessoryPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setAccessoryList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterAccessoryList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setAccessoryList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await accessoryAPI.getAccessoryList(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setAccessoryList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestAccessoryList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setAccessoryList(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        let response = await accessoryAPI.getAccessoryList(getState().accessoryPage.formGetData);
        console.log("RESPONSE ", response)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setAccessoryList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestAccessoryListAll = (isExport=false) => {
    let response;
    console.log(isExport)
    return async (dispatch, getState) => {
        console.log("Something for log")        
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        // dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setAccessoryListAll(null));
        // await dispatch(actions.setAddPageToFormGetData(pageNumber));
        if(isExport){
        let formGetData=getState().accessoryPage.formGetData
        const {page, ...restformGetData}=formGetData
        console.log(formGetData)
        console.log(restformGetData)
            response = await accessoryAPI.getAccessoryList(restformGetData, getState().accessoryPage.max_page_size)
        } 
        else {
            response = await accessoryAPI.getAccessoryList(1, getState().accessoryPage.max_page_size)    
        }
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setAccessoryListAll(response.results));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestAccessoryModelListAll = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await accessoryModelAPI.getAccessoryModelList(1,getState().accessoryPage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setAccessoryModelListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}


export const requestAccessoryTypeListAll = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await accessoryTypeAPI.getAccessoryTypeList(1,getState().accessoryPage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setAccessoryTypeListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestCompanyListAll = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await companyAPI.getCompanyList(1,getState().accessoryPage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setCompanyListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const createAccessory = (formData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await accessoryAPI.createAccessory(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            console.log("Response ", response)
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('accessoryCreate', response.data))
            console.log("Response ", response)
        }
    }
}

export const getAccessoryItem = (id) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await accessoryAPI.getAccessory(id);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setAccessoryItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('accessoryUpdate', response.data))
        }

    }
}

export const requestAccessoryHistoryListById = (id) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await accessoryAPI.getAccessory(id);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));

            dispatch(actions.setAccessoryHistoryListById(response.data.accessory_histories));
            console.log("ACCESSORY HISTORY ",response.data.accessory_histories)
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('accessoryHistory', response.data))
        }

    }
}

export const updateAccessoryItem = (formData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await accessoryAPI.updateAccessory(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('accessoryUpdate', response.data))
        }
    }
}

export const deleteAccessoryItem = (id) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        await accessoryAPI.deleteAccessory(id);
        dispatch(actions.setIsFetching(false));
    }
}

export default accessoryListReducer;