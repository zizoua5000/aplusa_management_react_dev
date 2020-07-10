import { deviceAPI } from "../../api/deviceAPI";
import { deviceModelAPI } from "../../api/deviceModelAPI";
import { deviceTypeAPI } from "../../api/deviceTypeAPI";
import { deviceMarkAPI } from "../../api/deviceMarkAPI";
import { companyAPI } from "../../api/companyAPI";
import { simcardAPI } from "../../api/simcardAPI";
import { vehicleAPI } from "../../api/vehicleAPI";
import { projectAPI } from "../../api/projectAPI";
import { regionAPI } from "../../api/regionAPI";
import { statusAPI } from "../../api/statusAPI";
import {configurationAPI} from "../../api/configurationAPI";
import { deviceLocationAPI } from "../../api/deviceLocationAPI";
import { personAPI } from "../../api/personAPI";
import { stopSubmit } from "redux-form";

const SET_DEVICES = "SET_DEVICES"
const SET_DEVICE_MODEL_ALL = "SET_DEVICE_MODEL_ALL"
const SET_DEVICE_MARK_ALL = "SET_DEVICE_MARK_ALL"
const SET_DEVICE_TYPE_ALL = "SET_DEVICE_TYPE_ALL"
const SET_COMPANY_ALL = "SET_COMPANY_ALL"
const SET_SIMCARD_ALL = "SET_SIMCARD_ALL"
const SET_DEVICE_ITEM = "SET_DEVICE_ITEM"
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
const SET_DEVICE_LIST_ALL = "SET_DEVICE_LIST_ALL"
const SET_VEHICLE_ALL="SET_VEHICLE_ALL"
const SET_PROJECT_ALL="SET_PROJECT_ALL"
const SET_REGION_ALL="SET_REGION_ALL"
const SET_STATUS_ALL="SET_STATUS_ALL"
const SET_CONFIGURATION_ALL="SET_CONFIGURATION_ALL"
const SET_DEVICE_LOCATION_ALL="SET_DEVICE_LOCATION_ALL"
const SET_PERSON_ALL = "SET_PERSON_ALL"

let initialState = {
    deviceList: [],
    deviceModelListAll: [],
    deviceMarkListAll: [],
    deviceTypeListAll: [],
    deviceLocationListAll: [],
    companyListAll: [],
    projectListAll: [],
    vehicleListAll: [],
    regionListAll: [],
    statusListAll: [],
    simcardListAll: [],
    configurationListAll:[],
    personListAll: [],
    deviceModelItem: null,
    currentPage: 1,
    pageSize: 10,
    max_page_size:10000,
    totalItemsCount: 0,
    isFetching: false,
    isCreated: false,
    message: null,
    deviceListAll: [],
    sortData:{},
    formGetData:{},
};

const deviceListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DEVICES:
            {
                return { ...state, deviceList: action.deviceList }
            }
        case SET_DEVICE_MODEL_ALL:
            {
                return { ...state, deviceModelListAll: action.deviceModelListAll }
            }
        case SET_DEVICE_MARK_ALL:
            {
                return { ...state, deviceMarkListAll: action.deviceMarkListAll }
            }            
        case SET_COMPANY_ALL:
            {
                return { ...state, companyListAll: action.companyListAll }
            }
        case SET_SIMCARD_ALL:
            {
                return { ...state, simcardListAll: action.simcardListAll }
            }         
        case SET_VEHICLE_ALL:
            {
                return { ...state, vehicleListAll: action.vehicleListAll }
            }
        case SET_PROJECT_ALL:
            {
                return { ...state, projectListAll: action.projectListAll }
            } 
        case SET_REGION_ALL:
            {
                return { ...state, regionListAll: action.regionListAll }
            }  
        case SET_STATUS_ALL:
            {
                return { ...state, statusListAll: action.statusListAll }
            }                                                        
        case SET_DEVICE_TYPE_ALL:
            {
                return { ...state, deviceTypeListAll: action.deviceTypeListAll }
            }
        case SET_DEVICE_LOCATION_ALL:
            {
                return { ...state, deviceLocationListAll: action.deviceLocationListAll }
            } 
        case SET_PERSON_ALL:
            {
                return { ...state, personListAll: action.personListAll }
            }              
        case SET_CONFIGURATION_ALL:
            {
                return { ...state, configurationListAll: action.configurationListAll }
            }                                        
        case SET_DEVICE_ITEM:
            {
                return { ...state, deviceItem: action.deviceItem }
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
        case SET_DEVICE_LIST_ALL:
            {
                return { ...state, deviceListAll: action.deviceListAll }
            }           
        default:
            return state;
    }
}


