import { vehicleMarkAPI } from "../../api/api";

const SET_VEHICLE_MARKS = "SET_VEHICLE_MARKS"

let initialState = {
    vehicleMarks: [{ id: 1, name: "niko" }]
};

const vehicleMarksReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_VEHICLE_MARKS:
            {
                return {...state, vehicleMarks: action.vehicleMarks }
            }
        default:
            return state;
    }
}


export const actions = {
    setVehicleMarks: (vehicleMarks) => ({ type: SET_VEHICLE_MARKS, vehicleMarks })
}

export const requestVehicleMarkList = () => {
    return async(dispatch, getState) => {
        let data = await vehicleMarkAPI.getvehicleMark();
        console.log("thunkdayam");
        console.log(data.results);
        console.log("thunkdayam");
        dispatch(actions.setVehicleMarks(data.results));
    }
}



export default vehicleMarksReducer;