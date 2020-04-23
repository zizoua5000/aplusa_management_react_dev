import { vehicleTypeAPI } from "../../api/api";

const SET_VEHICLE_TYPES = "SET_VEHICLE_TYPES"
const IS_FETCHING = "IS_FETCHING"


let initialState = {
    vehicleTypes: [{ id: 1, name: "nizam" }],
    isFetching: true
};

const vehicleTypesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VEHICLE_TYPES:
            {
                return {...state, vehicleTypes: action.vehicleTypes }
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
    setVehicleTypes: (vehicleTypes) => ({ type: SET_VEHICLE_TYPES, vehicleTypes }),
    setIsFetching:(isFetching)=>({type:IS_FETCHING, isFetching})
}


export const requestVehicleTypes = () => {
    return async(dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        let data = await vehicleTypeAPI.getvehicleType();
        console.log("thunkdayam");
        console.log(data);
        console.log("thunkdayam");
        dispatch(actions.setVehicleTypes(data.results));
        dispatch(actions.setIsFetching(false))
    }
}



export default vehicleTypesReducer;