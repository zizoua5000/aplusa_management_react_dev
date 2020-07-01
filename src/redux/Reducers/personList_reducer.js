import { personAPI } from "../../api/personAPI";
import { departmentAPI } from "../../api/departmentAPI";
import { companyAPI } from "../../api/companyAPI";
import { jobTitleAPI } from "../../api/jobTitleAPI";
import { userAPI } from "../../api/userAPI";
import { stopSubmit } from "redux-form";

//NATAMAMMMMMMMMMMMMMMMMM


const SET_PERSONS = "SET_PERSONS"
const SET_PERSON_MODEL_ALL = "SET_PERSON_MODEL_ALL"
const SET_PERSON_MARK_ALL = "SET_PERSON_MARK_ALL"
const SET_PERSON_TYPE_ALL = "SET_PERSON_TYPE_ALL"
const SET_PERSON_ITEM = "SET_PERSON_ITEM"
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
const SET_PERSON_LIST_ALL = "SET_PERSON_LIST_ALL"

let initialState = {
    personList: [],
    personModelListAll: [],
    personMarkListAll: [],
    personTypeListAll: [],
    personModelItem: null,
    currentPage: 1,
    pageSize: 10,
    max_page_size:10000,
    totalItemsCount: 0,
    isFetching: false,
    isCreated: false,
    message: null,
    personListAll: [],
    sortData:{},
    formGetData:{},
};

const personListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PERSONS:
            {
                return { ...state, personList: action.personList }
            }
        case SET_PERSON_MODEL_ALL:
            {
                return { ...state, personModelListAll: action.personModelListAll }
            }
        case SET_PERSON_MARK_ALL:
            {
                return { ...state, personMarkListAll: action.personMarkListAll }
            }            
        case SET_PERSON_TYPE_ALL:
            {
                return { ...state, personTypeListAll: action.personTypeListAll }
            }
        case SET_PERSON_ITEM:
            {
                return { ...state, personItem: action.personItem }
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
        case SET_PERSON_LIST_ALL:
            {
                return { ...state, personListAll: action.personListAll }
            }           
        default:
            return state;
    }
}


export const actions = {
    setPersonList: (personList) => ({ type: SET_PERSONS, personList }),
    setPersonModelListAll: (personModelListAll) => ({ type: SET_PERSON_MODEL_ALL, personModelListAll }),
    setPersonMarkListAll: (personMarkListAll) => ({ type: SET_PERSON_MARK_ALL, personMarkListAll }),
    setPersonTypeListAll: (personTypeListAll) => ({ type: SET_PERSON_TYPE_ALL, personTypeListAll }),
    setPersonItem: (personItem) => ({ type: SET_PERSON_ITEM, personItem }),
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
    setPersonListAll: (personListAll) => ({ type: SET_PERSON_LIST_ALL, personListAll }),
}
export const sortPersonList = (sortData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setPersonList(null));
        await dispatch(actions.setSortData(sortData));
        await dispatch(actions.setAddSortDataToFormGetData(getState().personPage.sortData));
        let response = await personAPI.getPersonListNEW(getState().personPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setPersonList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const filterPersonList = (formGetData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(1));
        dispatch(actions.setPersonList(null));
        dispatch(actions.setSortData(null));
        dispatch(actions.setFormGetData(formGetData));
        let response = await personAPI.getPersonListNEW(formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setPersonList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestPersonList = (pageNumber = 1) => {
    return async (dispatch, getState) => {
        dispatch(actions.setErrorMessage(null));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setPersonList(null));
        await dispatch(actions.setAddPageToFormGetData(pageNumber));
        // let response = await personAPI.getPersonList(pageNumber);
        let response = await personAPI.getPersonListNEW(getState().personPage.formGetData);
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setPersonList(response.results));
            dispatch(actions.setTotalItemsCount(response.count));
        } else {
            dispatch(actions.setErrorMessage(response))
        }

    }
}

export const requestPersonListAll = (isExport=false) => {
    let response;
    console.log(isExport)
    return async (dispatch, getState) => {
        console.log("Something for log")        
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setErrorMessage(null))
        // dispatch(actions.setCurrentPage(pageNumber));
        dispatch(actions.setIsCreated(false));
        dispatch(actions.setPersonListAll(null));
        // await dispatch(actions.setAddPageToFormGetData(pageNumber));
        if(isExport){
        let formGetData=getState().personPage.formGetData
        const {page, ...restformGetData}=formGetData
        console.log(formGetData)
        console.log(restformGetData)
            response = await personAPI.getPersonListNEW(restformGetData, getState().personPage.max_page_size)
        } 
        else {
            response = await personAPI.getPersonListNEW(1, getState().personPage.max_page_size)    
        }
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {     
            dispatch(actions.setPersonListAll(response.results));
        } else {
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestPersonModelListAll = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await personModelAPI.getPersonModelListNEW(1,getState().personPage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setPersonModelListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}


export const requestPersonTypeListAll = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await personTypeAPI.getPersonTypeListNEW(1,getState().personPage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setPersonTypeListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const requestPersonMarkListAll = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await personMarkAPI.getPersonMarkListNEW(1,getState().personPage.max_page_size)
        dispatch(actions.setIsFetching(false));
        if (response !== 'error') {
            dispatch(actions.setPersonMarkListAll(response.results));
        } else{
            dispatch(actions.setErrorMessage(response))
        }
    }
}

export const createPerson = (formData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await personAPI.createPerson(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 201) {
            dispatch(actions.setErrorMessage(null))
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('personCreate', response.data))
        }
    }
}

export const getPersonItem = (id) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await personAPI.getPerson(id);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setIsCreated(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setPersonItem(response.data));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('personUpdate', response.data))
        }

    }
}

export const updatePersonItem = (formData) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        let response = await personAPI.updatePerson(formData);
        dispatch(actions.setIsFetching(false));
        if (response === 'error') {
            dispatch(actions.setErrorMessage(response));
        } else if (response.status === 200) {
            dispatch(actions.setErrorMessage(null));
            dispatch(actions.setIsCreated(true));
        } else {
            dispatch(actions.setErrorMessage(null))
            dispatch(stopSubmit('personUpdate', response.data))
        }
    }
}

export const deletePersonItem = (id) => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        await personAPI.deletePerson(id);
        dispatch(actions.setIsFetching(false));
    }
}

export default personListReducer;