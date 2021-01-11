import { statusAPI } from "../../api/statusAPI";
import { responsiblePersonAPI } from "../../api/responsiblePersonAPI";
import { personAPI } from "../../api/personAPI";
import { deviceAPI } from "../../api/deviceAPI";
import { accessoryAPI } from "../../api/accessoryAPI";
import { simcardAPI } from "../../api/simcardAPI";
import { projectAPI } from "../../api/projectAPI";
import { companyAPI } from "../../api/companyAPI";
import { configurationAPI } from "../../api/configurationAPI";
import { fwVersionAPI } from "../../api/fwVersionAPI";
import { qaimeTypeAPI } from "../../api/qaimeTypeAPI";
import { qaimeAPI } from "../../api/qaimeAPI";
import { stopSubmit } from "redux-form";
// import { array } from "prop-types";

const SET_STATUSES = "SET_STATUSES"
const SET_RESPONSIBLE_PERSONS = "SET_RESPONSIBLE_PERSONS"
const SET_PERSONS = "SET_PERSONS"
const SET_DEVICES_FOR_QAIME = "SET_DEVICES_FOR_QAIME"
const SET_ACCESSORIES = "SET_ACCESSORIES"
const SET_SIMCARDS = "SET_SIMCARDS"
const SET_PROJECTS = "SET_PROJECTS"
const SET_COMPANIES = "SET_COMPANIES"
const SET_CONFIGURATIONS = "SET_CONFIGURATIONS"
const SET_FW_VERSIONS = "SET_FW_VERSIONS"
const SET_QAIME_TYPES = "SET_QAIME_TYPES"
const SET_QAIMES = "SET_QAIMES"
const SET_QAIME_ITEM = "SET_QAIME_ITEM"
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
const SET_QAIME_LIST_ALL = "SET_QAIME_LIST_ALL"

let initialState = {
    qaimeList: [],
    statusList: [],
    responsiblePersonList: [],
    personList: [],
    deviceList: [],
    accessoryList: [],
    simcardList: [],
    projectList: [],
    companyList: [],
    configurationList: [],
    fwVersionList: [],
    qaimeTypeList: [],
    qaimeItem: null,
    currentPage: 1,
    pageSize: 10,
    max_page_size:10000,
    totalItemsCount: 0,
    isFetching: false,
    isCreated: false,
    message: null,
    qaimeistAll: [],
    sortData:{},
    formGetData:{},
};

const qaimeListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_QAIMES:
            {
                return { ...state, qaimeList: action.qaimeList }
            }
        case SET_STATUSES:
            {
                return { ...state, statusList: action.statusList }
            }          
        case SET_RESPONSIBLE_PERSONS:
            {
                return { ...state, responsiblePersonList: action.responsiblePersonList }
            }
        case SET_PERSONS:
            {
                return { ...state, personList: action.personList }
            }
        case SET_DEVICES_FOR_QAIME:
            {
                return { ...state, deviceList: action.deviceList }
            }
        case SET_ACCESSORIES:
            {
                return { ...state, accessoryList: action.accessoryList }
            }
        case SET_SIMCARDS:
            {
                return { ...state, simcardList: action.simcardList }
            }
        case SET_PROJECTS:
            {
                return { ...state, projectList: action.projectList }
            }
        case SET_COMPANIES:
            {
                return { ...state, companyList: action.companyList }
            }
        case SET_CONFIGURATIONS:
            {
                return { ...state, configurationList: action.configurationList }
            }
        case SET_FW_VERSIONS:
            {
                return { ...state, fwVersionList: action.fwVersionList }
            }
        case SET_QAIME_TYPES:
            {
                return { ...state, qaimeTypeList: action.qaimeTypeList }
            }
        case SET_QAIME_ITEM:
            {
                return { ...state, qaimeItem: action.qaimeItem }
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
        case SET_QAIME_LIST_ALL:
            {
                return { ...state, qaimeListAll: action.qaimeListAll }
            }         
        default:
            return state;
    }
}


