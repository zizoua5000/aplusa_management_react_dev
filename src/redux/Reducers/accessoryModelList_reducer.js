import { accessoryModelAPI } from "../../api/accessoryModelAPI";
import { stopSubmit } from "redux-form";

const SET_ACCESSORY_MODELS = "SET_ACCESSORY_MODELS"
const IS_FETCHING = "IS_FETCHING"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_PAGE_SIZE = "SET_PAGE_SIZE"
const SET_TOTAL_ITEMS_COUNT = "SET_TOTAL_ITEMS_COUNT"
const IS_CREATED = "IS_CREATED"
const SET_ACCESSORY_MODEL_ITEM = "SET_ACCESSORY_MODEL_ITEM"
const SET_FORM_GET_DATA="SET_FORM_GET_DATA"
const ADD_PAGE_TO_FORM_GET_DATA="ADD_PAGE_TO_FORM_GET_DATA"
const SET_SORT_DATA="SET_SORT_DATA"
const ADD_SORT_DATA_TO_FORM_GET_DATA="ADD_SORT_DATA_TO_FORM_GET_DATA"
const SET_ACCESSORY_MODEL_LIST_ALL = "SET_ACCESSORY_MODEL_LIST_ALL"

let initialState = {
    accessoryModelList: [],
    accessoryModelItem: [],
    accessoryModelListAll:[],
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

const accessoryModelListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACCESSORY_MODELS:
            {
                return { ...state, accessoryModelList: action.accessoryModelList }
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
        case SET_ACCESSORY_MODEL_ITEM:
            {
                return { ...state, accessoryModelItem: action.accessoryModelItem }
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
        case SET_ACCESSORY_MODEL_LIST_ALL:
            {
                return { ...state, accessoryModelListAll: action.accessoryModelListAll }
            }                     
        default:
            return state;
    }
}


export const actions = {
    setAccessoryModelList: (accessoryModelList) => ({ type: SET_ACCESSORY_MODELS, accessoryModelList }),
    setIsFetching: (isFetching) => ({ type: IS_FETCHING, isFetching }),
    setErrorMessage: (message) => ({ type: SET_ERROR_MESSAGE, message }),
    setCurrentPage: (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage }),
    setPageSize: (pageSize) => ({ type: SET_PAGE_SIZE, pageSize }),
    setTotalItemsCount: (totalItemsCount) => ({ type: SET_TOTAL_ITEMS_COUNT, totalItemsCount }),
    setIsCreated: (isCreated) => ({ type: IS_CREATED, isCreated }),
    setAccessoryModelItem: (accessoryModelItem) => ({ type: SET_ACCESSORY_MODEL_ITEM, accessoryModelItem }),
    setFormGetData: (formGetData) => ({ type: SET_FORM_GET_DATA, formGetData }),
    setAddPageToFormGetData: (pageNumber) => ({ type: ADD_PAGE_TO_FORM_GET_DATA, pageNumber }),
    setSortData: (sortData) => ({ type: SET_SORT_DATA, sortData }),
    setAddSortDataToFormGetData: (sortData) => ({ type: ADD_SORT_DATA_TO_FORM_GET_DATA, sortData }),
    setAccessoryModelListAll: (accessoryModelListAll) => ({ type: SET_ACCESSORY_MODEL_LIST_ALL, accessoryModelListAll }),
}

export const sortAccessoryModelList = (sortData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setAccessoryModelList(null));
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().accessoryModelPage.sortData));
        let response = await accessoryModelAPI.getAccessoryModelList(getState().accessoryModelPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setAccessoryModelList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterAccessoryModelList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setAccessoryModelList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await accessoryModelAPI.getAccessoryModelList(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setAccessoryModelList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestAccessoryModelList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setAccessoryModelList(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        let response = await accessoryModelAPI.getAccessoryModelList(getState().accessoryModelPage.formGetData);
        console.log("Accessory Model:", response)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setAccessoryModelList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestAccessoryModelListAll = (isExport=false) => {
    let response;
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        // dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setAccessoryModelListAll(null));
        // await dispatch(actions.setAddPageToFormGetData(pageNumber));
        // let response = await accessoryModelAPI.getAccessoryModelList(pageNumber);  
        if(isExport){
            let formGetData=getState().accessoryModelPage.formGetData
            const {page, ...restformGetData}=formGetData
            console.log(formGetData)
            console.log(restformGetData)
                response = await accessoryModelAPI.getAccessoryModelList(restformGetData, getState().accessoryModelPage.max_page_size)
            } 
            else {
                response = await accessoryModelAPI.getAccessoryModelList(1, getState().accessoryModelPage.max_page_size)    
            }                                                      
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setAccessoryModelListAll(response.results));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const createAccessoryModel = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await accessoryModelAPI.createAccessoryModel(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('accessoryModelCreate', response.data))
        }
    }
}

export const getAccessoryModelItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await accessoryModelAPI.getAccessoryModel(id);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setAccessoryModelItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('accessoryModelUpdate', response.data))
        }

    }
}

export const updateAccessoryModelItem = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await accessoryModelAPI.updateAccessoryModel(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('accessoryModelUpdate', response.data))
        }
        
    }
}

export const deleteAccessoryModelItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        await accessoryModelAPI.deleteAccessoryModel(id);
        dispatch(actions.setIsFetching(false));
    }
}

export default accessoryModelListReducer;
