import { applyMiddleware, combineReducers, createStore } from "redux";
import vehicleListReducer from './Reducers/vehicleList_reducer'
import vehicleMarkListReducer from './Reducers/vehicleMarkList_reducer'
import vehicleTypeListReducer from './Reducers/vehicleTypeList_reducer'
import priceTypeListReducer from './Reducers/priceTypeList_reducer'
import regionListReducer from './Reducers/regionList_reducer'
import statusListReducer from './Reducers/statusList_reducer'
import jobTitleListReducer from './Reducers/jobTitleList_reducer'
import projectListReducer from './Reducers/projectList_reducer'
import vehicleModelListReducer from './Reducers/vehicleModelList_reducer'
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import simcardListReducer from "./Reducers/simcardList_reducer";
import companyTypeListReducer from './Reducers/companyTypeList_reducer'



let rootReducer = combineReducers({
    vehiclePage:vehicleListReducer,
    vehicleMarkPage: vehicleMarkListReducer,
    vehicleTypePage: vehicleTypeListReducer,
    priceTypePage: priceTypeListReducer,
    regionPage: regionListReducer,
    statusPage: statusListReducer,
    jobTitlePage: jobTitleListReducer,
    projectPage: projectListReducer,
    vehicleModelPage: vehicleModelListReducer,
    simcardPage:simcardListReducer,
    companyTypePage: companyTypeListReducer,
    form:formReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

window.__store__ = store

export default store