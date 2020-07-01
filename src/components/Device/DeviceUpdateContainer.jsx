import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {required} from "../../utils/validators/validators";
import {compose} from "redux";
import {createField, Input,Dropdown} from "../Common/FormsControls/FormsControls";
import {getDeviceItem,updateDeviceItem,requestDeviceModelListAll,requestDeviceTypeListAll,requestCompanyListAll} from "../../redux/Reducers/deviceList_reducer";
import {getIsCreated, getDeviceItemSel,getDeviceModelListAll,getCompanyListAll,getDeviceTypeListAll, getIsFetching,getSetErrorMessage, getCurrentPage} from '../../redux/Selectors/deviceList_selectors';
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
                    <DeviceUpdateReduxForm onSubmit={this.onSubmit}  deviceModelAll={this.props.deviceModelListAll} requestDeviceModelAll={this.props.requestDeviceModelListAll} requestCompanyAll={this.props.requestCompanyListAll}
                        deviceTypeAll={this.props.deviceTypeListAll} requestDeviceTypeAll={this.props.requestDeviceTypeListAll} instance={this.props.deviceItem} companyAll={this.props.companyListAll}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const DeviceForm= ({handleSubmit, error, companyAll,deviceModelAll,deviceTypeAll,requestCompanyAll,requestDeviceModelAll,requestDeviceTypeAll, instance, initialValues}) => {
    console.log(initialValues)
    initialValues.id=instance.id
    initialValues.serie=instance.serie
    initialValues.company = instance.company_detail.id
    initialValues.device_model=instance.device_model_detail.id    
    initialValues.device_type=instance.device_type_detail.id    
    companyAll=(companyAll==null?[]:(companyAll.length!==0?companyAll:[instance.company_detail]))
    deviceModelAll=(deviceModelAll==null?[]:(deviceModelAll.length!==0?deviceModelAll:[instance.device_model_detail]))
    deviceTypeAll=(deviceTypeAll==null?[]:(deviceTypeAll.length!==0?deviceTypeAll:[instance.device_type_detail]))
    return (
        <form onSubmit={handleSubmit}>
            {createField('Serie', 'serie',[required],Input,'Serie')}
            {createField("Company", 'company', [required], Dropdown,'Company',companyAll,'name',null,requestCompanyAll,null,null,"")}
            {createField("Device Model", 'device_model', [required], Dropdown,'Device Model',deviceModelAll,'name',null,requestDeviceModelAll,null,null,"")}
            {createField("Device Type", 'device_type', [required], Dropdown,'Device Type',deviceTypeAll,'name',null,requestDeviceTypeAll,null,null,"")}
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

}})(DeviceForm)

const mapStateToProps = (state) => ({
    deviceModelListAll: getDeviceModelListAll(state),
    deviceTypeListAll: getDeviceTypeListAll(state),
    companyListAll: getCompanyListAll(state),
    deviceItem: getDeviceItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state)

})

export default compose(
    connect(mapStateToProps, { getDeviceItem, updateDeviceItem,requestDeviceModelListAll,requestDeviceTypeListAll,requestCompanyListAll}),
    withRouter
)(DeviceUpdateContainer);