import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {required} from "../../utils/validators/validators";
import {compose} from "redux";
import {createField, Input, Dropdown} from "../Common/FormsControls/FormsControls";
import {getDeviceModelItem,updateDeviceModelItem, requestDeviceMarkListAll} from "../../redux/Reducers/deviceModelList_reducer";
import {getIsCreated, getDeviceModelItemSel, getDeviceMarkListAll, getIsFetching, getCurrentPage} from '../../redux/Selectors/deviceModelList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class DeviceModelUpdateContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;
        // this.props.requestDeviceMarkList();
        this.props.getDeviceModelItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateDeviceModelItem(formData);
    }
 
    render() {
        console.log(this.props.DeviceModelItem)

        if (this.props.isCreated) {
            return <Redirect to={`/device_model/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.deviceMarkListAll==null && this.props.deviceModelItem==null&& <Preloader /> }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.deviceMarkListAll!=null && this.props.deviceModelItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Update Device Model</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <DeviceModelUpdateReduxForm onSubmit={this.onSubmit} deviceMarkListAll={this.props.deviceMarkListAll} instance={this.props.deviceModelItem} requestDeviceMarkListAll={this.props.requestDeviceMarkListAll}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const DeviceModelForm= ({handleSubmit, error, deviceMarkListAll, instance, initialValues,requestDeviceMarkListAll}) => {
    initialValues.id=instance.id
    initialValues.name=instance.name
    initialValues.device_mark=instance.device_mark_detail.id
    deviceMarkListAll=(deviceMarkListAll==null?[]:(deviceMarkListAll.length!=0?deviceMarkListAll:[instance.device_mark_detail]))
    console.log(instance)
    return (
        <form onSubmit={handleSubmit}>
            {createField('Name', 'name',[required],Input,'Name')}
            {createField("Device Mark", 'device_mark', [required], Dropdown,'Device Mark',deviceMarkListAll,'name',null,requestDeviceMarkListAll,null,null,"")}
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

const DeviceModelUpdateReduxForm = reduxForm({form: 'deviceModelUpdate', initialValues: {
    id:"",
    name:"",
    device_mark: ""
}})(DeviceModelForm)

const mapStateToProps = (state) => ({
    deviceMarkListAll: getDeviceMarkListAll(state),
    deviceModelItem: getDeviceModelItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state)
})

export default compose(
    connect(mapStateToProps, { getDeviceModelItem, updateDeviceModelItem, requestDeviceMarkListAll}),
    withRouter
)(DeviceModelUpdateContainer);