// import {createSelector} from "reselect";

export const getVehicleTypesSelector = (state) => {
    return state.vehicleTypePage.vehicleTypes;
}

export const getIsFetchingSelector = (state) => {
    return state.vehicleTypePage.isFetching;
}