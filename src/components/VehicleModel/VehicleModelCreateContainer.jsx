import React , { useState } from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input, Select} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createVehicleModel, requestVehicleMarkList} from "../../redux/Reducers/vehicleModelList_reducer";
import {getIsCreated,getVehicleMarkList, getIsFetching} from '../../redux/Selectors/vehicleModelList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
// import {AppStateType} from '../../redux/redux-store';

class VehicleModelCreateContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.requestVehicleMarkList();
    }

    onSubmit = (formData) => {
        this.props.createVehicleModel(formData);
    }

    render() {
        if (this.props.isCreated) {
            return <Redirect to={"/vehicle_model"}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.vehicleMarkList==null? <Preloader /> : null }
            {this.props.vehicleMarkList!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Create Vehicle Model</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <VehicleModelCreateReduxForm onSubmit={this.onSubmit} options={this.props.vehicleMarkList}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const VehicleModelForm= ({handleSubmit, error, options, initialValues}) => {
    initialValues.vehicle_mark=options[0].id
    return (
        <form onSubmit={handleSubmit}>
            {createField('Name', 'name',[required],Input,'Name')}
            {createField("Vehicle Mark", 'vehicle_mark', [required], Select,null,options)}
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

const VehicleModelCreateReduxForm = reduxForm({form: 'vehicleModelCreate', initialValues: {
    vehicle_mark: ""
}})(VehicleModelForm)

const mapStateToProps = (state) => ({
    vehicleMarkList: getVehicleMarkList(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state)
})

export default connect(mapStateToProps, {createVehicleModel, requestVehicleMarkList})(VehicleModelCreateContainer);