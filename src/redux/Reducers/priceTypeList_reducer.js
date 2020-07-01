import { priceTypeAPI } from "../../api/priceTypeAPI";
import { stopSubmit } from "redux-form";

const SET_PRICE_TYPES = "SET_PRICE_TYPES"
const IS_FETCHING = "IS_FETCHING"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_PAGE_SIZE = "SET_PAGE_SIZE"
const SET_TOTAL_ITEMS_COUNT = "SET_TOTAL_ITEMS_COUNT"
const IS_CREATED = "IS_CREATED"
const SET_PRICE_TYPE_ITEM = "SET_PRICE_TYPE_ITEM"
const SET_FORM_GET_DATA="SET_FORM_GET_DATA"
const ADD_PAGE_TO_FORM_GET_DATA="ADD_PAGE_TO_FORM_GET_DATA"
const SET_SORT_DATA="SET_SORT_DATA"
const ADD_SORT_DATA_TO_FORM_GET_DATA="ADD_SORT_DATA_TO_FORM_GET_DATA"
const SET_PRICE_TYPE_LIST_ALL = "SET_PRICE_TYPE_LIST_ALL"

let initialState = {
    priceTypeList: null,
    priceTypeItem: null,
    priceTypeListAll:null,
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

const priceTypeListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRICE_TYPES:
            {
                return { ...state, priceTypeList: action.priceTypeList }
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
        case SET_PRICE_TYPE_ITEM:
            {
                return { ...state, priceTypeItem: action.priceTypeItem }
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
        case SET_PRICE_TYPE_LIST_ALL:
            {
                return { ...state, priceTypeListAll: action.priceTypeListAll }
            }                     
        default:
            return state;
    }
}


export const actions = {
    setPriceTypeList: (priceTypeList) => ({ type: SET_PRICE_TYPES, priceTypeList }),
    setIsFetching: (isFetching) => ({ type: IS_FETCHING, isFetching }),
    setErrorMessage: (message) => ({ type: SET_ERROR_MESSAGE, message }),
    setCurrentPage: (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage }),
    setPageSize: (pageSize) => ({ type: SET_PAGE_SIZE, pageSize }),
    setTotalItemsCount: (totalItemsCount) => ({ type: SET_TOTAL_ITEMS_COUNT, totalItemsCount }),
    setIsCreated: (isCreated) => ({ type: IS_CREATED, isCreated }),
    setPriceTypeItem: (priceTypeItem) => ({ type: SET_PRICE_TYPE_ITEM, priceTypeItem }),
    setFormGetData: (formGetData) => ({ type: SET_FORM_GET_DATA, formGetData }),
    setAddPageToFormGetData: (pageNumber) => ({ type: ADD_PAGE_TO_FORM_GET_DATA, pageNumber }),
    setSortData: (sortData) => ({ type: SET_SORT_DATA, sortData }),
    setAddSortDataToFormGetData: (sortData) => ({ type: ADD_SORT_DATA_TO_FORM_GET_DATA, sortData }),
    setPriceTypeListAll: (priceTypeListAll) => ({ type: SET_PRICE_TYPE_LIST_ALL, priceTypeListAll }),
}

export const sortPriceTypeList = (sortData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setPriceTypeList(null));
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().priceTypePage.sortData));
        let response = await priceTypeAPI.getPriceTypeListNEW(getState().priceTypePage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setPriceTypeList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterPriceTypeList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setPriceTypeList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await priceTypeAPI.getPriceTypeListNEW(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setPriceTypeList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestPriceTypeList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setPriceTypeList(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        // let response = await priceTypeAPI.getPriceTypeList(pageNumber);        
        let response = await priceTypeAPI.getPriceTypeListNEW(getState().priceTypePage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setPriceTypeList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestPriceTypeListAll = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setPriceTypeListAll(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        // let response = await priceTypeAPI.getPriceTypeList(pageNumber);        
        let response = await priceTypeAPI.getPriceTypeListNEW(1,
                                                                getState().priceTypePage.max_page_size);                                            
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setPriceTypeListAll(response.results));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const createPriceType = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await priceTypeAPI.createPriceType(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('priceTypeCreate', response.data))
        }
    }
}

export const getPriceTypeItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await priceTypeAPI.getPriceType(id);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setPriceTypeItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('priceTypeUpdate', response.data))
        }

    }
}

export const updatePriceTypeItem = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await priceTypeAPI.updatePriceType(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('priceTypeUpdate', response.data))
        }
        
    }
}

export const deletePriceTypeItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        await priceTypeAPI.deletePriceType(id);
        dispatch(actions.setIsFetching(false));
    }
}

export default priceTypeListReducer;
