import { vehicleTypeAPI } from "../../api/api";

const SET_VEHICLE_TYPES = "SET_VEHICLE_TYPES"
const IS_FETCHING = "IS_FETCHING"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"


let initialState = {
    vehicleTypes: [],
    isFetching: true,
    error:null
};

const vehicleTypesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VEHICLE_TYPES:
            {
                console.log("reducerdeyem");
                console.log(...state);
                console.log("reducerdeyem");
                return {...state, vehicleTypes: action.vehicleTypes }
            }
            case IS_FETCHING:
                {
                   return { ...state, isFetching:action.isFetching}
                }
            case SET_ERROR_MESSAGE:
                {
                   return { ...state, error:action.error}
                }
        default:
            return state;
    }
}


export const actions = {
    setVehicleTypes: (vehicleTypes) => ({ type: SET_VEHICLE_TYPES, vehicleTypes }),
    setIsFetching:(isFetching)=>({type:IS_FETCHING, isFetching}),
    setErrorMessage:(error) => ({type:SET_ERROR_MESSAGE, error})
}


export const requestVehicleTypes = () => {
    return async(dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        let response = await vehicleTypeAPI.getvehicleType(dispatch,actions);
        console.log("thunkdayam");
        console.log(response);
        console.log("thunkdayam");
        if(response.status ===200){
        dispatch(actions.setVehicleTypes(response.data.results));
        dispatch(actions.setIsFetching(false))
        }
    }
}



export default vehicleTypesReducer;