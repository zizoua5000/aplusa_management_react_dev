import { applyMiddleware, combineReducers, createStore } from "redux";
import vehicleMarkListReducer from './Reducers/vehicleMarkList_reducer'
import vehicleTypeListReducer from './Reducers/vehicleTypeList_reducer'
import vehicleModelListReducer from './Reducers/vehicleModelList_reducer'
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import simcardListReducer from "./Reducers/simcardList_reducer";



let rootReducer = combineReducers({
    vehicleMarkPage: vehicleMarkListReducer,
    vehicleTypePage: vehicleTypeListReducer,
    vehicleModelPage: vehicleModelListReducer,
    simcardPage:simcardListReducer,
    form:formReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

window.__store__ = store

export default store