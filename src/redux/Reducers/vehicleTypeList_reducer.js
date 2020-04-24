import { vehicleTypeAPI } from "../../api/api";

const SET_VEHICLE_TYPES = "SET_VEHICLE_TYPES"
const IS_FETCHING = "IS_FETCHING"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"


let initialState = {
    vehicleTypeList: [],
    isFetching: true,
    message:null
};

const vehicleTypeListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VEHICLE_TYPES:
            {
                return {...state, vehicleTypeList: action.vehicleTypeList }
            }
            case IS_FETCHING:
                {
                   return { ...state, isFetching:action.isFetching}
                }
            case SET_ERROR_MESSAGE:
                {
                   return { ...state, message:action.message}
                }
        default:
            return state;
    }
}


export const actions = {
    setVehicleTypeList: (vehicleTypeList) => ({ type: SET_VEHICLE_TYPES, vehicleTypeList }),
    setIsFetching:(isFetching)=>({type:IS_FETCHING, isFetching}),
    setErrorMessage:(message) => ({type:SET_ERROR_MESSAGE, message})
}


export const requestVehicleTypeList = () => {
    return async(dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        let response = await vehicleTypeAPI.getvehicleType(dispatch,actions);
        console.log("thunkdayam");
        console.log(response);
        console.log("thunkdayam");
        if(response!=null){
        dispatch(actions.setVehicleTypeList(response.results));
        dispatch(actions.setIsFetching(false));
        
    }
    }
}



export default vehicleTypeListReducer;
