import { companyAPI } from "../../api/companyAPI";
import { deviceDetailAPI } from "../../api/deviceDetailAPI";
import { simcardAPI } from "../../api/simcardAPI";
import { vehicleAPI } from "../../api/vehicleAPI";
import { projectAPI } from "../../api/projectAPI";
import { regionAPI } from "../../api/regionAPI";
import { statusAPI } from "../../api/statusAPI";
import { deviceLocationAPI } from "../../api/deviceLocationAPI";
import { configurationAPI } from "../../api/configurationAPI";
import { stopSubmit } from "redux-form";

const SET_DEVICE_DETAILS = "SET_DEVICE_DETAILS"
const IS_FETCHING = "IS_FETCHING"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_PAGE_SIZE = "SET_PAGE_SIZE"
const SET_TOTAL_ITEMS_COUNT = "SET_TOTAL_ITEMS_COUNT"
const IS_CREATED = "IS_CREATED"
const SET_DEVICE_DETAIL_ITEM = "SET_DEVICE_DETAIL_ITEM"
const SET_FORM_GET_DATA="SET_FORM_GET_DATA"
const ADD_PAGE_TO_FORM_GET_DATA="ADD_PAGE_TO_FORM_GET_DATA"
const SET_SORT_DATA="SET_SORT_DATA"
const ADD_SORT_DATA_TO_FORM_GET_DATA="ADD_SORT_DATA_TO_FORM_GET_DATA"
const SET_DEVICE_DETAIL_LIST_ALL = "SET_DEVICE_DETAIL_LIST_ALL"
const SET_STATUS_ALL="SET_STATUS_ALL"
const SET_SIMCARD_ALL="SET_SIMCARD_ALL"
const SET_VEHICLE_ALL="SET_VEHICLE_ALL"
const SET_COMPANY_ALL="SET_COMPANY_ALL"
const SET_DEVICE_LOCATION_ALL="SET_DEVICE_LOCATION_ALL"
const SET_CONFIGURATION_ALL="SET_CONFIGURATION_ALL"
const SET_PROJECT_ALL="SET_PROJECT_ALL"
const SET_REGION_ALL="SET_REGION_ALL"

