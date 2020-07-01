import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input,Dropdown} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createVehicle,requestVehicleTypeListAll,requestVehicleModelListAll} from "../../redux/Reducers/vehicleList_reducer";
import {getIsCreated,getVehicleMarkListAll, getIsFetching,getCurrentPage,getVehicleModelListAll,getVehicleTypeListAll,getSetErrorMessage} from '../../redux/Selectors/vehicleList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class VehicleCreateContainer extends React.Component {

    onSubmit = (formData) => {
        console.log(formData)
        this.props.createVehicle(formData);
    }

    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/vehicle/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.vehicleModelListAll==null&&
                    this.props.vehicleTypeListAll==null && <Preloader /> }
            {this.props.setErrorMessage && <ErrorMessage />}     
            {this.props.vehicleModelListAll!=null && this.props.vehicleTypeListAll!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Create Vehicle</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <VehicleCreateReduxForm onSubmit={this.onSubmit} vehicleModelListAll={this.props.vehicleModelListAll} 
                    requestVehicleModelListAll = {this.props.requestVehicleModelListAll} vehicleTypeListAll={this.props.vehicleTypeListAll}  requestVehicleTypeListAll = {this.props.requestVehicleTypeListAll}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const VehicleForm= ({handleSubmit, error,vehicleModelListAll,vehicleTypeListAll, requestVehicleTypeListAll,requestVehicleModelListAll}) => {

    // initialValues.vehicle_model=vehicleModelOptions[0].id
    // initialValues.vehicle_type=vehicleTypeOptions[0].id
    return (
        <form onSubmit={handleSubmit}>
            {createField('Plate', 'plate',[required],Input,'Plate')}
            {createField('Serie Number', 'serie_number',[],Input,'Serie Number')}
            {createField('Vehicle Model', 'vehicle_model', [required], Dropdown,'Vehicle Model',vehicleModelListAll,'name',null,requestVehicleModelListAll,null,null,"")}
            {createField('Vehicle Type', 'vehicle_type', [required], Dropdown,'Vehicle Type',vehicleTypeListAll,'name',null,requestVehicleTypeListAll,null,null,"")}
            {createField('Comment', 'comment',[],Input,'Comment')}
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

const VehicleCreateReduxForm = reduxForm({form: 'vehicleCreate', initialValues: {
    vehicle_mark: "",
    vehicle_model: "",
    vehicle_type: "",
    serie_number:"",
    comment:"",
}})(VehicleForm)

const mapStateToProps = (state) => ({
    vehicleMarkListAll: getVehicleMarkListAll(state),
    vehicleModelListAll: getVehicleModelListAll(state),
    vehicleTypeListAll: getVehicleTypeListAll(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state)
})

export default connect(mapStateToProps, {createVehicle,requestVehicleTypeListAll,requestVehicleModelListAll})(VehicleCreateContainer);