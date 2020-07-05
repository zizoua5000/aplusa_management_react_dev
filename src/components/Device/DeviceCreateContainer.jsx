import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input,Dropdown} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createDevice,requestDeviceTypeListAll,requestDeviceModelListAll,requestCompanyListAll,requestDeviceDetailListAll,requestStatusListAll,
    requestSimcardListAll,requestVehicleListAll,requestDeviceLocationListAll,requestConfigurationListAll,requestProjectListAll,requestRegionListAll} from "../../redux/Reducers/deviceList_reducer";
import {getIsCreated,getDeviceMarkListAll,getCompanyListAll, getIsFetching,getCurrentPage,getDeviceModelListAll,getDeviceTypeListAll,getSetErrorMessage,getDeviceDetailListAll,
    getStatusListAll,getSimcardListAll,getVehicleListAll,getDeviceLocationListAll,getConfigurationListAll,getProjectListAll,getRegionListAll} from '../../redux/Selectors/deviceList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class DeviceCreateContainer extends React.Component {

    onSubmit = (formData) => {
        console.log(formData)
        this.props.createDevice(formData);
    }

    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/device/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.deviceModelListAll==null&&
                    this.props.deviceTypeListAll==null && <Preloader /> }
            {this.props.setErrorMessage && <ErrorMessage />}     
            {this.props.deviceModelListAll!=null && this.props.deviceTypeListAll!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Create Device</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <DeviceCreateReduxForm onSubmit={this.onSubmit} deviceModelListAll={this.props.deviceModelListAll}  deviceDetailListAll={this.props.deviceDetailListAll} requestDeviceModelListAll={this.props.requestDeviceModelListAll}  simcardListAll={this.props.simcardListAll} requestVehicleListAll={this.props.requestVehicleListAll}
                    deviceTypeListAll={this.props.deviceTypeListAll} requestDeviceTypeListAll={this.props.requestDeviceTypeListAll} requestDeviceDetailListAll={this.props.requestDeviceDetailListAll} statusListAll={this.props.statusListAll} vehicleListAll={this.props.vehicleListAll} requestVehicleListAll={this.props.requestVehicleListAll}  
                    companyListAll={this.props.companyListAll} configurationListAll={this.props.configurationListAll} projectListAll={this.props.projectListAll} regionListAll={this.props.regionListAll} requestStatusListAll={this.props.requestStatusListAll} requestSimcardListAll={this.props.requestSimcardListAll} requestRegionListAll={this.props.requestRegionListAll}
                    deviceLocationListAll={this.props.deviceLocationListAll} requestCompanyListAll={this.props.requestCompanyListAll} requestDeviceLocationListAll={this.props.requestDeviceLocationListAll} requestConfigurationListAll={this.props.requestConfigurationListAll} requestProjectListAll={this.props.requestProjectListAll} />
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const DeviceForm= ({handleSubmit, error,deviceModelListAll,deviceTypeListAll,companyListAll,deviceDetailListAll,requestCompanyListAll, requestDeviceTypeListAll,requestDeviceModelListAll,requestDeviceDetailListAll,
    simcardListAll,statusListAll,vehicleListAll,configurationListAll,projectListAll,regionListAll,requestStatusListAll,deviceLocationListAll,requestSimcardListAll,requestVehicleListAll,requestDeviceLocationListAll,
    requestConfigurationListAll,requestProjectListAll,requestRegionListAll}) => {

    // initialValues.device_model=deviceModelOptions[0].id
    // initialValues.device_type=deviceTypeOptions[0].id
    return (
        <form onSubmit={handleSubmit}>
            {createField('Serie', 'serie',[required],Input,'Serie')}
            {createField('Device Company', 'company', [required], Dropdown,'Company',companyListAll,'name',null,requestCompanyListAll,null,null,"")}
            {createField('Device Model', 'device_model', [required], Dropdown,'Device Model',deviceModelListAll,'name',null,requestDeviceModelListAll,null,null,"")}
            {createField('Device Type', 'device_type', [required], Dropdown,'Device Type',deviceTypeListAll,'name',null,requestDeviceTypeListAll,null,null,"")}
            {/* {createField('Device Detail', 'device_detail', [], Dropdown,'Device Detail',deviceDetailListAll,'id',null,requestDeviceDetailListAll,null,null,"")} */}
            {createField('Status', 'status', [], Dropdown,'Status',statusListAll,'name',null,requestStatusListAll,null,null,"")}
            {createField('Vehicle', 'vehicle', [], Dropdown,'Vehicle',vehicleListAll,'plate',null,requestVehicleListAll,null,null,"")}
            {createField('Vehicle Company', 'company', [], Dropdown,'Company',companyListAll,'name',null,requestCompanyListAll,null,null,"")}
            {createField('Device Location', 'device_location', [required], Dropdown,'Device Location',deviceLocationListAll,'name',null,requestDeviceLocationListAll,null,null,"")}
            {createField('Configuration', 'configuration', [], Dropdown,'Configuration',configurationListAll,'name',null,requestConfigurationListAll,null,null,"")}
            {createField('Simcard', 'simcard', [], Dropdown,'Simcard',simcardListAll,'number',null,requestSimcardListAll,null,null,"")}
            {createField('Project', 'project', [], Dropdown,'Project',projectListAll,'name',null,requestProjectListAll,null,null,"")}
            {createField('Region', 'region', [], Dropdown,'Region',regionListAll,'name',null,requestRegionListAll,null,null,"")}
            {createField('Comment', 'comment',[],Input,'Comment')}
            {createField('Price Datetime', 'price_datetime',[],Input,'Price Datetime')}
            {createField('Status Datetime', 'status_datetime',[],Input,'Status Datetime')}
            {createField('Sell Count', 'sell_count',[required],Input,'Sell Count')}

            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button className="btn btn-info">Submit</button>
            </div>
        </form>
    )
}

const DeviceCreateReduxForm = reduxForm({form: 'deviceCreate', initialValues: {
    device_mark: "",
    device_model: "",
    device_type: "",
    company:"",
    serie:"",
}})(DeviceForm)

const mapStateToProps = (state) => ({
    deviceMarkListAll: getDeviceMarkListAll(state),
    deviceModelListAll: getDeviceModelListAll(state),
    deviceTypeListAll: getDeviceTypeListAll(state),
    companyListAll: getCompanyListAll(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state),
    deviceDetailListAll:getDeviceDetailListAll(state),
    statusListAll:getStatusListAll(state),
    simcardListAll:getSimcardListAll(state),
    vehicleListAll:getVehicleListAll(state),
    deviceLocationListAll:getDeviceLocationListAll(state),
    configurationListAll:getConfigurationListAll(state),
    projectListAll:getProjectListAll(state),
    regionListAll:getRegionListAll(state),
})

export default connect(mapStateToProps, {createDevice,requestDeviceTypeListAll,requestDeviceModelListAll,requestCompanyListAll,requestDeviceDetailListAll,
    requestStatusListAll,requestSimcardListAll,requestVehicleListAll,requestDeviceLocationListAll,requestConfigurationListAll,requestProjectListAll,requestRegionListAll})(DeviceCreateContainer);