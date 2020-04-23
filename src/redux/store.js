import { applyMiddleware, combineReducers, createStore } from "redux";
import vehicleMarksReducer from './Reducers/vehicleMarks_reducer'
import vehicleTypesReducer from './Reducers/vehicleTypes_reducer'
import vehicleModelListReducer from './Reducers/vehicleModelList_reducer'
import thunkMiddleware from "redux-thunk";



let rootReducer = combineReducers({
    vehicleMarkPage: vehicleMarksReducer,
    vehicleTypePage: vehicleTypesReducer,
    vehicleModelPage: vehicleModelListReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

window.__store__ = store

export default store