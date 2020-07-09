import { permissionAPI } from "../../api/permissionAPI";
import { contentTypeAPI } from "../../api/contentTypeAPI";
import { stopSubmit } from "redux-form";

const SET_PERMISSIONS = "SET_PERMISSIONS"
const SET_CONTENT_TYPES = "SET_CONTENT_TYPES"
const SET_PERMISSION_ITEM = "SET_PERMISSION_ITEM"
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
const SET_PERMISSION_LIST_ALL = "SET_PERMISSION_LIST_ALL"

let initialState = {
    permissionList: [],
    contentTypeList: [],
    permissionItem: null,
    currentPage: 1,
    pageSize: 10,
    max_page_size:10000,
    totalItemsCount: 0,
    isFetching: false,
    isCreated: false,
    message: null,
    permissionListAll: [],
    sortData:{},
    formGetData:{},
};

const permissionListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PERMISSIONS:
            {
                return { ...state, permissionList: action.permissionList }
            }          
        case SET_CONTENT_TYPES:
            {
                return { ...state, contentTypeList: action.contentTypeList }
            }
        case SET_PERMISSION_ITEM:
            {
                return { ...state, permissionItem: action.permissionItem }
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
        case SET_PERMISSION_LIST_ALL:
            {
                return { ...state, permissionListAll: action.permissionListAll }
            }         
        default:
            return state;
    }
}


export const actions = {
    setPermissionList: (permissionList) => ({ type: SET_PERMISSIONS, permissionList }),
    setContentTypeList: (contentTypeList) => ({ type: SET_CONTENT_TYPES, contentTypeList }),
    setPermissionItem: (permissionItem) => ({ type: SET_PERMISSION_ITEM, permissionItem }),
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
    setPermissionListAll: (permissionListAll) => ({ type: SET_PERMISSION_LIST_ALL, permissionListAll }),

}
export const sortPermissionList = (sortData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setPermissionList(null));
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().permissionPage.sortData));
        let response = await permissionAPI.getPermissionList(getState().permissionPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setPermissionList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterPermissionList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setPermissionList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await permissionAPI.getPermissionList(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setPermissionList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestPermissionList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setPermissionList(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));

        let response = await permissionAPI.getPermissionList(getState().permissionPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setPermissionList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestPermissionListAll = (pageNumber = 1,forExport=false) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setPermissionListAll(null));
        var response;
        if (forExport){
            let formGetData=getState().permissionPage.formGetData
            const {page, ...restformGetData}=formGetData
            await dispatch(actions.setAddPageToFormGetData(pageNumber));
            response = await permissionAPI.getPermissionList(restformGetData, getState().permissionPage.max_page_size); 
        }else{
            await dispatch(actions.setAddPageToFormGetData(pageNumber));
            response = await permissionAPI.getPermissionList(1, getState().permissionPage.max_page_size); 
        }                                                     
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {  
            let responseResult=response.results
            responseResult.forEach(function(item){ delete item.main_permission })
            dispatch(actions.setPermissionListAll(responseResult));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestContentTypeList = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await contentTypeAPI.getContentTypeList(1,getState().permissionPage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setContentTypeList(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const createPermission = (formData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await permissionAPI.createPermission(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('permissionCreate', response.data))
        }
    }
}

export const getPermissionItem = (id) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await permissionAPI.getPermission(id);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setPermissionItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('permissionUpdate', response.data))
        }

    }
}

export const updatePermissionItem = (formData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await permissionAPI.updatePermission(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('permissionUpdate', response.data))
        }
    }
}

export const deletePermissionItem = (id) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        await permissionAPI.deletePermission(id);
        dispatch(actions.setIsFetching(false));
    }
}

export default permissionListReducer;