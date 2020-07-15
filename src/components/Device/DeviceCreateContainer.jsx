import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input,Dropdown,DatePickerReact} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createDevice,requestDeviceTypeListAll,requestDeviceModelListAll,requestCompanyListAll,requestStatusListAll,requestRegionListAll,
    requestSimcardListAll,requestVehicleListAll,requestDeviceLocationListAll,requestConfigurationListAll,requestProjectListAll,requestPersonListAll} from "../../redux/Reducers/deviceList_reducer";
import {getIsCreated, getIsFetching,getCurrentPage,getSetErrorMessage,getCompanyListAll,getDeviceModelListAll,getDeviceTypeListAll,getPersonListAll,
    getStatusListAll,getSimcardListAll,getVehicleListAll,getDeviceLocationListAll,getConfigurationListAll,getProjectListAll,getRegionListAll} from '../../redux/Selectors/deviceList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'
import moment from 'moment';

class DeviceCreateContainer extends React.Component {

    onSubmit = (formData) => {
        console.log(formData)
        console.log(formData.device_details.status_datetime)
        console.log(formData.device_details.price_datetime)
        //GMT minute
        let utcOffset = moment().utcOffset()
        if(formData.device_details.status_datetime!==undefined){
        //convertTimeZone to UTC
        let convertStatusDateUTC = moment.parseZone(formData.device_details.status_datetime).utc().format()
        //Add GMT hours to utc date
        let addUTCStatusDateGMTHours = moment(convertStatusDateUTC).add(utcOffset,'minutes')
        // console.log(addUTCStartDateGMTHours)
        formData.device_details.status_datetime = addUTCStatusDateGMTHours
        }
        if(formData.device_details.price_datetime!==undefined){
            console.log("END DATE")
            let convertPriceDateUTC = moment.parseZone(formData.device_details.price_datetime).utc().format()
            let addUTCPriceDateGMTMinutes = moment(convertPriceDateUTC).add(utcOffset,'minutes')
            formData.device_details.price_datetime = addUTCPriceDateGMTMinutes
        }
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
                    <DeviceCreateReduxForm onSubmit={this.onSubmit} deviceModelListAll={this.props.deviceModelListAll} requestDeviceModelListAll={this.props.requestDeviceModelListAll} simcardListAll={this.props.simcardListAll}
                    personListAll={this.props.personListAll} deviceTypeListAll={this.props.deviceTypeListAll} requestDeviceTypeListAll={this.props.requestDeviceTypeListAll} statusListAll={this.props.statusListAll}
                    vehicleListAll={this.props.vehicleListAll} requestVehicleListAll={this.props.requestVehicleListAll} requestRegionListAll={this.props.requestRegionListAll} companyListAll={this.props.companyListAll}
                    configurationListAll={this.props.configurationListAll} projectListAll={this.props.projectListAll} regionListAll={this.props.regionListAll} requestStatusListAll={this.props.requestStatusListAll} 
                    requestSimcardListAll={this.props.requestSimcardListAll} deviceLocationListAll={this.props.deviceLocationListAll} requestCompanyListAll={this.props.requestCompanyListAll} requestDeviceLocationListAll={this.props.requestDeviceLocationListAll}
                    requestConfigurationListAll={this.props.requestConfigurationListAll} requestProjectListAll={this.props.requestProjectListAll} requestPersonListAll={this.props.requestPersonListAll}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const DeviceForm= ({handleSubmit, error,deviceModelListAll,deviceTypeListAll,companyListAll,requestCompanyListAll, requestDeviceTypeListAll,requestDeviceModelListAll,personListAll,
    simcardListAll,statusListAll,vehicleListAll,configurationListAll,projectListAll,regionListAll,requestStatusListAll,deviceLocationListAll,requestSimcardListAll,requestVehicleListAll,
    requestConfigurationListAll,requestProjectListAll,requestRegionListAll,requestDeviceLocationListAll,requestPersonListAll}) => {

    // initialValues.device_model=deviceModelOptions[0].id
    // initialValues.device_type=deviceTypeOptions[0].id
    return (
        <form onSubmit={handleSubmit}>
            {createField('Serie', 'serie',[required],Input,'Serie')}
            {createField('Device Company', 'company', [required], Dropdown,'Company',companyListAll,'name',null,requestCompanyListAll,null,null,"")}
            {createField('Device Model', 'device_model', [required], Dropdown,'Device Model',deviceModelListAll,'name',null,requestDeviceModelListAll,null,null,"")}
            {createField('Device Type', 'device_type', [required], Dropdown,'Device Type',deviceTypeListAll,'name',null,requestDeviceTypeListAll,null,null,"")}
            {createField('Status', 'device_details.status', [required], Dropdown,'Status',statusListAll,'name',null,requestStatusListAll,null,null,"")}
            {createField('Status Datetime', 'device_details.status_datetime',[],DatePickerReact,'Status Datetime')}
            {createField('Vehicle', 'device_details.vehicle', [], Dropdown,'Vehicle',vehicleListAll,'plate',null,requestVehicleListAll,null,null,"")}
            {createField('Vehicle Company', 'device_details.company', [], Dropdown,'Company',companyListAll,'name',null,requestCompanyListAll,null,null,"")}
            {createField('Device Location', 'device_details.device_location', [required], Dropdown,'Device Location',deviceLocationListAll,'name',null,requestDeviceLocationListAll,null,null,"")}
            {createField('Project', 'device_details.project', [], Dropdown,'Project',projectListAll,'name',null,requestProjectListAll,null,null,"")}
            {createField('Recipient', 'device_details.recipient', [], Dropdown,'Recipient',personListAll,'full_name',null,requestPersonListAll,null,null,"")}
            {createField('Region', 'device_details.region', [], Dropdown,'Region',regionListAll,'name',null,requestRegionListAll,null,null,"")}
            {createField('Simcard', 'device_details.simcard', [], Dropdown,'Simcard',simcardListAll,'number',null,requestSimcardListAll,null,null,"")}
            {createField('Configuration', 'device_details.configuration', [], Dropdown,'Configuration',configurationListAll,'name',null,requestConfigurationListAll,null,null,"")}
            {createField('Sell Count', 'device_details.sell_count',[],Input,'Sell Count')}
            {createField('Price Datetime', 'device_details.price_datetime',[],DatePickerReact,'Price Datetime')}
            {createField('Comment', 'device_details.comment',[],Input,'Comment')}        
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
    device_details:{
        status:'',
        vehicle:'',
        company:'',
        device_location:'',
        recipient:'',
        configuration:'',
        simcard:'',
        project:'',
        region:'',
        comment:'',
        price_datetime:'',
        status_datetime:'',
        sell_count:'',  
    },
}})(DeviceForm)

const mapStateToProps = (state) => ({
    deviceModelListAll: getDeviceModelListAll(state),
    deviceTypeListAll: getDeviceTypeListAll(state),
    companyListAll: getCompanyListAll(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state),
    statusListAll:getStatusListAll(state),
    simcardListAll:getSimcardListAll(state),
    vehicleListAll:getVehicleListAll(state),
    deviceLocationListAll:getDeviceLocationListAll(state),
    configurationListAll:getConfigurationListAll(state),
    projectListAll:getProjectListAll(state),
    regionListAll:getRegionListAll(state),
    personListAll:getPersonListAll(state),
})

export default connect(mapStateToProps, {createDevice,requestDeviceTypeListAll,requestDeviceModelListAll,requestCompanyListAll,requestRegionListAll,
    requestStatusListAll,requestSimcardListAll,requestVehicleListAll,requestDeviceLocationListAll,requestConfigurationListAll,requestProjectListAll,requestPersonListAll})(DeviceCreateContainer);