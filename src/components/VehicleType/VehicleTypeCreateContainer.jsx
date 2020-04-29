import React , { useState } from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input, Select} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createVehicleType} from "../../redux/Reducers/vehicleTypeList_reducer";
import {getIsCreated, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/vehicleTypeList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'
// import {AppStateType} from '../../redux/redux-store';

class VehicleTypeCreateContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     this.props.requestVehicleTypeList();
    // }

    onSubmit = (formData) => {
        this.props.createVehicleType(formData);
    }

    render() {
        console.log(this.props.setErrorMessage)
        if (this.props.isCreated) {
            return <Redirect to={"/vehicle_type"}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.vehicleTypeList==null? <Preloader /> : null }
            {this.props.setErrorMessage ? <ErrorMessage /> : null}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Create Vehicle Type</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <VehicleTypeCreateReduxForm onSubmit={this.onSubmit} options={this.props.vehicleTypeList}/>
                    </div>
                </div>
            </div>
        );
    }
}

const VehicleTypeForm= ({handleSubmit, error, options}) => {

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

const VehicleTypeCreateReduxForm = reduxForm({form: 'vehicleTypeCreate'})(VehicleTypeForm)

const mapStateToProps = (state) => ({
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state),
})

export default connect(mapStateToProps, {createVehicleType})(VehicleTypeCreateContainer);