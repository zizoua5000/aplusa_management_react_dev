import { vehicleModelAPI, vehicleMarkAPI } from "../../api/api";
import { stopSubmit } from "redux-form";

const SET_VEHICLE_MODELS = "SET_VEHICLE_MODELS"
const SET_VEHICLE_MARKS = "SET_VEHICLE_MARKS"
const SET_VEHICLE_MODEL_ITEM = "SET_VEHICLE_MODEL_ITEM"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_PAGE_SIZE = "SET_PAGE_SIZE"
const SET_TOTAL_ITEMS_COUNT = "SET_TOTAL_ITEMS_COUNT"
const IS_FETCHING = "IS_FETCHING"
const IS_CREATED = "IS_CREATED"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"

let initialState = {
    vehicleModelList: null,
    vehicleMarkList: null,
    vehicleModelItem: null,
    currentPage: 1,
    pageSize: 10,
    totalItemsCount: 0,
    isFetching: false,
    isCreated: false,
    message: null
};

const vehicleModelListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VEHICLE_MODELS:
            {
                return { ...state, vehicleModelList: action.vehicleModelList }
            }
        case SET_VEHICLE_MARKS:
            {
                return { ...state, vehicleMarkList: action.vehicleMarkList }
            }
        case SET_VEHICLE_MODEL_ITEM:
            {
                return { ...state, vehicleModelItem: action.vehicleModelItem }
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
        default:
            return state;
    }
}


export const actions = {
    setVehicleModelList: (vehicleModelList) => ({ type: SET_VEHICLE_MODELS, vehicleModelList }),
    setVehicleMarkList: (vehicleMarkList) => ({ type: SET_VEHICLE_MARKS, vehicleMarkList }),
    setVehicleModelItem: (vehicleModelItem) => ({ type: SET_VEHICLE_MODEL_ITEM, vehicleModelItem }),
    setCurrentPage: (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage }),
    setPageSize: (pageSize) => ({ type: SET_PAGE_SIZE, pageSize }),
    setTotalItemsCount: (totalItemsCount) => ({ type: SET_TOTAL_ITEMS_COUNT, totalItemsCount }),
    setIsFetching: (isFetching) => ({ type: IS_FETCHING, isFetching }),
    setErrorMessage: (message) => ({ type: SET_ERROR_MESSAGE, message }),
    setIsCreated: (isCreated) => ({ type: IS_CREATED, isCreated }),
}

export const requestVehicleModelList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setVehicleModelList(null));
        let response = await vehicleModelAPI.getVehicleModelList(pageNumber);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setVehicleModelList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestVehicleMarkList = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await vehicleMarkAPI.getVehicleMarkList()
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setVehicleMarkList(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
        

    }
}

export const createVehicleModel = (formData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await vehicleModelAPI.createVehicleModel(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('vehicleModelCreate', response.data))
        }
    }
}

export const getVehicleModelItem = (id) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await vehicleModelAPI.getVehicleModel(id);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setVehicleModelItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('vehicleModelUpdate', response.data))
        }

    }
}

export const updateVehicleModelItem = (formData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await vehicleModelAPI.updateVehicleModel(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('vehicleModelUpdate', response.data))
        }
    }
}

export const deleteVehicleModelItem = (id) => {
    return async(dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        await vehicleModelAPI.deleteVehicleModel(id);
        dispatch(actions.setIsFetching(false));
    }
}

export default vehicleModelListReducer;