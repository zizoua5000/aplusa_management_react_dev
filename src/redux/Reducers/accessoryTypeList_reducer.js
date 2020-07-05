import { accessoryTypeAPI } from "../../api/accessoryTypeAPI";
import { stopSubmit } from "redux-form";

const SET_ACCESSORY_TYPES = "SET_ACCESSORY_TYPES"
const IS_FETCHING = "IS_FETCHING"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_PAGE_SIZE = "SET_PAGE_SIZE"
const SET_TOTAL_ITEMS_COUNT = "SET_TOTAL_ITEMS_COUNT"
const IS_CREATED = "IS_CREATED"
const SET_ACCESSORY_TYPE_ITEM = "SET_ACCESSORY_TYPE_ITEM"
const SET_FORM_GET_DATA="SET_FORM_GET_DATA"
const ADD_PAGE_TO_FORM_GET_DATA="ADD_PAGE_TO_FORM_GET_DATA"
const SET_SORT_DATA="SET_SORT_DATA"
const ADD_SORT_DATA_TO_FORM_GET_DATA="ADD_SORT_DATA_TO_FORM_GET_DATA"
const SET_ACCESSORY_TYPE_LIST_ALL = "SET_ACCESSORY_TYPE_LIST_ALL"

let initialState = {
    accessoryTypeList: [],
    accessoryTypeItem: [],
    accessoryTypeListAll:[],
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

const accessoryTypeListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACCESSORY_TYPES:
            {
                return { ...state, accessoryTypeList: action.accessoryTypeList }
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
        case SET_ACCESSORY_TYPE_ITEM:
            {
                return { ...state, accessoryTypeItem: action.accessoryTypeItem }
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
        case SET_ACCESSORY_TYPE_LIST_ALL:
            {
                return { ...state, accessoryTypeListAll: action.accessoryTypeListAll }
            }                     
        default:
            return state;
    }
}


export const actions = {
    setAccessoryTypeList: (accessoryTypeList) => ({ type: SET_ACCESSORY_TYPES, accessoryTypeList }),
    setIsFetching: (isFetching) => ({ type: IS_FETCHING, isFetching }),
    setErrorMessage: (message) => ({ type: SET_ERROR_MESSAGE, message }),
    setCurrentPage: (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage }),
    setPageSize: (pageSize) => ({ type: SET_PAGE_SIZE, pageSize }),
    setTotalItemsCount: (totalItemsCount) => ({ type: SET_TOTAL_ITEMS_COUNT, totalItemsCount }),
    setIsCreated: (isCreated) => ({ type: IS_CREATED, isCreated }),
    setAccessoryTypeItem: (accessoryTypeItem) => ({ type: SET_ACCESSORY_TYPE_ITEM, accessoryTypeItem }),
    setFormGetData: (formGetData) => ({ type: SET_FORM_GET_DATA, formGetData }),
    setAddPageToFormGetData: (pageNumber) => ({ type: ADD_PAGE_TO_FORM_GET_DATA, pageNumber }),
    setSortData: (sortData) => ({ type: SET_SORT_DATA, sortData }),
    setAddSortDataToFormGetData: (sortData) => ({ type: ADD_SORT_DATA_TO_FORM_GET_DATA, sortData }),
    setAccessoryTypeListAll: (accessoryTypeListAll) => ({ type: SET_ACCESSORY_TYPE_LIST_ALL, accessoryTypeListAll }),
}

export const sortAccessoryTypeList = (sortData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setAccessoryTypeList(null));
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().accessoryTypePage.sortData));
        let response = await accessoryTypeAPI.getAccessoryTypeList(getState().accessoryTypePage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setAccessoryTypeList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterAccessoryTypeList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setAccessoryTypeList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await accessoryTypeAPI.getAccessoryTypeList(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setAccessoryTypeList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestAccessoryTypeList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setAccessoryTypeList(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        let response = await accessoryTypeAPI.getAccessoryTypeList(getState().accessoryTypePage.formGetData);
        console.log("Accessory Type:", response)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setAccessoryTypeList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestAccessoryTypeListAll = (isExport=false) => {
    let response;
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        // dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setAccessoryTypeListAll(null));
        // await dispatch(actions.setAddPageToFormGetData(pageNumber));
        // let response = await accessoryTypeAPI.getAccessoryTypeList(pageNumber);  
        if(isExport){
            let formGetData=getState().accessoryTypePage.formGetData
            const {page, ...restformGetData}=formGetData
            console.log(formGetData)
            console.log(restformGetData)
                response = await accessoryTypeAPI.getAccessoryTypeList(restformGetData, getState().accessoryTypePage.max_page_size)
            } 
            else {
                response = await accessoryTypeAPI.getAccessoryTypeList(1, getState().accessoryTypePage.max_page_size)    
            }                                                      
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setAccessoryTypeListAll(response.results));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const createAccessoryType = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await accessoryTypeAPI.createAccessoryType(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('accessoryTypeCreate', response.data))
        }
    }
}

export const getAccessoryTypeItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await accessoryTypeAPI.getAccessoryType(id);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setAccessoryTypeItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('accessoryTypeUpdate', response.data))
        }

    }
}

export const updateAccessoryTypeItem = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await accessoryTypeAPI.updateAccessoryType(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('accessoryTypeUpdate', response.data))
        }
        
    }
}

export const deleteAccessoryTypeItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        await accessoryTypeAPI.deleteAccessoryType(id);
        dispatch(actions.setIsFetching(false));
    }
}

export default accessoryTypeListReducer;
