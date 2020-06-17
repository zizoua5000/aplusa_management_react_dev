import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input,Dropdown} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createVehicle,requestVehicleTypeList,requestVehicleModelList} from "../../redux/Reducers/vehicleList_reducer";
import {getIsCreated,getVehicleMarkList, getIsFetching,getCurrentPage,getVehicleModelList,getVehicleTypeList,getSetErrorMessage} from '../../redux/Selectors/vehicleList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class VehicleCreateContainer extends React.Component {
    // componentDidMount() {
    //     this.props.requestVehicleTypeList();        
    //     this.props.requestVehicleModelList();
    //     }

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
            {this.props.isFetching && this.props.vehicleModelList==null&&
                    this.props.vehicleTypeList==null && <Preloader /> }
            {this.props.setErrorMessage && <ErrorMessage />}     
            {this.props.vehicleModelList!=null && this.props.vehicleTypeList!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Create Vehicle</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <VehicleCreateReduxForm onSubmit={this.onSubmit} vehicleModelOptions={this.props.vehicleModelList} 
                    vehicleModelFunction = {this.props.requestVehicleModelList} vehicleTypeOptions={this.props.vehicleTypeList}  vehicleTypeFunction = {this.props.requestVehicleTypeList}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const VehicleForm= ({handleSubmit, error,vehicleModelOptions,vehicleTypeOptions, vehicleTypeFunction,vehicleModelFunction}) => {

    // initialValues.vehicle_model=vehicleModelOptions[0].id
    // initialValues.vehicle_type=vehicleTypeOptions[0].id
    return (
        <form onSubmit={handleSubmit}>
            {createField('Plate', 'plate',[required],Input,'Plate')}
            {createField('Serie Number', 'serie_number',[],Input,'Serie Number')}
            {createField('Vehicle Model', 'vehicle_model', [required], Dropdown,'Vehicle Model',vehicleModelOptions,'name',null,vehicleModelFunction,null,"")}
            {createField('Vehicle Type', 'vehicle_type', [required], Dropdown,'Vehicle Type',vehicleTypeOptions,'name',null,vehicleTypeFunction,null,"")}
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
    vehicleMarkList: getVehicleMarkList(state),
    vehicleModelList: getVehicleModelList(state),
    vehicleTypeList: getVehicleTypeList(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state)
})

export default connect(mapStateToProps, {createVehicle,requestVehicleTypeList,requestVehicleModelList})(VehicleCreateContainer);