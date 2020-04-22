import { vehicleModelAPI } from "../../api/api";
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

const SET_VEHICLE_MODELS = "SET_VEHICLE_MODELS"

let initialState = {
    vehicleModelList: [{ id: 1, name: "niko" }]
};

const vehicleModelListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VEHICLE_MODELS:
            {
                console.log("reducerdeyem");
                console.log(...state);
                console.log("reducerdeyem");
                return {...state, vehicleModelList: action.vehicleModelList }
            }
        default:
            return state;
    }
}


export const actions = {
    setVehicleModelList: (vehicleModelList) => ({ type: SET_VEHICLE_MODELS, vehicleModelList })
}

// export const requestVehicleTypes = async () => {
//     // let data = vehicleTypeAPI.getVehicleTypes()
//     // console.log(data)

//     // dispatch(actions.setVehicleTypes);
//     // return data;

//     return async(dispatch) => {

//         let data = vehicleMarkAPI.getVehicleMark();
//         console.log(data);
//         dispatch(actions.setVehicleMarks(data.items));
//     }

// }

export const requestVehicleModelList = () => {
    return async(dispatch, getState) => {
        let data = await vehicleModelAPI.getvehicleModel();
        console.log("thunkdayam");
        console.log(data.results);
        console.log("thunkdayam");
        dispatch(actions.setVehicleModelList(data.results));
    }
}



export default vehicleModelListReducer;