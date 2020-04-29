import { vehicleMarkAPI } from "../../api/api";

const SET_VEHICLE_MARK_LIST = "SET_VEHICLE_MARK_LIST"
const SET_VEHICLE_MARK_ITEM = "SET_VEHICLE_MARK_ITEM"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_PAGE_SIZE = "SET_PAGE_SIZE"
const SET_TOTAL_ITEMS_COUNT = "SET_TOTAL_ITEMS_COUNT"
const IS_FETCHING = "IS_FETCHING"
const IS_CREATED = "IS_CREATED"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"

let initialState = {
    vehicleMarkList: null,
    vehicleMarkItem: null,
    currentPage: 1,
    pageSize: 10,
    totalItemsCount: 0,
    isFetching: false,
    isCreated: false,
    message: null
};

const vehicleMarkListReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_VEHICLE_MARK_LIST:
            {
                return { ...state, vehicleMarkList: action.vehicleMarkList }
            }
        case SET_VEHICLE_MARK_ITEM:
            {
                return { ...state, vehicleMarkItem: action.vehicleMarkItem }
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
    setVehicleMarkList: (vehicleMarkList) => ({ type: SET_VEHICLE_MARK_LIST, vehicleMarkList }),
    setVehicleMarkItem: (vehicleMarkItem) => ({ type: SET_VEHICLE_MARK_ITEM, vehicleMarkItem }),
    setCurrentPage: (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage }),
    setPageSize: (pageSize) => ({ type: SET_PAGE_SIZE, pageSize }),
    setTotalItemsCount: (totalItemsCount) => ({ type: SET_TOTAL_ITEMS_COUNT, totalItemsCount }),
    setIsFetching: (isFetching) => ({ type: IS_FETCHING, isFetching }),
    setErrorMessage: (message) => ({ type: SET_ERROR_MESSAGE, message }),
    setIsCreated: (isCreated) => ({ type: IS_CREATED, isCreated }),
}

export const requestVehicleMarkList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setCurrentPage(pageNumber));
        let response = await vehicleMarkAPI.getVehicleMarkList(pageNumber);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setVehicleMarkList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}




export const createVehicleMark = (formData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let data = await vehicleMarkAPI.createVehicleMark(formData);
        dispatch(actions.setIsCreated(true));
        dispatch(actions.setIsFetching(false));
    }
}



export const getVehicleMarkItem = (id) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let data = await vehicleMarkAPI.getVehicleMark(id);
        dispatch(actions.setVehicleMarkItem(data));
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
    }
}

export const updateVehiclMarkItem = (formData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let data = await vehicleMarkAPI.updateVehicleMark(formData);
        dispatch(actions.setIsCreated(true));
        dispatch(actions.setIsFetching(false));
    }
}

export const deleteVehicleMarkItem = (id) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let data = await vehicleMarkAPI.deleteVehicleMark(id);
        dispatch(actions.setIsFetching(false));
    }
}

export default vehicleMarkListReducer;