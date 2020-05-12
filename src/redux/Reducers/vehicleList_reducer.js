import { vehicleAPI, vehicleModelAPI, vehicleMarkAPI, vehicleTypeAPI } from "../../api/api";
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

let initialState = {
    vehicleList: null,
    vehicleModelList: null,
    vehicleMarkList: null,
    vehicleTypeList: null,
    vehicleModelItem: null,
    currentPage: 1,
    pageSize: 10,
    totalItemsCount: 0,
    isFetching: false,
    isCreated: false,
    message: null,
    vehicleModelCount: 0,
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
    setVehicleModelCount: (vehicleModelCount) => ({ type: SET_VEHICLE_MODEL_COUNT, vehicleModelCount })
}

export const requestVehicleList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setVehicleList(null));
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

export const requestVehicleModelList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        let pagesCount = 1
        let sumModelList = []
        console.log("PAGE COUNT ", pagesCount)
        for (let i = 1; i <= pagesCount; i++) {
            dispatch(actions.setIsFetching(true));
            let response = await vehicleModelAPI.getVehicleModelList(pageNumber = i)
            dispatch(actions.setIsFetching(false));
            if (response !== 'error') {
                sumModelList = sumModelList.concat(response.results)
                console.log("TYPE LIST", response)
                console.log(sumModelList)
                if (i === 1) {
                    pagesCount = Math.ceil(response.count / 10);
                    console.log(pagesCount)
                }
            } else {
                dispatch(actions.setErrorMessage(response))
                break;
            }
        }
        dispatch(actions.setVehicleModelList(sumModelList));

    }
}


export const requestVehicleMarkList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        let pagesCount = 1
        let sumMarkList = []
        console.log("PAGE COUNT ", pagesCount)
        for (let i = 1; i <= pagesCount; i++) {
            dispatch(actions.setIsFetching(true));
            let response = await vehicleMarkAPI.getVehicleMarkList(pageNumber = i)
            dispatch(actions.setIsFetching(false));
            if (response !== 'error') {
                sumMarkList = sumMarkList.concat(response.results)
                console.log("TYPE LIST", response)
                console.log(sumMarkList)
                if (i === 1) {
                    pagesCount = Math.ceil(response.count / 10);
                    console.log(pagesCount)
                }
            } else {
                dispatch(actions.setErrorMessage(response))
                break;
            }
        }
        dispatch(actions.setVehicleMarkList(sumMarkList));

    }
}

export const requestVehicleTypeList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        let pagesCount = 1
        let sumTypeList = []
        console.log("PAGE COUNT ", pagesCount)
        for (let i = 1; i <= pagesCount; i++) {
            dispatch(actions.setIsFetching(true));
            let response = await vehicleTypeAPI.getvehicleTypeList(pageNumber = i)
            dispatch(actions.setIsFetching(false));
            if (response !== 'error') {
                sumTypeList = sumTypeList.concat(response.results)
                console.log("TYPE LIST", response)
                console.log(sumTypeList)
                if (i === 1) {
                    pagesCount = Math.ceil(response.count / 10);
                    console.log(pagesCount)
                }
            } else {
                dispatch(actions.setErrorMessage(response))
                break;
            }
        }
        dispatch(actions.setVehicleTypeList(sumTypeList));

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