export const actions = {
    setQaimeList: (qaimeList) => ({ type: SET_QAIMES, qaimeList }),
    setStatusList: (statusList) => ({ type: SET_STATUSES, statusList }),
    setResponsiblePersonList: (responsiblePersonList) => ({ type: SET_RESPONSIBLE_PERSONS, responsiblePersonList }),
    setPersonList: (personList) => ({ type: SET_PERSONS, personList }),
    setDeviceList: (deviceList) => ({ type: SET_DEVICES_FOR_QAIME, deviceList }),
    setAccessoryList: (accessoryList) => ({ type: SET_ACCESSORIES, accessoryList }),
    setSimcardList: (simcardList) => ({ type: SET_SIMCARDS, simcardList }),
    setProjectList: (projectList) => ({ type: SET_PROJECTS, projectList }),
    setCompanyList: (companyList) => ({ type: SET_COMPANIES, companyList }),
    setConfigurationList: (configurationList) => ({ type: SET_CONFIGURATIONS, configurationList }),
    setFWVersionList: (fwVersionList) => ({ type: SET_FW_VERSIONS, fwVersionList }),
    setQaimeTypeList: (qaimeTypeList) => ({ type: SET_QAIME_TYPES, qaimeTypeList }),
    setQaimeItem: (qaimeItem) => ({ type: SET_QAIME_ITEM, qaimeItem }),
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
    setQaimeListAll: (qaimeListAll) => ({ type: SET_QAIME_LIST_ALL, qaimeListAll }),
}
export const sortQaimeList = (sortData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setQaimeList(null));
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().qaimePage.sortData));
        let response = await qaimeAPI.getQaimeList(getState().qaimePage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setQaimeList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterQaimeList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setQaimeList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await qaimeAPI.getQaimeList(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setQaimeList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestQaimeList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setQaimeList(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        let response = await qaimeAPI.getQaimeList(getState().qaimePage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setQaimeList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestQaimeListAll = (pageNumber = 1,forExport=false) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setQaimeListAll(null));
        var response;
        if (forExport){
            let formGetData=getState().qaimePage.formGetData
            const {page, ...restformGetData}=formGetData
            await dispatch(actions.setAddPageToFormGetData(pageNumber));
            response = await qaimeAPI.getQaimeList(restformGetData, getState().qaimePage.max_page_size); 
        }else{
            await dispatch(actions.setAddPageToFormGetData(pageNumber));
            response = await qaimeAPI.getQaimeList(1, getState().qaimePage.max_page_size); 
        }                                                     
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {  
            let responseResult=response.results
            responseResult.forEach(function(item){ delete item.main_qaime })
            dispatch(actions.setQaimeListAll(responseResult));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestStatusList = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await statusAPI.getStatusList(1,getState().qaimePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setStatusList(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestResponsiblePersonList = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await responsiblePersonAPI.getResponsiblePersonList(1,getState().qaimePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setResponsiblePersonList(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestPersonList = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await personAPI.getPersonList(1,getState().qaimePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setPersonList(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestDeviceList = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await deviceAPI.getDeviceList(1,getState().qaimePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDeviceList(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestAccessoryList = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await accessoryAPI.getAccessoryList(1,getState().qaimePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setAccessoryList(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestSimcardList = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await simcardAPI.getSimcardList(1,getState().qaimePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setSimcardList(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestProjectList = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await projectAPI.getProjectList(1,getState().qaimePage.max_page_size)
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
        let response = await companyAPI.getCompanyList(1,getState().qaimePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setCompanyList(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestConfigurationList = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await configurationAPI.getConfigurationList(1,getState().qaimePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setConfigurationList(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestFWVersionList = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await fwVersionAPI.getFWVersionList(1,getState().qaimePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setFWVersionList(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestQaimeTypeList = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await qaimeTypeAPI.getQaimeTypeList(1,getState().qaimePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setQaimeTypeList(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}


export const getQaimeItem = (id) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await qaimeAPI.getQaime(id);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setQaimeItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('qaimeUpdate', response.data))
        }

    }
}

export const createQaime= (formData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await qaimeAPI.createQaime(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            let error=response
            var errors = {}
            for(var field in error.data) {
                if (field != "non_field_errors") {
                    if(field=="qaime_details"){
                        let qaime_details_array=error.data[field][0]
                        let inner_err_msg=""
                        for(var inner_field in qaime_details_array){
                            inner_err_msg =inner_err_msg+inner_field +":"+ qaime_details_array[inner_field][0] + " "
                        }  
                        errors["_error"]=inner_err_msg
                    }else{
                        errors[field] = error.data[field][0]
                    }
                    
                } else {
                    errors["_error"] = error.data['non_field_errors'][0]
                }
            }
            dispatch(stopSubmit('qaimeCreate', errors))
        }
    }
}

export const createQaimeReturn= (formData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let qaime_details=formData["qaime_details"]
        for(var key in qaime_details){
            let device_id=qaime_details[key]["device"]
            if(device_id!=null){
                let device_response = await deviceAPI.getDevice(device_id);
                qaime_details[key]['simcard']=device_response.data['simcard']
                qaime_details[key]['project']=device_response.data['project']
                qaime_details[key]['company']=device_response.data['company']
                qaime_details[key]['configuration']=device_response.data['configuration']
                qaime_details[key]['fw_version']=device_response.data['fw_version']
                if(device_response.data['is_sold']==true){
                    qaime_details[key]['sold_or_rent']=true
                }
                if(device_response.data['is_rent']==true){
                    qaime_details[key]['sold_or_rent']=false
                }

            }
        }
        let response = await qaimeAPI.createQaimeReturn(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            let error=response
            var errors = {}
            for(var field in error.data) {
                if (field != "non_field_errors") {
                    if(field=="qaime_details"){
                        let qaime_details_array=error.data[field][0]
                        let inner_err_msg=""
                        for(var inner_field in qaime_details_array){
                            inner_err_msg =inner_err_msg+inner_field +":"+ qaime_details_array[inner_field][0] + " "
                        }  
                        errors["_error"]=inner_err_msg
                    }else{
                        errors[field] = error.data[field][0]
                    }
                    
                } else {
                    errors["_error"] = error.data['non_field_errors'][0]
                }
            }
            dispatch(stopSubmit('qaimeCreate', errors))
        }
    }
}

export const changeStatusQaime = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        await qaimeAPI.changeStatusQaime(id);
        dispatch(actions.setIsFetching(false));
    }
}

export const deleteQaimeItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        await qaimeAPI.deleteQaime(id);
        dispatch(actions.setIsFetching(false));
    }
}

export default qaimeListReducer;