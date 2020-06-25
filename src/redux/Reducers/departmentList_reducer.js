import { departmentAPI } from "../../api/departmentAPI";
import { stopSubmit } from "redux-form";

const SET_DEPARTMENTS = "SET_DEPARTMENTS"
const IS_FETCHING = "IS_FETCHING"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_PAGE_SIZE = "SET_PAGE_SIZE"
const SET_TOTAL_ITEMS_COUNT = "SET_TOTAL_ITEMS_COUNT"
const IS_CREATED = "IS_CREATED"
const SET_DEPARTMENT_ITEM = "SET_DEPARTMENT_ITEM"
const SET_FORM_GET_DATA="SET_FORM_GET_DATA"
const ADD_PAGE_TO_FORM_GET_DATA="ADD_PAGE_TO_FORM_GET_DATA"
const SET_SORT_DATA="SET_SORT_DATA"
const ADD_SORT_DATA_TO_FORM_GET_DATA="ADD_SORT_DATA_TO_FORM_GET_DATA"
const SET_DEPARTMENT_LIST_ALL = "SET_DEPARTMENT_LIST_ALL"

let initialState = {
    departmentList: null,
    departmentItem: null,
    departmentListAll:null,
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

const departmentListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DEPARTMENTS:
            {
                return { ...state, departmentList: action.departmentList }
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
        case SET_DEPARTMENT_ITEM:
            {
                return { ...state, departmentItem: action.departmentItem }
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
        case SET_DEPARTMENT_LIST_ALL:
            {
                return { ...state, departmentListAll: action.departmentListAll }
            }                     
        default:
            return state;
    }
}


export const actions = {
    setDepartmentList: (departmentList) => ({ type: SET_DEPARTMENTS, departmentList }),
    setIsFetching: (isFetching) => ({ type: IS_FETCHING, isFetching }),
    setErrorMessage: (message) => ({ type: SET_ERROR_MESSAGE, message }),
    setCurrentPage: (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage }),
    setPageSize: (pageSize) => ({ type: SET_PAGE_SIZE, pageSize }),
    setTotalItemsCount: (totalItemsCount) => ({ type: SET_TOTAL_ITEMS_COUNT, totalItemsCount }),
    setIsCreated: (isCreated) => ({ type: IS_CREATED, isCreated }),
    setDepartmentItem: (departmentItem) => ({ type: SET_DEPARTMENT_ITEM, departmentItem }),
    setFormGetData: (formGetData) => ({ type: SET_FORM_GET_DATA, formGetData }),
    setAddPageToFormGetData: (pageNumber) => ({ type: ADD_PAGE_TO_FORM_GET_DATA, pageNumber }),
    setSortData: (sortData) => ({ type: SET_SORT_DATA, sortData }),
    setAddSortDataToFormGetData: (sortData) => ({ type: ADD_SORT_DATA_TO_FORM_GET_DATA, sortData }),
    setDepartmentListAll: (departmentListAll) => ({ type: SET_DEPARTMENT_LIST_ALL, departmentListAll }),
}

export const sortDepartmentList = (sortData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setDepartmentList(null));
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().departmentPage.sortData));
        let response = await departmentAPI.getDepartmentList(getState().departmentPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDepartmentList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterDepartmentList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setDepartmentList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await departmentAPI.getDepartmentList(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDepartmentList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestDepartmentList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setDepartmentList(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));       
        let response = await departmentAPI.getDepartmentList(getState().departmentPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setDepartmentList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestDepartmentListAll = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setDepartmentListAll(null));
        let formGetData=getState().departmentPage.formGetData
        const {page, ...restformGetData}=formGetData
        await dispatch(actions.setAddPageToFormGetData(pageNumber));      
        let response = await departmentAPI.getDepartmentList(restformGetData,getState().departmentPage.max_page_size);                                            
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setDepartmentListAll(response.results));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const createDepartment = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await departmentAPI.createDepartment(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('departmentCreate', response.data))
        }
    }
}

export const getDepartmentItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await departmentAPI.getDepartment(id);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setDepartmentItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('departmentUpdate', response.data))
        }

    }
}

export const updateDepartmentItem = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await departmentAPI.updateDepartment(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('departmentUpdate', response.data))
        }
        
    }
}

export const deleteDepartmentItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        await departmentAPI.deleteDepartment(id);
        dispatch(actions.setIsFetching(false));
    }
}

export default departmentListReducer;
