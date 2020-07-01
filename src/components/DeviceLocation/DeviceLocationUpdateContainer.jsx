import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {getDeviceLocationItem,updateDeviceLocationItem} from "../../redux/Reducers/deviceLocationList_reducer";
import {getIsCreated, getCurrentPage,getDeviceLocationItemSel, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/deviceLocationList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';

class DeviceLocationUpdateContainer extends React.Component {
 
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getDeviceLocationItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateDeviceLocationItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/device_location/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.deviceLocationItem==null? <Preloader /> : null }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.deviceLocationItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Update Device Location</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <DeviceLocationUpdateReduxForm onSubmit={this.onSubmit} instance={this.props.deviceLocationItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const DeviceLocationForm= ({handleSubmit, error,instance, initialValues}) => {
    initialValues.id=instance.id
    initialValues.name=instance.name
    return (
        <form onSubmit={handleSubmit}>
            {createField('Name', 'name',[required],Input,'Name')}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

const DeviceLocationUpdateReduxForm = reduxForm({form: 'deviceLocationUpdate', initialValues: {
    id:"",
    name:"",
}})(DeviceLocationForm)

const mapStateToProps = (state) => ({
    deviceLocationItem: getDeviceLocationItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state),
    currentPage:getCurrentPage(state),
});

export default compose(
    connect(mapStateToProps, { getDeviceLocationItem, updateDeviceLocationItem}),
    withRouter
)(DeviceLocationUpdateContainer);