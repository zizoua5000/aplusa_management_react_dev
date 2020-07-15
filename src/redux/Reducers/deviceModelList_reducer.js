import { deviceModelAPI} from "../../api/deviceModelAPI";
import { deviceMarkAPI} from "../../api/deviceMarkAPI";
import { stopSubmit } from "redux-form";

const SET_DEVICE_MODELS = "SET_DEVICE_MODELS"
const SET_DEVICE_MARK_ALL = "SET_DEVICE_MARK_ALL"
const SET_DEVICE_MODEL_ITEM = "SET_DEVICE_MODEL_ITEM"
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
const SET_DEVICE_MODEL_LIST_ALL = "SET_DEVICE_MODEL_LIST_ALL"


let initialState = {
    deviceModelList: [],
    deviceMarkListAll: [],
    deviceModelItem: null,
    currentPage: 1,
    pageSize: 10,
    max_page_size:10000,
    totalItemsCount: 0,
    isFetching: false,
    isCreated: false,
    message: null,
    formGetData:{},
    sortData:{},
    deviceModelListAll: [],
};

const deviceModelListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DEVICE_MODELS:
            {
                return { ...state, deviceModelList: action.deviceModelList }
            }
        case SET_DEVICE_MARK_ALL:
            {
                return { ...state, deviceMarkListAll: action.deviceMarkListAll }
            }
        case SET_DEVICE_MODEL_ITEM:
            {
                return { ...state, deviceModelItem: action.deviceModelItem }
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
        case SET_DEVICE_MODEL_LIST_ALL:
            {
                return { ...state, deviceModelListAll: action.deviceModelListAll }
            }             
        default:
            return state;
    }
}


export const actions = {
    setDeviceModelList: (deviceModelList) => ({ type: SET_DEVICE_MODELS, deviceModelList }),
    setDeviceMarkListAll: (deviceMarkListAll) => ({ type: SET_DEVICE_MARK_ALL, deviceMarkListAll }),
    setDeviceModelItem: (deviceModelItem) => ({ type: SET_DEVICE_MODEL_ITEM, deviceModelItem }),
    setCurrentPage: (currentPage=1) => ({ type: SET_CURRENT_PAGE, currentPage }),
    setPageSize: (pageSize) => ({ type: SET_PAGE_SIZE, pageSize }),
    setTotalItemsCount: (totalItemsCount) => ({ type: SET_TOTAL_ITEMS_COUNT, totalItemsCount }),
    setIsFetching: (isFetching) => ({ type: IS_FETCHING, isFetching }),
    setErrorMessage: (message) => ({ type: SET_ERROR_MESSAGE, message }),
    setIsCreated: (isCreated) => ({ type: IS_CREATED, isCreated }),
    setFormGetData: (formGetData) => ({ type: SET_FORM_GET_DATA, formGetData }),
    setAddPageToFormGetData: (pageNumber) => ({ type: ADD_PAGE_TO_FORM_GET_DATA, pageNumber }),
    setSortData: (sortData) => ({ type: SET_SORT_DATA, sortData }),
    setAddSortDataToFormGetData: (sortData) => ({ type: ADD_SORT_DATA_TO_FORM_GET_DATA, sortData }),
    setDeviceModelListAll: (deviceModelListAll) => ({ type: SET_DEVICE_MODEL_LIST_ALL, deviceModelListAll }),

}

export const sortDeviceModelList = (sortData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(getState().deviceModelPage.formGetData.page));
        dispatch(actions.setDeviceModelList(null));
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().deviceModelPage.sortData));
        let response = await deviceModelAPI.getDeviceModelList(getState().deviceModelPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDeviceModelList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterDeviceModelList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setDeviceModelList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await deviceModelAPI.getDeviceModelList(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDeviceModelList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestDeviceModelList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setDeviceModelList(null));
        dispatch(actions.setCurrentPage(pageNumber));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        let response = await deviceModelAPI.getDeviceModelList(getState().deviceModelPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDeviceModelList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}
export const requestDeviceModelListAll = (isExport=false) => {
    let response;
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        // dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setDeviceModelListAll(null));
        // await dispatch(actions.setAddPageToFormGetData(pageNumber));
        if(isExport){
            let formGetData=getState().deviceModelPage.formGetData
            const {page, ...restformGetData}=formGetData
            console.log(formGetData)
            console.log(restformGetData)
                response = await deviceModelAPI.getDeviceModelList(restformGetData, getState().deviceModelPage.max_page_size)
            } 
            else {
                response = await deviceModelAPI.getDeviceModelList(1, getState().deviceModelPage.max_page_size)    
            }    
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setDeviceModelListAll(response.results));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestDeviceMarkListAll = () => {
    return async (dispatch, getState) => {
        console.log("LOG FOR LOG    ")
        dispatch(actions.setIsFetching(true));
        let response = await deviceMarkAPI.getDeviceMarkList(1,getState().deviceModelPage.max_page_size);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDeviceMarkListAll(response.results));
            
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const createDeviceModel = (formData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await deviceModelAPI.createDeviceModel(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('deviceModelCreate', response.data))
        }
    }
}

export const getDeviceModelItem = (id) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await deviceModelAPI.getDeviceModel(id);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setDeviceModelItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('deviceModelUpdate', response.data))
        }

    }
}

export const updateDeviceModelItem = (formData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await deviceModelAPI.updateDeviceModel(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('deviceModelUpdate', response.data))
        }
    }
}

export const deleteDeviceModelItem = (id) => {
    return async(dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        await deviceModelAPI.deleteDeviceModel(id);
        dispatch(actions.setIsFetching(false));
    }
}

export default deviceModelListReducer;