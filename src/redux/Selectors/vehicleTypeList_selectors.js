// import {createSelector} from "reselect";

export const getVehicleTypeList = (state) => {
    return state.vehicleTypePage.vehicleTypeList;
}

export const getIsFetching = (state) => {
    return state.vehicleTypePage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.vehicleTypePage.message;
}