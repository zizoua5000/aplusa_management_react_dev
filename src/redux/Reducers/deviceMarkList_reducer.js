import { deviceMarkAPI } from "../../api/deviceMarkAPI";
import { stopSubmit } from "redux-form";

const SET_DEVICE_TYPES = "SET_DEVICE_TYPES"
const IS_FETCHING = "IS_FETCHING"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_PAGE_SIZE = "SET_PAGE_SIZE"
const SET_TOTAL_ITEMS_COUNT = "SET_TOTAL_ITEMS_COUNT"
const IS_CREATED = "IS_CREATED"
const SET_DEVICE_TYPE_ITEM = "SET_DEVICE_TYPE_ITEM"
const SET_FORM_GET_DATA="SET_FORM_GET_DATA"
const ADD_PAGE_TO_FORM_GET_DATA="ADD_PAGE_TO_FORM_GET_DATA"
const SET_SORT_DATA="SET_SORT_DATA"
const ADD_SORT_DATA_TO_FORM_GET_DATA="ADD_SORT_DATA_TO_FORM_GET_DATA"
const SET_DEVICE_TYPE_LIST_ALL = "SET_DEVICE_TYPE_LIST_ALL"

let initialState = {
    deviceMarkList: null,
    deviceMarkItem: null,
    deviceMarkListAll:null,
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

const deviceMarkListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DEVICE_TYPES:
            {
                return { ...state, deviceMarkList: action.deviceMarkList }
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
        case SET_DEVICE_TYPE_ITEM:
            {
                return { ...state, deviceMarkItem: action.deviceMarkItem }
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
        case SET_DEVICE_TYPE_LIST_ALL:
            {
                return { ...state, deviceMarkListAll: action.deviceMarkListAll }
            }                     
        default:
            return state;
    }
}


export const actions = {
    setDeviceMarkList: (deviceMarkList) => ({ type: SET_DEVICE_TYPES, deviceMarkList }),
    setIsFetching: (isFetching) => ({ type: IS_FETCHING, isFetching }),
    setErrorMessage: (message) => ({ type: SET_ERROR_MESSAGE, message }),
    setCurrentPage: (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage }),
    setPageSize: (pageSize) => ({ type: SET_PAGE_SIZE, pageSize }),
    setTotalItemsCount: (totalItemsCount) => ({ type: SET_TOTAL_ITEMS_COUNT, totalItemsCount }),
    setIsCreated: (isCreated) => ({ type: IS_CREATED, isCreated }),
    setDeviceMarkItem: (deviceMarkItem) => ({ type: SET_DEVICE_TYPE_ITEM, deviceMarkItem }),
    setFormGetData: (formGetData) => ({ type: SET_FORM_GET_DATA, formGetData }),
    setAddPageToFormGetData: (pageNumber) => ({ type: ADD_PAGE_TO_FORM_GET_DATA, pageNumber }),
    setSortData: (sortData) => ({ type: SET_SORT_DATA, sortData }),
    setAddSortDataToFormGetData: (sortData) => ({ type: ADD_SORT_DATA_TO_FORM_GET_DATA, sortData }),
    setDeviceMarkListAll: (deviceMarkListAll) => ({ type: SET_DEVICE_TYPE_LIST_ALL, deviceMarkListAll }),
}

export const sortDeviceMarkList = (sortData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setDeviceMarkList(null));
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().deviceMarkPage.sortData));
        let response = await deviceMarkAPI.getDeviceMarkListNEW(getState().deviceMarkPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDeviceMarkList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterDeviceMarkList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setDeviceMarkList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await deviceMarkAPI.getDeviceMarkListNEW(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDeviceMarkList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestDeviceMarkList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setDeviceMarkList(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        let response = await deviceMarkAPI.getDeviceMarkListNEW(getState().deviceMarkPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setDeviceMarkList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestDeviceMarkListAll = (isExport=false) => {
    let response;
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        // dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setDeviceMarkListAll(null));
        // await dispatch(actions.setAddPageToFormGetData(pageNumber));
        // let response = await deviceMarkAPI.getDeviceMarkList(pageNumber);  
        if(isExport){
            let formGetData=getState().deviceMarkPage.formGetData
            const {page, ...restformGetData}=formGetData
            console.log(formGetData)
            console.log(restformGetData)
                response = await deviceMarkAPI.getDeviceMarkListNEW(restformGetData, getState().deviceMarkPage.max_page_size)
            } 
            else {
                response = await deviceMarkAPI.getDeviceMarkListNEW(1, getState().deviceMarkPage.max_page_size)    
            }                                                      
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setDeviceMarkListAll(response.results));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const createDeviceMark = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await deviceMarkAPI.createDeviceMark(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('deviceMarkCreate', response.data))
        }
    }
}

export const getDeviceMarkItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await deviceMarkAPI.getDeviceMark(id);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setDeviceMarkItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('deviceMarkUpdate', response.data))
        }

    }
}

export const updateDeviceMarkItem = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await deviceMarkAPI.updateDeviceMark(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('deviceMarkUpdate', response.data))
        }
        
    }
}

export const deleteDeviceMarkItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        await deviceMarkAPI.deleteDeviceMark(id);
        dispatch(actions.setIsFetching(false));
    }
}

export default deviceMarkListReducer;