export const actions = {
    setDeviceList: (deviceList) => ({ type: SET_DEVICES, deviceList }),
    setDeviceModelListAll: (deviceModelListAll) => ({ type: SET_DEVICE_MODEL_ALL, deviceModelListAll }),
    setDeviceMarkListAll: (deviceMarkListAll) => ({ type: SET_DEVICE_MARK_ALL, deviceMarkListAll }),
    setDeviceTypeListAll: (deviceTypeListAll) => ({ type: SET_DEVICE_TYPE_ALL, deviceTypeListAll }),
    setDeviceItem: (deviceItem) => ({ type: SET_DEVICE_ITEM, deviceItem }),
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
    setDeviceListAll: (deviceListAll) => ({ type: SET_DEVICE_LIST_ALL, deviceListAll }),
    setCompanyListAll: (companyListAll) => ({ type: SET_COMPANY_ALL, companyListAll }),
    setSimcardListAll: (simcardListAll) => ({ type: SET_SIMCARD_ALL, simcardListAll }),
    setVehicleListAll:(vehicleListAll)=>({type: SET_VEHICLE_ALL, vehicleListAll}),
    setProjectListAll:(projectListAll)=>({type: SET_PROJECT_ALL, projectListAll}),
    setRegionListAll:(regionListAll)=>({type: SET_REGION_ALL, regionListAll}),
    setStatusListAll:(statusListAll)=>({type: SET_STATUS_ALL, statusListAll}),
    setConfigurationListAll: (configurationListAll) => ({ type: SET_CONFIGURATION_ALL, configurationListAll }),
    setDeviceLocationListAll:(deviceLocationListAll)=>({type: SET_DEVICE_LOCATION_ALL, deviceLocationListAll}),
    setPersonListAll:(personListAll)=>({type: SET_PERSON_ALL, personListAll})
}
export const sortDeviceList = (sortData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setDeviceList(null));
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().devicePage.sortData));
        let response = await deviceAPI.getDeviceListNEW(getState().devicePage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDeviceList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterDeviceList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setDeviceList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await deviceAPI.getDeviceListNEW(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDeviceList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestDeviceList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setDeviceList(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        // let response = await deviceAPI.getDeviceList(pageNumber);
        let response = await deviceAPI.getDeviceListNEW(getState().devicePage.formGetData);
        console.log(response)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDeviceList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestDeviceListAll = (isExport=false) => {
    let response;
    console.log(isExport)
    return async (dispatch, getState) => {
        console.log("Something for log")        
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        // dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setDeviceListAll(null));
        // await dispatch(actions.setAddPageToFormGetData(pageNumber));
        if(isExport){
        let formGetData=getState().devicePage.formGetData
        const {page, ...restformGetData}=formGetData
        console.log(formGetData)
        console.log(restformGetData)
            response = await deviceAPI.getDeviceListNEW(restformGetData, getState().devicePage.max_page_size)
        } 
        else {
            response = await deviceAPI.getDeviceListNEW(1, getState().devicePage.max_page_size)    
        }
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setDeviceListAll(response.results));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestDeviceModelListAll = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await deviceModelAPI.getDeviceModelListNEW(1,getState().devicePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDeviceModelListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}


export const requestDeviceTypeListAll = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await deviceTypeAPI.getDeviceTypeListNEW(1,getState().devicePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDeviceTypeListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestDeviceMarkListAll = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await deviceMarkAPI.getDeviceMarkListNEW(1,getState().devicePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDeviceMarkListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestCompanyListAll = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await companyAPI.getCompanyList(1,getState().devicePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setCompanyListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestSimcardListAll = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await simcardAPI.getSimcardList(1,getState().devicePage.max_page_size)
        console.log(response)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setSimcardListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}
export const requestVehicleListAll = () => {
    console.log("requestVehicleLISTALL")
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await vehicleAPI.getVehicleList(1,getState().devicePage.max_page_size)
        console.log(response)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setVehicleListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}
export const requestProjectListAll = () => {
    console.log("requestPROJECTLISTALL")
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await projectAPI.getProjectList(1,getState().devicePage.max_page_size)
        console.log(response)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setProjectListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}
export const requestRegionListAll = () => {
    console.log("requestRegionLISTALL")
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await regionAPI.getRegionList(1,getState().devicePage.max_page_size)
        console.log(response)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setRegionListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}
export const requestDeviceLocationListAll = () => {
    console.log("requestLocationLISTALL")
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await deviceLocationAPI.getDeviceLocationList(1,getState().devicePage.max_page_size)
        console.log(response)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDeviceLocationListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}
export const requestStatusListAll = () => {
    console.log("requeststatusLISTALL")
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await statusAPI.getStatusList(1,getState().devicePage.max_page_size)
        console.log(response)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setStatusListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}
export const requestConfigurationListAll = () => {
    console.log("requestConfigurationLISTALL")
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await configurationAPI.getConfigurationList(1,getState().devicePage.max_page_size)
        console.log(response)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setConfigurationListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}
export const requestPersonListAll = () => {
    console.log("requestPersonLISTALL")
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await personAPI.getPersonList(1,getState().devicePage.max_page_size)
        console.log(response)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setPersonListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}
export const createDevice = (formData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        console.log("CREATE DEVICE", formData)
        let response = await deviceAPI.createDevice(formData);
        console.log(response)
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            console.log('ERROR')
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            console.log('STOP SUBMIT')
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('deviceCreate', response.data))
        }
    }
}

export const getDeviceItem = (id) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await deviceAPI.getDevice(id);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setDeviceItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('deviceUpdate', response.data))
        }

    }
}

export const updateDeviceItem = (formData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await deviceAPI.updateDevice(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('deviceUpdate', response.data))
        }
    }
}

export const deleteDeviceItem = (id) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        await deviceAPI.deleteDevice(id);
        dispatch(actions.setIsFetching(false));
    }
}

export default deviceListReducer;