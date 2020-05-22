import { vehicleMarkAPI } from "../../api/vehicleMarkAPI";
import { stopSubmit } from "redux-form";

const SET_VEHICLE_MARK_LIST = "SET_VEHICLE_MARK_LIST"
const SET_VEHICLE_MARK_ITEM = "SET_VEHICLE_MARK_ITEM"
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
const SET_VEHICLE_MARK_LIST_ALL = "SET_VEHICLE_MARK_LIST_ALL"

let initialState = {
    vehicleMarkList: null,
    vehicleMarkItem: null,
    vehicleMarkListAll:null,
    currentPage: 1,
    pageSize: 10,
    max_page_size:10000,
    totalItemsCount: 0,
    isFetching: false,
    isCreated: false,
    message: null,
    formGetData:{},
    sortData:{}
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
        case SET_VEHICLE_MARK_LIST_ALL:
            {
                return { ...state, vehicleMarkListAll: action.vehicleMarkListAll }
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
    setFormGetData: (formGetData) => ({ type: SET_FORM_GET_DATA, formGetData }),
    setAddPageToFormGetData: (pageNumber) => ({ type: ADD_PAGE_TO_FORM_GET_DATA, pageNumber }),
    setSortData: (sortData) => ({ type: SET_SORT_DATA, sortData }),
    setAddSortDataToFormGetData: (sortData) => ({ type: ADD_SORT_DATA_TO_FORM_GET_DATA, sortData }),
    setVehicleMarkListAll: (vehicleMarkListAll) => ({ type: SET_VEHICLE_MARK_LIST_ALL, vehicleMarkListAll }),
}

export const sortVehicleMarkList = (sortData) => {
    return async (dispatch, getState) => {
        console.log(sortData)
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setVehicleMarkList(null));
        console.log(sortData)
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().vehicleMarkPage.sortData));
        let response = await vehicleMarkAPI.getVehicleMarkListNEW(getState().vehicleMarkPage.formGetData);
        console.log(response)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setVehicleMarkList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterVehicleMarkList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setVehicleMarkList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await vehicleMarkAPI.getVehicleMarkListNEW(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setVehicleMarkList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestVehicleMarkList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        // let response = await vehicleMarkAPI.getVehicleMarkList(pageNumber);
        let response = await vehicleMarkAPI.getVehicleMarkListNEW(getState().vehicleMarkPage.formGetData);
        console.log(response)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setVehicleMarkList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestVehicleMarkListAll = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setVehicleMarkListAll(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        // let response = await vehicleTypeAPI.getVehicleTypeList(pageNumber);        
        let response = await vehicleMarkAPI.getVehicleMarkListNEW(getState().vehicleMarkPage.formGetData,
                                                                getState().vehicleMarkPage.max_page_size);
        console.log(response)                                                        
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setVehicleMarkListAll(response.results));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const createVehicleMark = (formData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await vehicleMarkAPI.createVehicleMark(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('vehicleMarkCreate', response.data))
        }
    }
}



export const getVehicleMarkItem = (id) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await vehicleMarkAPI.getVehicleMark(id);
        console.log(response)
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setVehicleMarkItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('vehicleMarkUpdate', response.data))
        }
    }
}

export const updateVehicleMarkItem = (formData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await vehicleMarkAPI.updateVehicleMark(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('vehicleMarkUpdate', response.data))
        }
    }
}

export const deleteVehicleMarkItem = (id) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let data = await vehicleMarkAPI.deleteVehicleMark(id);
        console.log(data)
        dispatch(actions.setIsFetching(false));
    }
}

export default vehicleMarkListReducer;