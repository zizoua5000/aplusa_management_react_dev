import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {getDeviceMarkItem,updateDeviceMarkItem} from "../../redux/Reducers/deviceMarkList_reducer";
import {getIsCreated, getCurrentPage,getDeviceMarkItemSel, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/deviceMarkList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';

class DeviceMarkUpdateContainer extends React.Component {
 
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getDeviceMarkItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateDeviceMarkItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/device_mark/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.deviceMarkItem==null? <Preloader /> : null }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.deviceMarkItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Update Device Mark</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <DeviceMarkUpdateReduxForm onSubmit={this.onSubmit} instance={this.props.deviceMarkItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const DeviceMarkForm= ({handleSubmit, error,instance, initialValues}) => {
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

const DeviceMarkUpdateReduxForm = reduxForm({form: 'deviceMarkUpdate', initialValues: {
    id:"",
    name:"",
}})(DeviceMarkForm)

const mapStateToProps = (state) => ({
    deviceMarkItem: getDeviceMarkItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state),
    currentPage:getCurrentPage(state),
});

export default compose(
    connect(mapStateToProps, { getDeviceMarkItem, updateDeviceMarkItem}),
    withRouter
)(DeviceMarkUpdateContainer);