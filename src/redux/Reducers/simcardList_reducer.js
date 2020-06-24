import { simcardAPI } from "../../api/simcardAPI";
import { stopSubmit } from "redux-form";

const SET_SIMCARD_LIST = "SET_SIMCARD_LIST"
const IS_FETCHING = "IS_FETCHING"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_PAGE_SIZE = "SET_PAGE_SIZE"
const SET_TOTAL_ITEMS_COUNT = "SET_TOTAL_ITEMS_COUNT"
const IS_CREATED = "IS_CREATED"
const SET_SIMCARD_ITEM = "SET_VEHICLE_TYPE_ITEM"
const SET_FORM_GET_DATA="SET_FORM_GET_DATA"
const ADD_PAGE_TO_FORM_GET_DATA="ADD_PAGE_TO_FORM_GET_DATA"
const SET_SORT_DATA="SET_SORT_DATA"
const ADD_SORT_DATA_TO_FORM_GET_DATA="ADD_SORT_DATA_TO_FORM_GET_DATA"
const SET_SIMCARD_LIST_ALL = "SET_SIMCARD_LIST_ALL"



let initialState = {
    simcardList: null,
    simcardItem: null,
    simcardListAll:[],
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
        case SET_SIMCARD_LIST_ALL:
            {
                return { ...state, simcardListAll: action.simcardListAll }
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
    setFormGetData: (formGetData) => ({ type: SET_FORM_GET_DATA, formGetData }),
    setAddPageToFormGetData: (pageNumber) => ({ type: ADD_PAGE_TO_FORM_GET_DATA, pageNumber }),
    setSortData: (sortData) => ({ type: SET_SORT_DATA, sortData }),
    setAddSortDataToFormGetData: (sortData) => ({ type: ADD_SORT_DATA_TO_FORM_GET_DATA, sortData }),
    setSimcardListAll: (simcardListAll) => ({ type: SET_SIMCARD_LIST_ALL, simcardListAll }),
}

export const sortSimcardList = (sortData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setSimcardList(null));
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().simcardPage.sortData));
        let response = await simcardAPI.getSimcardListNEW(getState().simcardPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setSimcardList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterSimcardList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setSimcardList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await simcardAPI.getSimcardListNEW(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setSimcardList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}


export const requestSimcardList = (pageNumber = 1) => {
    return async (dispatch,getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setSimcardList(null));
        console.log(getState().simcardPage.formGetData)
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        // let response = await simcardAPI.getSimcardList(pageNumber);
        let response = await simcardAPI.getSimcardListNEW(getState().simcardPage.formGetData);
        console.log("API RESPONSE ",response)
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

export const requestSimcardListAll = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setSimcardListAll(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        let response = await simcardAPI.getSimcardListNEW(1, getState().simcardPage.max_page_size);                                    
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setSimcardListAll(response.results));
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
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('simcardCreate', response.data))
        }
    }
}

export const getSimcardItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await simcardAPI.getSimcard(id);
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
        dispatch(actions.setIsFetching(true));
        let response = await simcardAPI.updateSimcard(formData);
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
