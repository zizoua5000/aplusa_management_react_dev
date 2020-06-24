import { applyMiddleware, combineReducers, createStore } from "redux";
import vehicleListReducer from './Reducers/vehicleList_reducer'
import vehicleMarkListReducer from './Reducers/vehicleMarkList_reducer'
import vehicleTypeListReducer from './Reducers/vehicleTypeList_reducer'
import regionListReducer from './Reducers/regionList_reducer'
import projectListReducer from './Reducers/projectList_reducer'
import vehicleModelListReducer from './Reducers/vehicleModelList_reducer'
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import simcardListReducer from "./Reducers/simcardList_reducer";
import companyTypeListReducer from './Reducers/companyTypeList_reducer'
import companyListReducer from './Reducers/companyList_reducer'
import deviceTypeListReducer from './Reducers/deviceTypeList_reducer'
import deviceMarkListReducer from './Reducers/deviceMarkList_reducer'



let rootReducer = combineReducers({
    vehiclePage:vehicleListReducer,
    vehicleMarkPage: vehicleMarkListReducer,
    vehicleTypePage: vehicleTypeListReducer,
    regionPage: regionListReducer,
    projectPage: projectListReducer,
    vehicleModelPage: vehicleModelListReducer,
    simcardPage:simcardListReducer,
    companyTypePage: companyTypeListReducer,
    companyPage: companyListReducer,
    deviceTypePage: deviceTypeListReducer,
    deviceMarkPage: deviceMarkListReducer,
    form:formReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

window.__store__ = store

export default store