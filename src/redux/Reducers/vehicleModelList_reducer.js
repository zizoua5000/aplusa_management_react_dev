import { vehicleModelAPI} from "../../api/vehicleModelAPI";
import { vehicleMarkAPI} from "../../api/vehicleMarkAPI";
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
const SET_FORM_GET_DATA="SET_FORM_GET_DATA"
const ADD_PAGE_TO_FORM_GET_DATA="ADD_PAGE_TO_FORM_GET_DATA"
const SET_SORT_DATA="SET_SORT_DATA"
const ADD_SORT_DATA_TO_FORM_GET_DATA="ADD_SORT_DATA_TO_FORM_GET_DATA"
const SET_VEHICLE_MODEL_LIST_ALL = "SET_VEHICLE_MODEL_LIST_ALL"


let initialState = {
    vehicleModelList: null,
    vehicleMarkList: null,
    vehicleModelItem: null,
    currentPage: 1,
    pageSize: 10,
    max_page_size:10000,
    totalItemsCount: 0,
    isFetching: false,
    isCreated: false,
    message: null,
    formGetData:{},
    sortData:{},
    vehicleModelListAll: null,
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
        case SET_VEHICLE_MODEL_LIST_ALL:
            {
                return { ...state, vehicleModelListAll: action.vehicleModelListAll }
            }             
        default:
            return state;
    }
}


export const actions = {
    setVehicleModelList: (vehicleModelList) => ({ type: SET_VEHICLE_MODELS, vehicleModelList }),
    setVehicleMarkList: (vehicleMarkList) => ({ type: SET_VEHICLE_MARKS, vehicleMarkList }),
    setVehicleModelItem: (vehicleModelItem) => ({ type: SET_VEHICLE_MODEL_ITEM, vehicleModelItem }),
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
    setVehicleModelListAll: (vehicleModelListAll) => ({ type: SET_VEHICLE_MODEL_LIST_ALL, vehicleModelListAll }),

}

export const sortVehicleModelList = (sortData) => {
    return async (dispatch, getState) => {
        console.log(sortData)
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(getState().vehicleModelPage.formGetData.page));
        dispatch(actions.setVehicleModelList(null));
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().vehicleModelPage.sortData));
        let response = await vehicleModelAPI.getVehicleModelListNEW(getState().vehicleModelPage.formGetData);
        console.log(response)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setVehicleModelList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterVehicleModelList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setVehicleModelList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await vehicleModelAPI.getVehicleModelListNEW(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setVehicleModelList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestVehicleModelList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setVehicleModelList(null));
        dispatch(actions.setCurrentPage(pageNumber));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        // let response = await vehicleModelAPI.getVehicleModelList(pageNumber);
        let response = await vehicleModelAPI.getVehicleModelListNEW(getState().vehicleModelPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setVehicleModelList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}
export const requestVehicleModelListAll = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setVehicleModelListAll(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        console.log(getState().vehicleModelPage.formGetData)
        let response = await vehicleModelAPI.getVehicleModelListNEW(getState().vehicleModelPage.formGetData,
                                                                getState().vehicleModelPage.max_page_size);
        console.log(response)                                                        
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setVehicleModelListAll(response.results));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestVehicleMarkList = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        console.log(getState().vehicleMarkPage.formGetData)
        let response = await vehicleMarkAPI.getVehicleMarkListNEW(1,getState().vehicleModelPage.max_page_size);

        // let response = await vehicleMarkAPI.getVehicleMarkList()
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