import { deviceLocationAPI } from "../../api/deviceLocationAPI";
import { stopSubmit } from "redux-form";

const SET_DEVICE_LOCATIONS = "SET_DEVICE_LOCATIONS"
const IS_FETCHING = "IS_FETCHING"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_PAGE_SIZE = "SET_PAGE_SIZE"
const SET_TOTAL_ITEMS_COUNT = "SET_TOTAL_ITEMS_COUNT"
const IS_CREATED = "IS_CREATED"
const SET_DEVICE_LOCATION_ITEM = "SET_DEVICE_LOCATION_ITEM"
const SET_FORM_GET_DATA="SET_FORM_GET_DATA"
const ADD_PAGE_TO_FORM_GET_DATA="ADD_PAGE_TO_FORM_GET_DATA"
const SET_SORT_DATA="SET_SORT_DATA"
const ADD_SORT_DATA_TO_FORM_GET_DATA="ADD_SORT_DATA_TO_FORM_GET_DATA"
const SET_DEVICE_LOCATION_LIST_ALL = "SET_DEVICE_LOCATION_LIST_ALL"

let initialState = {
    deviceLocationList: null,
    deviceLocationItem: null,
    deviceLocationListAll:null,
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

const deviceLocationListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DEVICE_LOCATIONS:
            {
                return { ...state, deviceLocationList: action.deviceLocationList }
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
        case SET_DEVICE_LOCATION_ITEM:
            {
                return { ...state, deviceLocationItem: action.deviceLocationItem }
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
        case SET_DEVICE_LOCATION_LIST_ALL:
            {
                return { ...state, deviceLocationListAll: action.deviceLocationListAll }
            }                     
        default:
            return state;
    }
}


export const actions = {
    setDeviceLocationList: (deviceLocationList) => ({ type: SET_DEVICE_LOCATIONS, deviceLocationList }),
    setIsFetching: (isFetching) => ({ type: IS_FETCHING, isFetching }),
    setErrorMessage: (message) => ({ type: SET_ERROR_MESSAGE, message }),
    setCurrentPage: (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage }),
    setPageSize: (pageSize) => ({ type: SET_PAGE_SIZE, pageSize }),
    setTotalItemsCount: (totalItemsCount) => ({ type: SET_TOTAL_ITEMS_COUNT, totalItemsCount }),
    setIsCreated: (isCreated) => ({ type: IS_CREATED, isCreated }),
    setDeviceLocationItem: (deviceLocationItem) => ({ type: SET_DEVICE_LOCATION_ITEM, deviceLocationItem }),
    setFormGetData: (formGetData) => ({ type: SET_FORM_GET_DATA, formGetData }),
    setAddPageToFormGetData: (pageNumber) => ({ type: ADD_PAGE_TO_FORM_GET_DATA, pageNumber }),
    setSortData: (sortData) => ({ type: SET_SORT_DATA, sortData }),
    setAddSortDataToFormGetData: (sortData) => ({ type: ADD_SORT_DATA_TO_FORM_GET_DATA, sortData }),
    setDeviceLocationListAll: (deviceLocationListAll) => ({ type: SET_DEVICE_LOCATION_LIST_ALL, deviceLocationListAll }),
}

export const sortDeviceLocationList = (sortData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setDeviceLocationList(null));
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().deviceLocationPage.sortData));
        let response = await deviceLocationAPI.getDeviceLocationList(getState().deviceLocationPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDeviceLocationList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterDeviceLocationList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setDeviceLocationList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await deviceLocationAPI.getDeviceLocationList(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDeviceLocationList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestDeviceLocationList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setDeviceLocationList(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        let response = await deviceLocationAPI.getDeviceLocationList(getState().deviceLocationPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setDeviceLocationList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestDeviceLocationListAll = (isExport=false) => {
    let response;
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        // dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setDeviceLocationListAll(null));
        // await dispatch(actions.setAddPageToFormGetData(pageNumber));
        // let response = await deviceLocationAPI.getDeviceLocationList(pageNumber);  
        if(isExport){
            let formGetData=getState().deviceLocationPage.formGetData
            const {page, ...restformGetData}=formGetData
            console.log(formGetData)
            console.log(restformGetData)
                response = await deviceLocationAPI.getDeviceLocationList(restformGetData, getState().deviceLocationPage.max_page_size)
            } 
            else {
                response = await deviceLocationAPI.getDeviceLocationList(1, getState().deviceLocationPage.max_page_size)    
            }                                                      
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setDeviceLocationListAll(response.results));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const createDeviceLocation = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await deviceLocationAPI.createDeviceLocation(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('deviceLocationCreate', response.data))
        }
    }
}

export const getDeviceLocationItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await deviceLocationAPI.getDeviceLocation(id);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setDeviceLocationItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('deviceLocationUpdate', response.data))
        }

    }
}

export const updateDeviceLocationItem = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await deviceLocationAPI.updateDeviceLocation(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('deviceLocationUpdate', response.data))
        }
        
    }
}

export const deleteDeviceLocationItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        await deviceLocationAPI.deleteDeviceLocation(id);
        dispatch(actions.setIsFetching(false));
    }
}

export default deviceLocationListReducer;
