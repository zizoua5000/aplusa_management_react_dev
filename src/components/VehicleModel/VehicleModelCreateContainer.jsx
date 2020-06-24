import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input, Dropdown} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createVehicleModel, requestVehicleMarkListAll} from "../../redux/Reducers/vehicleModelList_reducer";
import {getIsCreated,getVehicleMarkListAll, getIsFetching,getCurrentPage} from '../../redux/Selectors/vehicleModelList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';

class VehicleModelCreateContainer extends React.Component {

    onSubmit = (formData) => {
        this.props.createVehicleModel(formData);
    }

    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/vehicle_model/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.vehicleMarkList==null? <Preloader /> : null }
            {this.props.vehicleMarkListAll!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Create Vehicle Model</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <VehicleModelCreateReduxForm onSubmit={this.onSubmit} vehicleMarkListAll={this.props.vehicleMarkListAll} requestVehicleMarkAll={this.props.requestVehicleMarkListAll}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const VehicleModelForm= ({handleSubmit, error, vehicleMarkListAll, initialValues,requestVehicleMarkAll}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Name', 'name',[required],Input,'Name')}
            {createField("Vehicle Mark", 'vehicle_mark', [required], Dropdown,'Vehicle Mark',vehicleMarkListAll,'name',null,requestVehicleMarkAll,null,"")}
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
    vehicleMarkListAll: getVehicleMarkListAll(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state)
})

export default connect(mapStateToProps, {createVehicleModel, requestVehicleMarkListAll})(VehicleModelCreateContainer);