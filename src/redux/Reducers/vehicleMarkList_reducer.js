import { vehicleMarkAPI } from "../../api/api";

const SET_VEHICLE_MARK_LIST = "SET_VEHICLE_MARK_LIST"

let initialState = {
    vehicleMarkList: [
        { id: 1, name: "Vehicle Mark 1" },
        { id: 2, name: "Vehicle Mark 2" },
        { id: 3, name: "Vehicle Mark 3" }
    ]
};

const vehicleMarkListReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_VEHICLE_MARK_LIST:
            {
                return { ...state, vehicleMarkList: action.vehicleMarkList }
            }
        default:
            return state;
    }
}


export const actions = {
    setVehicleMarkList: (vehicleMarkList) => ({ type: SET_VEHICLE_MARK_LIST, vehicleMarkList })
}

export const requestVehicleMarkList = () => {
    return async (dispatch, getState) => {
        let data = await vehicleMarkAPI.getvehicleMark();
        console.log("thunkdayam");
        console.log(data.results);
        console.log("thunkdayam");
        dispatch(actions.setVehicleMarkList(data.results));
    }
}



export default vehicleMarkListReducer;