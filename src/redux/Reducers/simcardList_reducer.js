import { simcardAPI } from "../../api/api";
import { stopSubmit } from "redux-form";

const SET_SIMCARD_LIST = "SET_SIMCARD_LIST"
const IS_FETCHING = "IS_FETCHING"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_PAGE_SIZE = "SET_PAGE_SIZE"
const SET_TOTAL_ITEMS_COUNT = "SET_TOTAL_ITEMS_COUNT"
const IS_CREATED = "IS_CREATED"
const SET_SIMCARD_ITEM = "SET_VEHICLE_TYPE_ITEM"



let initialState = {
    simcardList: null,
    simcardItem: null,
    isFetching: false,
    message: null,
    currentPage: 1,
    pageSize: 10,
    totalItemsCount: 0,
    isCreated: false,
};

const simcardListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SIMCARD_LIST:
            {
                return { ...state, simcardList: action.simcardList }
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
        case SET_SIMCARD_ITEM:
            {
                return { ...state, simcardItem: action.simcardItem }
            }
        default:
            return state;
    }
}


export const actions = {
    setSimcardList: (simcardList) => ({ type: SET_SIMCARD_LIST, simcardList }),
    setIsFetching: (isFetching) => ({ type: IS_FETCHING, isFetching }),
    setErrorMessage: (message) => ({ type: SET_ERROR_MESSAGE, message }),
    setCurrentPage: (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage }),
    setPageSize: (pageSize) => ({ type: SET_PAGE_SIZE, pageSize }),
    setTotalItemsCount: (totalItemsCount) => ({ type: SET_TOTAL_ITEMS_COUNT, totalItemsCount }),
    setIsCreated: (isCreated) => ({ type: IS_CREATED, isCreated }),
    setSimcardItem: (simcardItem) => ({ type: SET_SIMCARD_ITEM, simcardItem }),
}


export const requestSimcardList = (pageNumber = 1) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setCurrentPage(pageNumber));
        let response = await simcardAPI.getSimcardList(pageNumber);
        console.log("-------------------SimcardList RESPOSE-----------");
        console.log(response);
        console.log("-------------------SimcardList RESPOSE-----------");
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setSimcardList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const createSimcard = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await simcardAPI.createSimcard(formData);
        dispatch(actions.setIsFetching(false));
        console.log(response)
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            console.log('----STOP SUBMIT-----')
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('simcardCreate', response.data))
        }
    }
}

export const getSimcardItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await simcardAPI.getSimcard(id);
        console.log(response)
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setSimcardItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('simcardUpdate', response.data))
        }

    }
}

export const updateSimcardItem = (formData) => {
    return async (dispatch) => {
        console.log(formData)
        dispatch(actions.setIsFetching(true));
        let response = await simcardAPI.updateSimcard(formData);
        console.log(response)
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('simcardUpdate', response.data))
        }
        
    }
}

export const deleteSimcardItem = (id) => {
    return async(dispatch, getState) => {
        await simcardAPI.deleteSimcard(id);
    }
}


export default simcardListReducer;
