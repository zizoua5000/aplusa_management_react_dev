import { vehicleMarkAPI } from "../../api/api";

const SET_VEHICLE_MARK_LIST = "SET_VEHICLE_MARK_LIST"
const IS_FETCHING = "IS_FETCHING"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"

let initialState = {
    vehicleMarkList: [
        { id: 1, name: "Vehicle Mark 1" },
        { id: 2, name: "Vehicle Mark 2" },
        { id: 3, name: "Vehicle Mark 3" }
    ],
    isFetching: false,
    message:null
};

const vehicleMarkListReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_VEHICLE_MARK_LIST:
            {
                return { ...state, vehicleMarkList: action.vehicleMarkList }
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
    setVehicleMarkList: (vehicleMarkList) => ({ type: SET_VEHICLE_MARK_LIST, vehicleMarkList }),
    setIsFetching:(isFetching)=>({type:IS_FETCHING, isFetching}),
    setErrorMessage:(message) => ({type:SET_ERROR_MESSAGE, message})
}

export const requestVehicleMarkList = () => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        let response = await vehicleMarkAPI.getvehicleMark();
        console.log("thunkdayam");
        console.log(response);
        console.log("thunkdayam");
        dispatch(actions.setIsFetching(false)); 
        if(response !== 'error'){
        dispatch(actions.setVehicleMarkList(response.results));         
        } else {
        dispatch(actions.setErrorMessage(response))
        }
    }
}



export default vehicleMarkListReducer;