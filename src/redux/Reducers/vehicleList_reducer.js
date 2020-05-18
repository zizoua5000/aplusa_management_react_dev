import { vehicleAPI } from "../../api/vehicleAPI";
import { vehicleMarkAPI } from "../../api/vehicleMarkAPI";
import { vehicleModelAPI } from "../../api/vehicleModelAPI";
import { vehicleTypeAPI } from "../../api/vehicleTypeAPI";
import { stopSubmit } from "redux-form";

const SET_VEHICLES = "SET_VEHICLES"
const SET_VEHICLE_MODELS = "SET_VEHICLE_MODELS"
const SET_VEHICLE_MARKS = "SET_VEHICLE_MARKS"
const SET_VEHICLE_TYPES = "SET_VEHICLE_TYPES"
const SET_VEHICLE_ITEM = "SET_VEHICLE_ITEM"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_PAGE_SIZE = "SET_PAGE_SIZE"
const SET_TOTAL_ITEMS_COUNT = "SET_TOTAL_ITEMS_COUNT"
const IS_FETCHING = "IS_FETCHING"
const IS_CREATED = "IS_CREATED"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"
const SET_VEHICLE_MODEL_COUNT = "SET_VEHICLE_MODEL_COUNT"
const ADD_PAGE_TO_FORM_GET_DATA="ADD_PAGE_TO_FORM_GET_DATA"

let initialState = {
    vehicleList: null,
    vehicleModelList: null,
    vehicleMarkList: null,
    vehicleTypeList: null,
    vehicleModelItem: null,
    currentPage: 1,
    pageSize: 10,
    max_page_size:1000,
    totalItemsCount: 0,
    isFetching: false,
    isCreated: false,
    message: null,
    vehicleModelCount: 0,
    formGetData:{},
};

const vehicleListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VEHICLES:
            {
                return { ...state, vehicleList: action.vehicleList }
            }
        case SET_VEHICLE_MODELS:
            {
                return { ...state, vehicleModelList: action.vehicleModelList }
            }
        case SET_VEHICLE_MARKS:
            {
                return { ...state, vehicleMarkList: action.vehicleMarkList }
            }
        case SET_VEHICLE_TYPES:
            {
                return { ...state, vehicleTypeList: action.vehicleTypeList }
            }
        case SET_VEHICLE_ITEM:
            {
                return { ...state, vehicleItem: action.vehicleItem }
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
        case SET_VEHICLE_MODEL_COUNT:
            {
                return { ...state, vehicleModelCount: action.vehicleModelCount }
            }
        case ADD_PAGE_TO_FORM_GET_DATA:
            {
                let newFormGetData=state.formGetData
                newFormGetData.page=action.pageNumber
                return { ...state, formGetData:newFormGetData }
            }            
        default:
            return state;
    }
}


export const actions = {
    setVehicleList: (vehicleList) => ({ type: SET_VEHICLES, vehicleList }),
    setVehicleModelList: (vehicleModelList) => ({ type: SET_VEHICLE_MODELS, vehicleModelList }),
    setVehicleMarkList: (vehicleMarkList) => ({ type: SET_VEHICLE_MARKS, vehicleMarkList }),
    setVehicleTypeList: (vehicleTypeList) => ({ type: SET_VEHICLE_TYPES, vehicleTypeList }),
    setVehicleItem: (vehicleItem) => ({ type: SET_VEHICLE_ITEM, vehicleItem }),
    setCurrentPage: (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage }),
    setPageSize: (pageSize) => ({ type: SET_PAGE_SIZE, pageSize }),
    setTotalItemsCount: (totalItemsCount) => ({ type: SET_TOTAL_ITEMS_COUNT, totalItemsCount }),
    setIsFetching: (isFetching) => ({ type: IS_FETCHING, isFetching }),
    setErrorMessage: (message) => ({ type: SET_ERROR_MESSAGE, message }),
    setIsCreated: (isCreated) => ({ type: IS_CREATED, isCreated }),
    setVehicleModelCount: (vehicleModelCount) => ({ type: SET_VEHICLE_MODEL_COUNT, vehicleModelCount }),
    setAddPageToFormGetData: (pageNumber) => ({ type: ADD_PAGE_TO_FORM_GET_DATA, pageNumber }),
}

export const requestVehicleList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setVehicleList(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        let response = await vehicleAPI.getVehicleList(pageNumber);
        console.log(response)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setVehicleList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}
export const requestVehicleModelList = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await vehicleModelAPI.getVehicleModelListNEW(getState().vehiclePage.formGetData,
                                                                    getState().vehiclePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setVehicleModelList(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestVehicleMarkList = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await vehicleMarkAPI.getVehicleMarkList(1,getState().vehiclePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setVehicleMarkList(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}
export const requestVehicleTypeList = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await vehicleTypeAPI.getVehicleTypeList(1,getState().vehiclePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setVehicleTypeList(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const createVehicle = (formData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await vehicleAPI.createVehicle(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('vehicleCreate', response.data))
        }
    }
}

export const getVehicleItem = (id) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await vehicleAPI.getVehicle(id);
        console.log("ITEM", response)
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setVehicleItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('vehicleUpdate', response.data))
        }

    }
}

export const updateVehicleItem = (formData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await vehicleAPI.updateVehicle(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('vehicleUpdate', response.data))
        }
    }
}

export const deleteVehicleItem = (id) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        await vehicleAPI.deleteVehicle(id);
        dispatch(actions.setIsFetching(false));
    }
}

export default vehicleListReducer;