let initialState = {
    deviceDetailList: [],
    deviceDetailItem: [],
    deviceDetailListAll:[],
    statusListAll:[],
    simcardListAll:[],
    vehicleListAll:[],
    companyListAll:[],
    deviceLocationListAll:[],
    configurationListAll:[],
    projectListAll:[],
    regionListAll:[],
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

const deviceDetailListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DEVICE_DETAILS:
            {
                return { ...state, deviceDetailList: action.deviceDetailList }
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
        case SET_DEVICE_DETAIL_ITEM:
            {
                return { ...state, deviceDetailItem: action.deviceDetailItem }
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
        case SET_DEVICE_DETAIL_LIST_ALL:
            {
                return { ...state, deviceDetailListAll: action.deviceDetailListAll }
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
        case SET_DEVICE_LOCATION_ALL:
            {
                return { ...state, deviceLocationListAll: action.deviceLocationListAll }
            }  
        case SET_CONFIGURATION_ALL:
            {
                return { ...state, configurationListAll: action.configurationListAll }
            }                                   
        default:
            return state;
    }
}


export const actions = {
    setDeviceDetailList: (deviceDetailList) => ({ type: SET_DEVICE_DETAILS, deviceDetailList }),
    setIsFetching: (isFetching) => ({ type: IS_FETCHING, isFetching }),
    setErrorMessage: (message) => ({ type: SET_ERROR_MESSAGE, message }),
    setCurrentPage: (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage }),
    setPageSize: (pageSize) => ({ type: SET_PAGE_SIZE, pageSize }),
    setTotalItemsCount: (totalItemsCount) => ({ type: SET_TOTAL_ITEMS_COUNT, totalItemsCount }),
    setIsCreated: (isCreated) => ({ type: IS_CREATED, isCreated }),
    setDeviceDetailItem: (deviceDetailItem) => ({ type: SET_DEVICE_DETAIL_ITEM, deviceDetailItem }),
    setFormGetData: (formGetData) => ({ type: SET_FORM_GET_DATA, formGetData }),
    setAddPageToFormGetData: (pageNumber) => ({ type: ADD_PAGE_TO_FORM_GET_DATA, pageNumber }),
    setSortData: (sortData) => ({ type: SET_SORT_DATA, sortData }),
    setAddSortDataToFormGetData: (sortData) => ({ type: ADD_SORT_DATA_TO_FORM_GET_DATA, sortData }),
    setDeviceDetailListAll: (deviceDetailListAll) => ({ type: SET_DEVICE_DETAIL_LIST_ALL, deviceDetailListAll }),
    setVehicleListAll:(vehicleListAll)=>({type: SET_VEHICLE_ALL, vehicleListAll}),
    setProjectListAll:(projectListAll)=>({type: SET_PROJECT_ALL, projectListAll}),
    setRegionListAll:(regionListAll)=>({type: SET_REGION_ALL, regionListAll}),
    setStatusListAll:(statusListAll)=>({type: SET_STATUS_ALL, statusListAll}),
    setDeviceLocationListAll:(deviceLocationListAll)=>({type: SET_DEVICE_LOCATION_ALL, deviceLocationListAll}),
    setCompanyListAll: (companyListAll) => ({ type: SET_COMPANY_ALL, companyListAll }),
    setSimcardListAll: (simcardListAll) => ({ type: SET_SIMCARD_ALL, simcardListAll }),
    setConfigurationListAll: (configurationListAll) => ({ type: SET_CONFIGURATION_ALL, configurationListAll }),

}

export const sortDeviceDetailList = (sortData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setDeviceDetailList(null));
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().deviceDetailPage.sortData));
        let response = await deviceDetailAPI.getDeviceDetailList(getState().deviceDetailPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDeviceDetailList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterDeviceDetailList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setDeviceDetailList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await deviceDetailAPI.getDeviceDetailList(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDeviceDetailList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestDeviceDetailList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setDeviceDetailList(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        let response = await deviceDetailAPI.getDeviceDetailList(getState().deviceDetailPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setDeviceDetailList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestDeviceDetailListAll = (isExport=false) => {
    let response;
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        // dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setDeviceDetailListAll(null));
        // await dispatch(actions.setAddPageToFormGetData(pageNumber));
        // let response = await deviceDetailAPI.getDeviceDetailList(pageNumber);  
        if(isExport){
            let formGetData=getState().deviceDetailPage.formGetData
            const {page, ...restformGetData}=formGetData
            console.log(formGetData)
            console.log(restformGetData)
                response = await deviceDetailAPI.getDeviceDetailList(restformGetData, getState().deviceDetailPage.max_page_size)
            } 
            else {
                response = await deviceDetailAPI.getDeviceDetailList(1, getState().deviceDetailPage.max_page_size)    
            }                                                      
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setDeviceDetailListAll(response.results));
        } else {
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
export const createDeviceDetail = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await deviceDetailAPI.createDeviceDetail(formData);
        dispatch(actions.setIsFetching(false));
        console.log("CREATE DEVICE", formData)
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('deviceDetailCreate', response.data))
        }
    }
}

export const getDeviceDetailItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await deviceDetailAPI.getDeviceDetail(id);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setDeviceDetailItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('deviceDetailUpdate', response.data))
        }

    }
}

export const updateDeviceDetailItem = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await deviceDetailAPI.updateDeviceDetail(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('deviceDetailUpdate', response.data))
        }
        
    }
}

export const deleteDeviceDetailItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        await deviceDetailAPI.deleteDeviceDetail(id);
        dispatch(actions.setIsFetching(false));
    }
}

export default deviceDetailListReducer;
