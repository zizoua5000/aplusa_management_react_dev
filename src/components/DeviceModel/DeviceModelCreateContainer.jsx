import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input, Dropdown} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createDeviceModel, requestDeviceMarkListAll} from "../../redux/Reducers/deviceModelList_reducer";
import {getIsCreated,getDeviceMarkListAll, getIsFetching,getCurrentPage} from '../../redux/Selectors/deviceModelList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';

class DeviceModelCreateContainer extends React.Component {

    onSubmit = (formData) => {
        this.props.createDeviceModel(formData);
    }

    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/device_model/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.deviceMarkList==null? <Preloader /> : null }
            {this.props.deviceMarkListAll!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Create Device Model</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <DeviceModelCreateReduxForm onSubmit={this.onSubmit} deviceMarkListAll={this.props.deviceMarkListAll} requestDeviceMarkAll={this.props.requestDeviceMarkListAll}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const DeviceModelForm= ({handleSubmit, error, deviceMarkListAll, initialValues,requestDeviceMarkAll}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Name', 'name',[required],Input,'Name')}
            {createField("Device Mark", 'device_mark', [required], Dropdown,'Device Mark',deviceMarkListAll,'name',null,requestDeviceMarkAll,null,null,"")}
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

const DeviceModelCreateReduxForm = reduxForm({form: 'deviceModelCreate', initialValues: {
    device_mark: ""
}})(DeviceModelForm)

const mapStateToProps = (state) => ({
    deviceMarkListAll: getDeviceMarkListAll(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state)
})

export default connect(mapStateToProps, {createDeviceModel, requestDeviceMarkListAll})(DeviceModelCreateContainer);