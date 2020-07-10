import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {required} from "../../utils/validators/validators";
import {compose} from "redux";
import {createField, Input,Dropdown,DatePickerReact} from "../Common/FormsControls/FormsControls";
import {getDeviceItem,updateDeviceItem,requestDeviceTypeListAll,requestDeviceModelListAll,requestCompanyListAll,requestStatusListAll,requestRegionListAll,
    requestSimcardListAll,requestVehicleListAll,requestDeviceLocationListAll,requestConfigurationListAll,requestProjectListAll,requestPersonListAll} from "../../redux/Reducers/deviceList_reducer";
import {getIsCreated, getDeviceItemSel,getIsFetching,getSetErrorMessage, getCurrentPage,getCompanyListAll,getDeviceModelListAll,getDeviceTypeListAll,
    getStatusListAll,getSimcardListAll,getVehicleListAll,getDeviceLocationListAll,getConfigurationListAll,getProjectListAll,getRegionListAll,getPersonListAll} from '../../redux/Selectors/deviceList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class DeviceUpdateContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;        
        this.props.getDeviceItem(id);
        console.log(this.props)
    }

    onSubmit = (formData) => {
        this.props.updateDeviceItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/device/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.deviceTypeListAll==null&&this.props.deviceModelListAll==null && this.props.deviceItem==null&& <Preloader />  }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.deviceTypeListAll!=null&&this.props.deviceModelListAll!=null&&this.props.deviceItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Update Device</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <DeviceUpdateReduxForm onSubmit={this.onSubmit} instance={this.props.deviceItem} deviceModelListAll={this.props.deviceModelListAll} requestDeviceModelListAll={this.props.requestDeviceModelListAll}  simcardListAll={this.props.simcardListAll} 
                    deviceTypeListAll={this.props.deviceTypeListAll} requestDeviceTypeListAll={this.props.requestDeviceTypeListAll} statusListAll={this.props.statusListAll} vehicleListAll={this.props.vehicleListAll} requestVehicleListAll={this.props.requestVehicleListAll}
                    requestRegionListAll={this.props.requestRegionListAll} companyListAll={this.props.companyListAll} configurationListAll={this.props.configurationListAll} projectListAll={this.props.projectListAll} regionListAll={this.props.regionListAll} 
                    requestStatusListAll={this.props.requestStatusListAll} requestSimcardListAll={this.props.requestSimcardListAll} deviceLocationListAll={this.props.deviceLocationListAll} requestCompanyListAll={this.props.requestCompanyListAll} requestPersonListAll={this.props.requestPersonListAll}
                    requestDeviceLocationListAll={this.props.requestDeviceLocationListAll} requestConfigurationListAll={this.props.requestConfigurationListAll} requestProjectListAll={this.props.requestProjectListAll} personListAll={this.props.personListAll}
                    vehicleCompanyListAll={this.props.vehicleCompanyListAll}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const DeviceForm= ({handleSubmit, error, instance, initialValues,deviceModelListAll,deviceTypeListAll,companyListAll,requestCompanyListAll, requestDeviceTypeListAll,requestDeviceModelListAll,
    simcardListAll,statusListAll,vehicleListAll,configurationListAll,projectListAll,regionListAll,requestStatusListAll,deviceLocationListAll,requestSimcardListAll,requestVehicleListAll,vehicleCompanyListAll,
    requestConfigurationListAll,requestProjectListAll,requestRegionListAll,requestDeviceLocationListAll,personListAll,requestPersonListAll,requestVehicleCompanyListAll}) => {
    console.log(initialValues)
    initialValues.id=instance.id
    initialValues.serie=instance.serie
    initialValues.company = instance.company_detail.id
    initialValues.device_model=instance.device_model_detail.id    
    initialValues.device_type=instance.device_type_detail.id
    initialValues.device_details.status=instance.device_details.status_detail.id
    initialValues.device_details.vehicle=instance.device_details.vehicle_detail.id
    initialValues.device_details.company=instance.device_details.company_detail.id
    initialValues.device_details.device_location=instance.device_details.device_location_detail.id
    initialValues.device_details.recipient=instance.device_details.recipient_detail.id
    initialValues.device_details.configuration=instance.device_details.configuration_detail.id
    initialValues.device_details.simcard=instance.device_details.simcard_detail.id
    initialValues.device_details.project=instance.device_details.project_detail.id
    initialValues.device_details.region=instance.device_details.region_detail.id
    initialValues.device_details.comment=instance.device_details.comment
    initialValues.device_details.price_datetime=instance.device_details.price_datetime
    initialValues.device_details.status_datetime=instance.device_details.status_datetime
    initialValues.device_details.sell_count=instance.device_details.sell_count

    companyListAll=(companyListAll==null?[]:(companyListAll.length!==0?companyListAll:[instance.company_detail]))
    deviceModelListAll=(deviceModelListAll==null?[]:(deviceModelListAll.length!==0?deviceModelListAll:[instance.device_model_detail]))
    deviceTypeListAll=(deviceTypeListAll==null?[]:(deviceTypeListAll.length!==0?deviceTypeListAll:[instance.device_type_detail]))
    statusListAll=(statusListAll==null?[]:(statusListAll.length!==0?statusListAll:[instance.device_details.status_detail]))
    vehicleListAll=(vehicleListAll==null?[]:(vehicleListAll.length!==0?vehicleListAll:[instance.device_details.vehicle_detail]))
    vehicleCompanyListAll=(vehicleCompanyListAll==null?[]:(vehicleCompanyListAll.length!==0?vehicleCompanyListAll:[instance.device_details.company_detail]))
    deviceLocationListAll=(deviceLocationListAll==null?[]:(deviceLocationListAll.length!==0?deviceLocationListAll:[instance.device_details.device_location_detail]))
    personListAll=(personListAll==null?[]:(personListAll.length!==0?personListAll:[instance.device_details.recipient_detail]))
    configurationListAll=(configurationListAll==null?[]:(configurationListAll.length!==0?configurationListAll:[instance.device_details.configuration_detail]))
    simcardListAll=(simcardListAll==null?[]:(simcardListAll.length!==0?simcardListAll:[instance.device_details.simcard_detail]))
    projectListAll=(projectListAll==null?[]:(projectListAll.length!==0?projectListAll:[instance.device_details.project_detail]))
    regionListAll=(regionListAll==null?[]:(regionListAll.length!==0?regionListAll:[instance.device_details.region_detail]))
    return (
        <form onSubmit={handleSubmit}>
            {createField('Serie', 'serie',[required],Input,'Serie')}
            {createField("Company", 'company', [required], Dropdown,'Company',companyListAll,'name',null,requestCompanyListAll,null,null,"")}
            {createField("Device Model", 'device_model', [required], Dropdown,'Device Model',deviceModelListAll,'name',null,requestDeviceModelListAll,null,null,"")}
            {createField("Device Type", 'device_type', [required], Dropdown,'Device Type',deviceTypeListAll,'name',null,requestDeviceTypeListAll,null,null,"")}
            {createField('Status', 'device_details.status', [], Dropdown,'Status',statusListAll,'name',null,requestStatusListAll,null,null,"")}
            {createField('Status Datetime', 'device_details.status_datetime',[],DatePickerReact,'Status Datetime')}
            {createField('Plate', 'device_details.vehicle', [], Dropdown,'Plate',vehicleListAll,'plate',null,requestVehicleListAll,null,null,"")}
            {createField('Vehicle Company', 'device_details.company', [], Dropdown,'Company',vehicleCompanyListAll,'name',null,requestCompanyListAll,null,null,"")}
            {createField('Device Location', 'device_details.device_location', [required], Dropdown,'Device Location',deviceLocationListAll,'name',null,requestDeviceLocationListAll,null,null,"")}
            {createField('Project', 'device_details.project', [], Dropdown,'Project',projectListAll,'name',null,requestProjectListAll,null,null,"")}
            {createField('Recipient', 'device_details.recipient', [], Dropdown,'Recipient',personListAll,'first_name',null,requestPersonListAll,null,null,"")}
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

const DeviceUpdateReduxForm = reduxForm({form: 'deviceUpdate', initialValues: {
    id:"",
    company:"",
    serie:"",
    device_model: "",
    device_type: "",
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
    statusListAll:getStatusListAll(state),
    simcardListAll:getSimcardListAll(state),
    vehicleListAll:getVehicleListAll(state),
    deviceLocationListAll:getDeviceLocationListAll(state),
    configurationListAll:getConfigurationListAll(state),
    projectListAll:getProjectListAll(state),
    regionListAll:getRegionListAll(state),
    deviceItem: getDeviceItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state),
    personListAll:getPersonListAll(state),
    vehicleCompanyListAll:getCompanyListAll(state),

})

export default compose(
    connect(mapStateToProps, { getDeviceItem, updateDeviceItem,requestDeviceTypeListAll,requestDeviceModelListAll,requestCompanyListAll,requestPersonListAll,
        requestStatusListAll,requestSimcardListAll,requestVehicleListAll,requestDeviceLocationListAll,requestConfigurationListAll,requestProjectListAll,requestRegionListAll}),
    withRouter
)(DeviceUpdateContainer);