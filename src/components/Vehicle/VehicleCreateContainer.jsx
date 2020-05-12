import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input, Select} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createVehicle, requestVehicleMarkList,requestVehicleTypeList,requestVehicleModelList} from "../../redux/Reducers/vehicleList_reducer";
import {getIsCreated,getVehicleMarkList, getIsFetching,getCurrentPage,getVehicleModelList,getVehicleTypeList,getSetErrorMessage} from '../../redux/Selectors/vehicleList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class VehicleCreateContainer extends React.Component {
    componentDidMount() {
        console.log("DID MOUNT")
        this.props.requestVehicleMarkList();
        this.props.requestVehicleTypeList();        
        this.props.requestVehicleModelList();
        }

    onSubmit = (formData) => {
        console.log(formData)
        this.props.createVehicle(formData);
    }

    render() {
        console.log("PROPS",this.props)
        if (this.props.isCreated) {
            return <Redirect to={`/vehicle/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.vehicleMarkList==null&&this.props.vehicleModelList==null&&
                    this.props.vehicleTypeList==null && <Preloader /> }
            {this.props.setErrorMessage && <ErrorMessage />}     
            {this.props.vehicleMarkList!=null && this.props.vehicleModelList!=null &&
                    this.props.vehicleTypeList!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Create Vehicle</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <VehicleCreateReduxForm onSubmit={this.onSubmit} vehicleMarkOptions={this.props.vehicleMarkList}  
                        vehicleModelOptions={this.props.vehicleModelList} vehicleTypeOptions={this.props.vehicleTypeList}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const VehicleForm= ({handleSubmit, error, vehicleMarkOptions,vehicleModelOptions,vehicleTypeOptions, initialValues}) => {
    console.log("INITIAL VALUES ",initialValues)
    console.log("VEHICLE MARK OPTIONS ",vehicleMarkOptions)
    initialValues.vehicle_mark=vehicleMarkOptions[0].id
    initialValues.vehicle_model=vehicleModelOptions[0].id
    initialValues.vehicle_type=vehicleTypeOptions[0].id
    return (
        <form onSubmit={handleSubmit}>
            {createField('Plate', 'plate',[required],Input,'Plate')}
            {createField('Serie Number', 'serie_number',[],Input,'Serie Number')}
            {createField('Vehicle Model', 'vehicle_model', [required], Select,null,vehicleModelOptions)}
            {createField('Vehicle Mark', 'vehicle_mark', [required], Select,null,vehicleMarkOptions)}
            {createField('Vehicle Type', 'vehicle_type', [required], Select,null,vehicleTypeOptions)}
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

export default connect(mapStateToProps, {createVehicle, requestVehicleMarkList,requestVehicleTypeList,requestVehicleModelList})(VehicleCreateContainer);