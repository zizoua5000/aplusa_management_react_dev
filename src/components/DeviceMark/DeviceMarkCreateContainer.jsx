import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createDeviceMark,requestDeviceMarkList} from "../../redux/Reducers/deviceMarkList_reducer";
import {getIsCreated, getCurrentPage, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/deviceMarkList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class DeviceMarkCreateContainer extends React.Component {

    componentDidMount() {
        this.props.requestDeviceMarkList();
    }

    onSubmit = (formData) => {
        this.props.createDeviceMark(formData);
    }

    render() {
        console.log(this.props.setErrorMessage)
        if (this.props.isCreated) {
            return <Redirect to={`/device_mark/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.deviceMarkList==null&& <Preloader /> }
            {this.props.setErrorMessage ? <ErrorMessage /> : null}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Create Device Mark</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <DeviceMarkCreateReduxForm onSubmit={this.onSubmit} options={this.props.deviceMarkList}/>
                    </div>
                </div>
            </div>
        );
    }
}

const DeviceMarkForm= ({handleSubmit, error, options}) => {

    return (
        <form onSubmit={handleSubmit}>
            {createField('Name', 'name',[required],Input,'Name')}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}   
            <div>
                <button className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

const DeviceMarkCreateReduxForm = reduxForm({form: 'deviceMarkCreate'})(DeviceMarkForm)

const mapStateToProps = (state) => ({
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state),
})

export default connect(mapStateToProps, {createDeviceMark,requestDeviceMarkList})(DeviceMarkCreateContainer);