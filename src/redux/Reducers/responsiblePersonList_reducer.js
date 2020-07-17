import { responsiblePersonAPI } from "../../api/responsiblePersonAPI";
import { personAPI } from "../../api/personAPI";
import { departmentAPI } from "../../api/departmentAPI";
import { stopSubmit } from "redux-form";

const SET_RESPONSIBLE_PERSONS = "SET_RESPONSIBLE_PERSONS"
const IS_FETCHING = "IS_FETCHING"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_PAGE_SIZE = "SET_PAGE_SIZE"
const SET_TOTAL_ITEMS_COUNT = "SET_TOTAL_ITEMS_COUNT"
const IS_CREATED = "IS_CREATED"
const SET_RESPONSIBLE_PERSON_ITEM = "SET_RESPONSIBLE_PERSON_ITEM"
const SET_FORM_GET_DATA="SET_FORM_GET_DATA"
const ADD_PAGE_TO_FORM_GET_DATA="ADD_PAGE_TO_FORM_GET_DATA"
const SET_SORT_DATA="SET_SORT_DATA"
const ADD_SORT_DATA_TO_FORM_GET_DATA="ADD_SORT_DATA_TO_FORM_GET_DATA"
const SET_RESPONSIBLE_PERSON_LIST_ALL = "SET_RESPONSIBLE_PERSON_LIST_ALL"
const SET_PERSON_ALL = "SET_PERSON_ALL"
const SET_DEPARTMENT_ALL = "SET_DEPARTMENT_ALL"


let initialState = {
    responsiblePersonList: [],
    responsiblePersonItem: [],
    responsiblePersonListAll: [],
    personListAll:[],
    departmentListAll:[],
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

const responsiblePersonListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RESPONSIBLE_PERSONS:
            {
                return { ...state, responsiblePersonList: action.responsiblePersonList }
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
        case SET_RESPONSIBLE_PERSON_ITEM:
            {
                return { ...state, responsiblePersonItem: action.responsiblePersonItem }
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
        case SET_RESPONSIBLE_PERSON_LIST_ALL:
            {
                return { ...state, responsiblePersonListAll: action.responsiblePersonListAll }
            }    
        case SET_PERSON_ALL:
            {
                return { ...state, personListAll: action.personListAll }
            }
        case SET_DEPARTMENT_ALL:
            {
                return { ...state, departmentListAll: action.departmentListAll }
            }                                         
        default:
            return state;
    }
}


export const actions = {
    setResponsiblePersonList: (responsiblePersonList) => ({ type: SET_RESPONSIBLE_PERSONS, responsiblePersonList }),
    setIsFetching: (isFetching) => ({ type: IS_FETCHING, isFetching }),
    setErrorMessage: (message) => ({ type: SET_ERROR_MESSAGE, message }),
    setCurrentPage: (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage }),
    setPageSize: (pageSize) => ({ type: SET_PAGE_SIZE, pageSize }),
    setTotalItemsCount: (totalItemsCount) => ({ type: SET_TOTAL_ITEMS_COUNT, totalItemsCount }),
    setIsCreated: (isCreated) => ({ type: IS_CREATED, isCreated }),
    setResponsiblePersonItem: (responsiblePersonItem) => ({ type: SET_RESPONSIBLE_PERSON_ITEM, responsiblePersonItem }),
    setFormGetData: (formGetData) => ({ type: SET_FORM_GET_DATA, formGetData }),
    setAddPageToFormGetData: (pageNumber) => ({ type: ADD_PAGE_TO_FORM_GET_DATA, pageNumber }),
    setSortData: (sortData) => ({ type: SET_SORT_DATA, sortData }),
    setAddSortDataToFormGetData: (sortData) => ({ type: ADD_SORT_DATA_TO_FORM_GET_DATA, sortData }),
    setResponsiblePersonListAll: (responsiblePersonListAll) => ({ type: SET_RESPONSIBLE_PERSON_LIST_ALL, responsiblePersonListAll }),
    setPersonListAll:(personListAll)=>({type: SET_PERSON_ALL, personListAll}),
    setDepartmentListAll:(departmentListAll)=>({type: SET_DEPARTMENT_ALL, departmentListAll}),
}

export const sortResponsiblePersonList = (sortData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setResponsiblePersonList(null));
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().responsiblePersonPage.sortData));
        let response = await responsiblePersonAPI.getResponsiblePersonList(getState().responsiblePersonPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setResponsiblePersonList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterResponsiblePersonList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setResponsiblePersonList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await responsiblePersonAPI.getResponsiblePersonList(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setResponsiblePersonList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestResponsiblePersonList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setResponsiblePersonList(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        let response = await responsiblePersonAPI.getResponsiblePersonList(getState().responsiblePersonPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setResponsiblePersonList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestResponsiblePersonListAll = (isExport=false) => {
    let response;
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        // dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setResponsiblePersonListAll(null)); 
        if(isExport){
            let formGetData=getState().responsiblePersonPage.formGetData
            const {page, ...restformGetData}=formGetData
            console.log(formGetData)
            console.log(restformGetData)
                response = await responsiblePersonAPI.getResponsiblePersonList(restformGetData, getState().responsiblePersonPage.max_page_size)
            } 
            else {
                response = await responsiblePersonAPI.getResponsiblePersonList(1, getState().responsiblePersonPage.max_page_size)    
            }                                                      
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setResponsiblePersonListAll(response.results));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}
export const requestDepartmentListAll = () => {
    console.log("requestDepartmentLISTALL")
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await departmentAPI.getDepartmentList(1,getState().responsiblePersonPage.max_page_size)
        console.log(response)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setDepartmentListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}
export const requestPersonListAll = () => {
    console.log("requestPersonLISTALL")
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await personAPI.getPersonList(1,getState().devicePage.max_page_size)
        console.log(response)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setPersonListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}
export const createResponsiblePerson = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await responsiblePersonAPI.createResponsiblePerson(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('responsiblePersonCreate', response.data))
        }
    }
}

export const getResponsiblePersonItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await responsiblePersonAPI.getResponsiblePerson(id);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setResponsiblePersonItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('responsiblePersonUpdate', response.data))
        }

    }
}

export const updateResponsiblePersonItem = (formData) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        let response = await responsiblePersonAPI.updateResponsiblePerson(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('responsiblePersonUpdate', response.data))
        }
        
    }
}

export const deleteResponsiblePersonItem = (id) => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        await responsiblePersonAPI.deleteResponsiblePerson(id);
        dispatch(actions.setIsFetching(false));
    }
}

export default responsiblePersonListReducer;
