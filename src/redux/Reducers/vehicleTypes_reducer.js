import { vehicleTypeAPI } from "../../api/api";
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

const SET_VEHICLE_TYPES = "SET_VEHICLE_TYPES"

let initialState = {
    vehicleTypes: [{ id: 1, name: "niko" }]
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
        default:
            return state;
    }
}


export const actions = {
    setVehicleTypes: (vehicleTypes) => ({ type: SET_VEHICLE_TYPES, vehicleTypes })
}


export const requestVehicleTypes = () => {
    return async(dispatch, getState) => {
        let data = await vehicleTypeAPI.getvehicleType();
        console.log("thunkdayam");
        console.log(data.results);
        console.log("thunkdayam");
        dispatch(actions.setVehicleTypes(data.results));
    }
}



export default vehicleTypesReducer;