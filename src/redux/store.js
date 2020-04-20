import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import vehicleMarkReducer from "./vehicleMark-reducer";
import vehicleTypeReducer from "./vehicleType_reducer"
import vehicleModelReducer from "./vehicleModel_reducer"
import simcardReducer from "./simcard_reducer"
import jobTitleReducer from "./jobTitle_reducer"
import thunkMiddleware from "redux-thunk";



let rootReducer = combineReducers({
    vehicleMarkPage: vehicleMarkReducer,
    vehicleTypePage: vehicleTypeReducer,
    vehicleModelPage: vehicleModelReducer,
    simcardPage: simcardReducer,
    jobTitlePage: jobTitleReducer,
})

window.__store__ = store

export default store