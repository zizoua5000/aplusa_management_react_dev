import { vehicleModelAPI } from "../../api/api";
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

const SET_VEHICLE_MODELS = "SET_VEHICLE_MODELS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_PAGE_SIZE = "SET_PAGE_SIZE"
const SET_TOTAL_ITEMS_COUNT = "SET_TOTAL_ITEMS_COUNT"
const IS_FETCHING = "IS_FETCHING"

let initialState = {
    vehicleModelList: null,
    currentPage: 1,
    pageSize: 10,
    totalItemsCount: 0,
    isFetching: true
};

const vehicleModelListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VEHICLE_MODELS:
            {
                return {...state, vehicleModelList: action.vehicleModelList }
            }
        case SET_CURRENT_PAGE:
            {
                return {...state, currentPage: action.currentPage}
            }
        case SET_PAGE_SIZE:
            {
                return {...state, pageSize: action.pageSize}
            }
        case SET_TOTAL_ITEMS_COUNT:
            {
                return {...state, totalItemsCount: action.totalItemsCount}
            }
        case IS_FETCHING:
            {
                return { ...state, isFetching:action.isFetching}
            }
        default:
            return state;
    }
}


export const actions = {
    setVehicleModelList: (vehicleModelList) => ({ type: SET_VEHICLE_MODELS, vehicleModelList }),
    setCurrentPage: (currentPage) => ({type: SET_CURRENT_PAGE, currentPage}),
    setPageSize: (pageSize) => ({type: SET_PAGE_SIZE, pageSize}),
    setTotalItemsCount: (totalItemsCount) => ({type: SET_TOTAL_ITEMS_COUNT, totalItemsCount}),
    setIsFetching:(isFetching)=>({type:IS_FETCHING, isFetching})
}

export const requestVehicleModelList = (pageNumber=1) => {
    return async(dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(pageNumber));
        let data = await vehicleModelAPI.getvehicleModel(pageNumber);
        console.log("thunkdayam");
        console.log(data.results);
        console.log("thunkdayam");
        dispatch(actions.setVehicleModelList(data.results));
        dispatch(actions.setTotalItemsCount(data.count));
        dispatch(actions.setIsFetching(false));
    }
}



export default vehicleModelListReducer;