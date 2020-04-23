import { applyMiddleware, combineReducers, createStore } from "redux";
import vehicleMarkListReducer from './Reducers/vehicleMarkList_reducer'
import vehicleTypesReducer from './Reducers/vehicleTypes_reducer'
import vehicleModelListReducer from './Reducers/vehicleModelList_reducer'
import thunkMiddleware from "redux-thunk";



let rootReducer = combineReducers({
    vehicleMarkPage: vehicleMarkListReducer,
    vehicleTypePage: vehicleTypesReducer,
    vehicleModelPage: vehicleModelListReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

window.__store__ = store

export default store