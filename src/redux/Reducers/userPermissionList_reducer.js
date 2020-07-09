import { userPermissionAPI } from "../../api/userPermissionAPI";
import { userAPI } from "../../api/userAPI";
import { permissionAPI } from "../../api/permissionAPI";
import { stopSubmit } from "redux-form";

const SET_USER_PERMISSIONS = "SET_USER_PERMISSIONS"
const SET_USERS = "SET_USERS"
const SET_PERMISSIONS = "SET_PERMISSIONS"
const SET_USER_PERMISSION_ITEM = "SET_USER_PERMISSION_ITEM"
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
const SET_USER_PERMISSION_LIST_ALL = "SET_USER_PERMISSION_LIST_ALL"

let initialState = {
    userPermissionList: [],
    userList: [],
    permissionList: [],
    userPermissionItem: null,
    currentPage: 1,
    pageSize: 10,
    max_page_size:10000,
    totalItemsCount: 0,
    isFetching: false,
    isCreated: false,
    message: null,
    userPermissionListAll: [],
    sortData:{},
    formGetData:{},
};

const userPermissionListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_PERMISSIONS:
            {
                return { ...state, userPermissionList: action.userPermissionList }
            }
        case SET_USERS:
            {
                return { ...state, userList: action.userList }
            }          
        case SET_PERMISSIONS:
            {
                return { ...state, permissionList: action.permissionList }
            }
        case SET_USER_PERMISSION_ITEM:
            {
                return { ...state, userPermissionItem: action.userPermissionItem }
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
        case SET_USER_PERMISSION_LIST_ALL:
            {
                return { ...state, userPermissionListAll: action.userPermissionListAll }
            }         
        default:
            return state;
    }
}


export const actions = {
    setUserPermissionList: (userPermissionList) => ({ type: SET_USER_PERMISSIONS, userPermissionList }),
    setUserList: (userList) => ({ type: SET_USERS, userList }),
    setPermissionList: (permissionList) => ({ type: SET_PERMISSIONS, permissionList }),
    setUserPermissionItem: (userPermissionItem) => ({ type: SET_USER_PERMISSION_ITEM, userPermissionItem }),
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
    setUserPermissionListAll: (userPermissionListAll) => ({ type: SET_USER_PERMISSION_LIST_ALL, userPermissionListAll }),

}
export const sortUserPermissionList = (sortData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setUserPermissionList(null));
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().userPermissionPage.sortData));
        let response = await userPermissionAPI.getUserPermissionList(getState().userPermissionPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setUserPermissionList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterUserPermissionList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setUserPermissionList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await userPermissionAPI.getUserPermissionList(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setUserPermissionList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestUserPermissionList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setUserPermissionList(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));

        let response = await userPermissionAPI.getUserPermissionList(getState().userPermissionPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setUserPermissionList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestUserPermissionListAll = (pageNumber = 1,forExport=false) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setUserPermissionListAll(null));
        var response;
        if (forExport){
            let formGetData=getState().userPermissionPage.formGetData
            const {page, ...restformGetData}=formGetData
            await dispatch(actions.setAddPageToFormGetData(pageNumber));
            response = await userPermissionAPI.getUserPermissionList(restformGetData, getState().userPermissionPage.max_page_size); 
        }else{
            await dispatch(actions.setAddPageToFormGetData(pageNumber));
            response = await userPermissionAPI.getUserPermissionList(1, getState().userPermissionPage.max_page_size); 
        }                                                     
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {  
            let responseResult=response.results
            responseResult.forEach(function(item){ delete item.main_userPermission })
            dispatch(actions.setUserPermissionListAll(responseResult));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestUserList = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await userAPI.getUserList(1,getState().userPermissionPage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setUserList(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestPermissionList = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await permissionAPI.getPermissionList(1,getState().userPermissionPage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setPermissionList(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const getUserPermissionItem = (id) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await userPermissionAPI.getUserPermission(id);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setUserPermissionItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('userPermissionUpdate', response.data))
        }

    }
}

export const updateUserPermissionItem = (formData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        // "Create" method of backend consist of delete and then create many to many relation data
        let response = await userPermissionAPI.createUserPermission(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('userPermissionUpdate', response.data))
        }
    }
}

export default userPermissionListReducer;