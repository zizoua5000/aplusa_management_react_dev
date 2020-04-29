
export const getVehicleMarkList = (state) => {
    return state.vehicleMarkPage.vehicleMarkList;
}
export const getIsFetching = (state) => {
    return state.vehicleMarkPage.isFetching;
}

export const getSetErrorMessage = (state) => {
    return state.vehicleMarkPage.message;
}