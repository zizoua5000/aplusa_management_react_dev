import { vehicleAPI } from "../../api/vehicleAPI";
import { vehicleModelAPI } from "../../api/vehicleModelAPI";
import { vehicleTypeAPI } from "../../api/vehicleTypeAPI";
import { vehicleMarkAPI } from "../../api/vehicleMarkAPI";
import { stopSubmit } from "redux-form";

const SET_VEHICLES = "SET_VEHICLES"
const SET_VEHICLE_MODEL_ALL = "SET_VEHICLE_MODEL_ALL"
const SET_VEHICLE_MARK_ALL = "SET_VEHICLE_MARK_ALL"
const SET_VEHICLE_TYPE_ALL = "SET_VEHICLE_TYPE_ALL"
const SET_VEHICLE_ITEM = "SET_VEHICLE_ITEM"
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
const SET_VEHICLE_LIST_ALL = "SET_VEHICLE_LIST_ALL"

let initialState = {
    vehicleList: [],
    vehicleModelListAll: [],
    vehicleMarkListAll: [],
    vehicleTypeListAll: [],
    vehicleModelItem: null,
    currentPage: 1,
    pageSize: 10,
    max_page_size:10000,
    totalItemsCount: 0,
    isFetching: false,
    isCreated: false,
    message: null,
    vehicleListAll: [],
    sortData:{},
    formGetData:{},
};

const vehicleListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VEHICLES:
            {
                return { ...state, vehicleList: action.vehicleList }
            }
        case SET_VEHICLE_MODEL_ALL:
            {
                return { ...state, vehicleModelListAll: action.vehicleModelListAll }
            }
        case SET_VEHICLE_MARK_ALL:
            {
                return { ...state, vehicleMarkListAll: action.vehicleMarkListAll }
            }            
        case SET_VEHICLE_TYPE_ALL:
            {
                return { ...state, vehicleTypeListAll: action.vehicleTypeListAll }
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
        case SET_VEHICLE_LIST_ALL:
            {
                return { ...state, vehicleListAll: action.vehicleListAll }
            }           
        default:
            return state;
    }
}


export const actions = {
    setVehicleList: (vehicleList) => ({ type: SET_VEHICLES, vehicleList }),
    setVehicleModelListAll: (vehicleModelListAll) => ({ type: SET_VEHICLE_MODEL_ALL, vehicleModelListAll }),
    setVehicleMarkListAll: (vehicleMarkListAll) => ({ type: SET_VEHICLE_MARK_ALL, vehicleMarkListAll }),
    setVehicleTypeListAll: (vehicleTypeListAll) => ({ type: SET_VEHICLE_TYPE_ALL, vehicleTypeListAll }),
    setVehicleItem: (vehicleItem) => ({ type: SET_VEHICLE_ITEM, vehicleItem }),
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
    setVehicleListAll: (vehicleListAll) => ({ type: SET_VEHICLE_LIST_ALL, vehicleListAll }),
}
export const sortVehicleList = (sortData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setVehicleList(null));
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().vehiclePage.sortData));
        let response = await vehicleAPI.getVehicleList(getState().vehiclePage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setVehicleList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterVehicleList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setVehicleList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await vehicleAPI.getVehicleList(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setVehicleList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestVehicleList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setVehicleList(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        // let response = await vehicleAPI.getVehicleList(pageNumber);
        let response = await vehicleAPI.getVehicleList(getState().vehiclePage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setVehicleList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestVehicleListAll = (isExport=false) => {
    let response;
    console.log(isExport)
    return async (dispatch, getState) => {
        console.log("Something for log")        
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        // dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setVehicleListAll(null));
        // await dispatch(actions.setAddPageToFormGetData(pageNumber));
        if(isExport){
        let formGetData=getState().vehiclePage.formGetData
        const {page, ...restformGetData}=formGetData
        console.log(formGetData)
        console.log(restformGetData)
            response = await vehicleAPI.getVehicleList(restformGetData, getState().vehiclePage.max_page_size)
        } 
        else {
            response = await vehicleAPI.getVehicleList(1, getState().vehiclePage.max_page_size)    
        }
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setVehicleListAll(response.results));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestVehicleModelListAll = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await vehicleModelAPI.getVehicleModelListNEW(1,getState().vehiclePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setVehicleModelListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}


export const requestVehicleTypeListAll = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await vehicleTypeAPI.getVehicleTypeListNEW(1,getState().vehiclePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setVehicleTypeListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestVehicleMarkListAll = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await vehicleMarkAPI.getVehicleMarkListNEW(1,getState().vehiclePage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setVehicleMarkListAll(response.results));
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