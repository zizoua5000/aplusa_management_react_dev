import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input,Dropdown} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createDevice,requestDeviceTypeListAll,requestDeviceModelListAll,requestCompanyListAll,requestDeviceDetailListAll} from "../../redux/Reducers/deviceList_reducer";
import {getIsCreated,getDeviceMarkListAll,getCompanyListAll, getIsFetching,getCurrentPage,getDeviceModelListAll,getDeviceTypeListAll,getSetErrorMessage,getDeviceDetailListAll} from '../../redux/Selectors/deviceList_selectors';
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
                    <DeviceCreateReduxForm onSubmit={this.onSubmit} deviceModelListAll={this.props.deviceModelListAll} companyListAll={this.props.companyListAll} requestCompanyListAll={this.props.requestCompanyListAll}
                    requestDeviceModelListAll = {this.props.requestDeviceModelListAll} deviceTypeListAll={this.props.deviceTypeListAll} requestDeviceTypeListAll = {this.props.requestDeviceTypeListAll}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const DeviceForm= ({handleSubmit, error,deviceModelListAll,deviceTypeListAll,companyListAll,requestCompanyListAll, requestDeviceTypeListAll,requestDeviceModelListAll}) => {

    // initialValues.device_model=deviceModelOptions[0].id
    // initialValues.device_type=deviceTypeOptions[0].id
    return (
        <form onSubmit={handleSubmit}>
            {createField('Serie', 'serie',[required],Input,'Serie')}
            {createField('Company', 'company', [required], Dropdown,'Company',companyListAll,'name',null,requestCompanyListAll,null,null,"")}
            {createField('Device Model', 'device_model', [required], Dropdown,'Device Model',deviceModelListAll,'name',null,requestDeviceModelListAll,null,null,"")}
            {createField('Device Type', 'device_type', [required], Dropdown,'Device Type',deviceTypeListAll,'name',null,requestDeviceTypeListAll,null,null,"")}
            {createField('Simcard', 'simcard', [], Dropdown,'Device Location',deviceTypeListAll,'name',null,requestDeviceTypeListAll,null,null,"")}
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
    device_detail:"",
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
})

export default connect(mapStateToProps, {createDevice,requestDeviceTypeListAll,requestDeviceModelListAll,requestCompanyListAll,requestDeviceDetailListAll})(DeviceCreateContainer);