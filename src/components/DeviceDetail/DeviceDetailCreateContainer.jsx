import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input, Dropdown} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createDeviceDetail,requestStatusListAll,requestSimcardListAll,requestVehicleListAll,requestCompanyListAll,
    requestDeviceLocationListAll,requestConfigurationListAll,requestProjectListAll,requestRegionListAll} from "../../redux/Reducers/deviceDetailList_reducer";
import {getIsCreated, getIsFetching,getCurrentPage,getStatusListAll,getSimcardListAll,getVehicleListAll,
    getCompanyListAll,getDeviceLocationListAll,getConfigurationListAll,getProjectListAll,getRegionListAll} from '../../redux/Selectors/deviceDetailList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';

class DeviceDetailCreateContainer extends React.Component {

    onSubmit = (formData) => {
        this.props.createDeviceDetail(formData);
    }

    render() {
        console.log("CREATE CONTAINER")
        if (this.props.isCreated) {
            return <Redirect to={`/device_Detail/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && <Preloader /> }
            {this.props.statusListAll!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Create Device Detail</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <DeviceDetailCreateReduxForm onSubmit={this.onSubmit} statusListAll={this.props.statusListAll} simcardListAll={this.props.simcardListAll} vehicleListAll={this.props.vehicleListAll} companyListAll={this.props.companyListAll} deviceLocationListAll={this.props.deviceLocationListAll} 
                configurationListAll={this.props.configurationListAll} projectListAll={this.props.projectListAll} regionListAll={this.props.regionListAll} requestStatusListAll={this.props.requestStatusListAll} requestSimcardListAll={this.props.requestSimcardListAll} requestVehicleListAll={this.props.requestVehicleListAll}
                requestCompanyListAll={this.props.requestCompanyListAll} requestDeviceLocationListAll={this.props.requestDeviceLocationListAll} requestConfigurationListAll={this.props.requestConfigurationListAll} requestProjectListAll={this.props.requestProjectListAll} requestRegionListAll={this.props.requestRegionListAll}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const DeviceDetailForm= ({handleSubmit, error, initialValues,statusListAll,simcardListAll,vehicleListAll,companyListAll,deviceLocationListAll,configurationListAll,projectListAll,regionListAll,
    requestStatusListAll,requestSimcardListAll,requestVehicleListAll,requestCompanyListAll,requestDeviceLocationListAll,requestConfigurationListAll,requestProjectListAll,requestRegionListAll}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Status', 'status', [required], Dropdown,'Status',statusListAll,'name',null,requestStatusListAll,null,null,"")}
            {createField('Simcard', 'simcard', [required], Dropdown,'Simcard',simcardListAll,'number',null,requestSimcardListAll,null,null,"")}
            {createField('Vehicle', 'vehicle', [required], Dropdown,'Vehicle',vehicleListAll,'plate',null,requestVehicleListAll,null,null,"")}
            {createField('Company', 'company', [required], Dropdown,'Company',companyListAll,'name',null,requestCompanyListAll,null,null,"")}
            {createField('Device Location', 'device_location', [required], Dropdown,'Device Location',deviceLocationListAll,'name',null,requestDeviceLocationListAll,null,null,"")}
            {createField('Configuration', 'configuration', [required], Dropdown,'Configuration',configurationListAll,'name',null,requestConfigurationListAll,null,null,"")}
            {createField('Project', 'project', [required], Dropdown,'Project',projectListAll,'name',null,requestProjectListAll,null,null,"")}
            {createField('Region', 'region', [required], Dropdown,'Region',regionListAll,'name',null,requestRegionListAll,null,null,"")}
            {createField('Comment', 'comment',[required],Input,'Comment')}
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

const DeviceDetailCreateReduxForm = reduxForm({form: 'deviceDetailCreate', initialValues: {
    
}})(DeviceDetailForm)

const mapStateToProps = (state) => ({
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    statusListAll:getStatusListAll(state),
    simcardListAll:getSimcardListAll(state),
    vehicleListAll:getVehicleListAll(state),
    companyListAll:getCompanyListAll(state),
    deviceLocationListAll:getDeviceLocationListAll(state),
    configurationListAll:getConfigurationListAll(state),
    projectListAll:getProjectListAll(state),
    regionListAll:getRegionListAll(state),
})

export default connect(mapStateToProps, {createDeviceDetail, requestStatusListAll,requestSimcardListAll,requestVehicleListAll,requestCompanyListAll,
    requestDeviceLocationListAll,requestConfigurationListAll,requestProjectListAll,requestRegionListAll})(DeviceDetailCreateContainer);