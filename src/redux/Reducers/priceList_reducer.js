import { priceAPI } from "../../api/priceAPI";
import { priceTypeAPI } from "../../api/priceTypeAPI";
import { deviceModelAPI } from "../../api/deviceModelAPI";
import { deviceMarkAPI } from "../../api/deviceMarkAPI";
import { projectAPI } from "../../api/projectAPI";
import { accessoryModelAPI } from "../../api/accessoryModelAPI";
import { stopSubmit } from "redux-form";
import moment from 'moment';

const SET_PRICES = "SET_PRICES"
const IS_FETCHING = "IS_FETCHING"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_PAGE_SIZE = "SET_PAGE_SIZE"
const SET_TOTAL_ITEMS_COUNT = "SET_TOTAL_ITEMS_COUNT"
const IS_CREATED = "IS_CREATED"
const SET_PRICE_ITEM = "SET_PRICE_ITEM"
const SET_FORM_GET_DATA="SET_FORM_GET_DATA"
const ADD_PAGE_TO_FORM_GET_DATA="ADD_PAGE_TO_FORM_GET_DATA"
const SET_SORT_DATA="SET_SORT_DATA"
const ADD_SORT_DATA_TO_FORM_GET_DATA="ADD_SORT_DATA_TO_FORM_GET_DATA"
const SET_PRICE_ALL = "SET_PRICE_ALL"
const SET_DEVICE_MODEL_ALL = "SET_DEVICE_MODEL_ALL"
const SET_DEVICE_MARK_ALL = "SET_DEVICE_MARK_ALL"
const SET_ACCESSORY_MODEL_ALL = "SET_ACCESSORY_MODEL_ALL"
const SET_PRICE_TYPE_ALL = "SET_PRICE_TYPE_ALL"
const SET_PROJECT_ALL = "SET_PROJECT_ALL"

let initialState = {
    priceList: [],
    priceItem: [],
    priceListAll:[],
    deviceModelListAll:[],
    deviceMarkListAll:[],
    accessoryModelListAll:[],
    projectListAll:[],
    priceTypeListAll:[],
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

const priceListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRICES:
            {
                console.log("-----------MMMMMMMMMMMMMMMMMMMM----------")
                let newPriceList=action.priceList
                let utcOffset = moment().utcOffset()
                for (let i in newPriceList) {
                    let objStartDate = newPriceList[i]['start_datetime'] 
                    let addUTCStartDateGMTHours = moment(objStartDate).add(utcOffset,'minutes')
                    let convertStartDateUTC = moment.parseZone(addUTCStartDateGMTHours).utc().format()
                    newPriceList[i]['start_datetime']=convertStartDateUTC

                    if(newPriceList[i]['end_datetime']!==null){
                    let objEndDate = newPriceList[i]['end_datetime'] 
                    let addUTCEndDateGMTHours = moment(objEndDate).add(utcOffset,'minutes')
                    let convertEndDateUTC = moment.parseZone(addUTCEndDateGMTHours).utc().format()                    
                    newPriceList[i]['end_datetime']=convertEndDateUTC
                    }
                }
                return { ...state, priceList: newPriceList }
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
        case SET_PRICE_ITEM:
            {                
                return { ...state, priceItem: action.priceItem }
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
        case SET_PRICE_ALL:
            {
                let newPriceListAll=action.priceListAll
                let utcOffset = moment().utcOffset()
                for (let i in newPriceListAll) {
                    let objStartDate = newPriceListAll[i]['start_datetime'] 
                    let addUTCStartDateGMTHours = moment(objStartDate).add(utcOffset,'minutes')
                    let convertStartDateUTC = moment.parseZone(addUTCStartDateGMTHours).utc().format()
                    newPriceListAll[i]['start_datetime']=convertStartDateUTC

                    if(newPriceListAll[i]['end_datetime']!==null){
                    let objEndDate = newPriceListAll[i]['end_datetime'] 
                    let addUTCEndDateGMTHours = moment(objEndDate).add(utcOffset,'minutes')
                    let convertEndDateUTC = moment.parseZone(addUTCEndDateGMTHours).utc().format()                    
                    newPriceListAll[i]['end_datetime']=convertEndDateUTC
                    }
                }
                return { ...state, priceListAll: newPriceListAll }
            }
        case SET_PRICE_TYPE_ALL:
            {
                return { ...state, priceTypeListAll: action.priceTypeListAll }
            } 
        case SET_PROJECT_ALL:
            {
                return { ...state, projectListAll: action.projectListAll }
            }  
        case SET_DEVICE_MODEL_ALL:
            {
                return { ...state, deviceModelListAll: action.deviceModelListAll }
            } 
        case SET_ACCESSORY_MODEL_ALL:
            {
                return { ...state, accessoryModelListAll: action.accessoryModelListAll }
            } 
        case SET_DEVICE_MARK_ALL:
            {
                return { ...state, deviceMarkListAll: action.deviceMarkListAll }
            }                                                                                      
        default:
            return state;
    }
}


export const actions = {
    setPriceList: (priceList) => ({ type: SET_PRICES, priceList }),
    setIsFetching: (isFetching) => ({ type: IS_FETCHING, isFetching }),
    setErrorMessage: (message) => ({ type: SET_ERROR_MESSAGE, message }),
    setCurrentPage: (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage }),
    setPageSize: (pageSize) => ({ type: SET_PAGE_SIZE, pageSize }),
    setTotalItemsCount: (totalItemsCount) => ({ type: SET_TOTAL_ITEMS_COUNT, totalItemsCount }),
    setIsCreated: (isCreated) => ({ type: IS_CREATED, isCreated }),
    setPriceItem: (priceItem) => ({ type: SET_PRICE_ITEM, priceItem }),
    setFormGetData: (formGetData) => ({ type: SET_FORM_GET_DATA, formGetData }),
    setAddPageToFormGetData: (pageNumber) => ({ type: ADD_PAGE_TO_FORM_GET_DATA, pageNumber }),
    setSortData: (sortData) => ({ type: SET_SORT_DATA, sortData }),
    setAddSortDataToFormGetData: (sortData) => ({ type: ADD_SORT_DATA_TO_FORM_GET_DATA, sortData }),
    setPriceListAll: (priceListAll) => ({ type: SET_PRICE_ALL, priceListAll }),
    setPriceTypeListAll: (priceTypeListAll) => ({ type: SET_PRICE_TYPE_ALL, priceTypeListAll }),
    setProjectListAll: (projectListAll) => ({ type: SET_PROJECT_ALL, projectListAll }),
    setDeviceModelListAll: (deviceModelListAll) => ({ type: SET_DEVICE_MODEL_ALL, deviceModelListAll }),
    setDeviceMarkListAll: (deviceMarkListAll) => ({ type: SET_DEVICE_MARK_ALL, deviceMarkListAll }),
    setAccessoryModelListAll: (accessoryModelListAll) => ({ type: SET_ACCESSORY_MODEL_ALL, accessoryModelListAll }),
    
}

