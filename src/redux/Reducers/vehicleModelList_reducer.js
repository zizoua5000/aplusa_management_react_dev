import { vehicleModelAPI, vehicleMarkAPI } from "../../api/api";
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

const SET_VEHICLE_MODELS = "SET_VEHICLE_MODELS"
const SET_VEHICLE_MARKS = "SET_VEHICLE_MARKS"
const SET_VEHICLE_MODEL_ITEM = "SET_VEHICLE_MODEL_ITEM"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_PAGE_SIZE = "SET_PAGE_SIZE"
const SET_TOTAL_ITEMS_COUNT = "SET_TOTAL_ITEMS_COUNT"
const IS_FETCHING = "IS_FETCHING"
const IS_CREATED = "IS_CREATED"

let initialState = {
    vehicleModelList: null,
    vehicleMarkList: null,
    vehicleModelItem: null,
    currentPage: 1,
    pageSize: 10,
    totalItemsCount: 0,
    isFetching: true,
    isCreated:false
};

const vehicleModelListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VEHICLE_MODELS:
            {
                return {...state, vehicleModelList: action.vehicleModelList }
            }
        case SET_VEHICLE_MARKS:
            {
                return {...state, vehicleMarkList: action.vehicleMarkList }
            }
        case SET_VEHICLE_MODEL_ITEM:
            {
                return {...state, vehicleModelItem: action.vehicleModelItem }
            }      
        case SET_CURRENT_PAGE:
            {
                return {...state, currentPage: action.currentPage}
            }
        case SET_PAGE_SIZE:
            {
                return {...state, pageSize: action.pageSize}
            }
        case SET_TOTAL_ITEMS_COUNT:
            {
                return {...state, totalItemsCount: action.totalItemsCount}
            }
        case IS_FETCHING:
            {
                return { ...state, isFetching:action.isFetching}
            }
        case IS_CREATED:
            {
                return { ...state, isCreated:action.isCreated}
            }   
        default:
            return state;
    }
}


export const actions = {
    setVehicleModelList: (vehicleModelList) => ({ type: SET_VEHICLE_MODELS, vehicleModelList }),
    setVehicleMarkList: (vehicleMarkList) => ({ type: SET_VEHICLE_MARKS, vehicleMarkList }),
    setVehicleModelItem: (vehicleModelItem) => ({ type: SET_VEHICLE_MODEL_ITEM, vehicleModelItem }),
    setCurrentPage: (currentPage) => ({type: SET_CURRENT_PAGE, currentPage}),
    setPageSize: (pageSize) => ({type: SET_PAGE_SIZE, pageSize}),
    setTotalItemsCount: (totalItemsCount) => ({type: SET_TOTAL_ITEMS_COUNT, totalItemsCount}),
    setIsFetching:(isFetching)=>({type:IS_FETCHING, isFetching}),
    setIsCreated:(isCreated)=>({type:IS_CREATED, isCreated}),
}

export const requestVehicleModelList = (pageNumber=1) => {
    return async(dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(pageNumber));
        let data = await vehicleModelAPI.getVehicleModelList(pageNumber);
        dispatch(actions.setVehicleModelList(data.results));
        dispatch(actions.setTotalItemsCount(data.count));
        dispatch(actions.setIsFetching(false));
    }
}

export const requestVehicleMarkList = () => {
    return async(dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let data = await vehicleMarkAPI.getvehicleMark();
        dispatch(actions.setVehicleMarkList(data.results));
        dispatch(actions.setIsFetching(false));
    }
}

export const createVehicleModel = (formData) => {
    return async(dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let data = await vehicleModelAPI.createVehicleModel(formData);
        dispatch(actions.setIsCreated(true));
        dispatch(actions.setIsFetching(false));
    }
}

export const getVehicleModelItem = (id) => {
    return async(dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let data = await vehicleModelAPI.getVehicleModel(id);
        dispatch(actions.setVehicleModelItem(data));
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
    }
}

export const updateVehicleModelItem = (formData) => {
    return async(dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let data = await vehicleModelAPI.updateVehicleModel(formData);
        dispatch(actions.setIsCreated(true));
        dispatch(actions.setIsFetching(false));
    }
}

export const deleteVehicleModelItem = (id) => {
    return async(dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let data = await vehicleModelAPI.deleteVehicleModel(id);
        dispatch(actions.setIsFetching(false));
    }
}



export default vehicleModelListReducer;