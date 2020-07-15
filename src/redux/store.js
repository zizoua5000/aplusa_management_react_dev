import { applyMiddleware, combineReducers, createStore } from "redux";
import vehicleListReducer from './Reducers/vehicleList_reducer'
import vehicleMarkListReducer from './Reducers/vehicleMarkList_reducer'
import vehicleTypeListReducer from './Reducers/vehicleTypeList_reducer'
import priceTypeListReducer from './Reducers/priceTypeList_reducer'
import priceListReducer from './Reducers/priceList_reducer'
import regionListReducer from './Reducers/regionList_reducer'
import statusListReducer from './Reducers/statusList_reducer'
import jobTitleListReducer from './Reducers/jobTitleList_reducer'
import projectListReducer from './Reducers/projectList_reducer'
import vehicleModelListReducer from './Reducers/vehicleModelList_reducer'
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import simcardListReducer from "./Reducers/simcardList_reducer";
import companyTypeListReducer from './Reducers/companyTypeList_reducer'
import companyListReducer from './Reducers/companyList_reducer'
import departmentListReducer from './Reducers/departmentList_reducer'
import deviceTypeListReducer from './Reducers/deviceTypeList_reducer'
import deviceMarkListReducer from './Reducers/deviceMarkList_reducer'
import deviceModelListReducer from './Reducers/deviceModelList_reducer'
import deviceLocationListReducer from './Reducers/deviceLocationList_reducer'
import deviceListReducer from './Reducers/deviceList_reducer'
import configurationListReducer from './Reducers/configurationList_reducer'
import userListReducer from './Reducers/userList_reducer'
import personListReducer from './Reducers/personList_reducer'
import contentTypeListReducer from './Reducers/contentTypeList_reducer'
import deviceDetailListReducer from './Reducers/deviceDetailList_reducer'
import accessoryListReducer from './Reducers/accessoryList_reducer'
import accessoryTypeListReducer from './Reducers/accessoryTypeList_reducer'
import accessoryModelListReducer from './Reducers/accessoryModelList_reducer'
import permissionListReducer from './Reducers/permissionList_reducer'
import userPermissionListReducer from './Reducers/userPermissionList_reducer'



let rootReducer = combineReducers({
    vehiclePage:vehicleListReducer,
    vehicleMarkPage: vehicleMarkListReducer,
    vehicleTypePage: vehicleTypeListReducer,
    pricePage: priceListReducer,
    priceTypePage: priceTypeListReducer,
    regionPage: regionListReducer,
    statusPage: statusListReducer,
    jobTitlePage: jobTitleListReducer,
    projectPage: projectListReducer,
    vehicleModelPage: vehicleModelListReducer,
    simcardPage:simcardListReducer,
    companyTypePage: companyTypeListReducer,
    companyPage: companyListReducer,
    departmentPage: departmentListReducer,
    deviceTypePage: deviceTypeListReducer,
    deviceMarkPage: deviceMarkListReducer,
    deviceModelPage: deviceModelListReducer,
    deviceLocationPage: deviceLocationListReducer,
    devicePage: deviceListReducer,
    configurationPage: configurationListReducer,
    userPage: userListReducer,
    personPage: personListReducer,
    contentTypePage: contentTypeListReducer,
    deviceDetailPage: deviceDetailListReducer,
    accessoryPage: accessoryListReducer,
    accessoryTypePage: accessoryTypeListReducer,
    accessoryModelPage: accessoryModelListReducer,
    permissionPage: permissionListReducer,
    userPermissionPage: userPermissionListReducer,
    form:formReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

window.__store__ = store

export default store