export const sortPriceList = (sortData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setPriceList(null));
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().pricePage.sortData));
        let response = await priceAPI.getPriceList(getState().pricePage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setPriceList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterPriceList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setPriceList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await priceAPI.getPriceList(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setPriceList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestPriceList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setPriceList(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        let response = await priceAPI.getPriceList(getState().pricePage.formGetData);
        console.log(response)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {   
            dispatch(actions.setPriceList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestPriceListAll = (isExport = false) => {
    let response;
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setPriceListAll(null));
        if(isExport){
            let formGetData=getState().pricePage.formGetData
            const {page, ...restformGetData}=formGetData
                response = await priceAPI.getPriceList(restformGetData, getState().pricePage.max_page_size)
            } 
            else {
                response = await priceAPI.getPriceList(1, getState().pricePage.max_page_size)    
            }                                        
        dispatch(actions.setIsFetching(false));
        
        if (response !== 'error') {     
            dispatch(actions.setPriceListAll(response.results));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}
export const requestDeviceModelListAll = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await deviceModelAPI.getDeviceModelList(1,getState().pricePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDeviceModelListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestDeviceMarkListAll = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await deviceMarkAPI.getDeviceMarkList(1,getState().pricePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDeviceMarkListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}
export const requestProjectListAll = () => {
    console.log("requestPROJECTLISTALL")
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await projectAPI.getProjectList(1,getState().pricePage.max_page_size)
        console.log(response)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setProjectListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}
export const requestAccessoryModelListAll = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await accessoryModelAPI.getAccessoryModelList(1,
                                                    getState().pricePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setAccessoryModelListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestPriceTypeListAll = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await priceTypeAPI.getPriceTypeList(1,getState().pricePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setPriceTypeListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}
export const createPrice = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await priceAPI.createPrice(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('priceCreate', response.data))
        }
    }
}

export const getPriceItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await priceAPI.getPrice(id);
        console.log(response)
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setPriceItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('priceUpdate', response.data))
        }

    }
}

export const updatePriceItem = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await priceAPI.updatePrice(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('priceUpdate', response.data))
        }
        
    }
}

export const deletePriceItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        await priceAPI.deletePrice(id);
        dispatch(actions.setIsFetching(false));
    }
}

export default priceListReducer;
