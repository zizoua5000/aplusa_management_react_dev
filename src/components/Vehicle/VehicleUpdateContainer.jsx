import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {required} from "../../utils/validators/validators";
import {compose} from "redux";
import {createField, Input,Dropdown} from "../Common/FormsControls/FormsControls";
import {getVehicleItem,updateVehicleItem,requestVehicleModelList,requestVehicleTypeList} from "../../redux/Reducers/vehicleList_reducer";
import {getIsCreated, getVehicleItemSel,getVehicleModelList,getVehicleTypeList, getIsFetching,getSetErrorMessage, getCurrentPage} from '../../redux/Selectors/vehicleList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class VehicleUpdateContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;        
        this.props.getVehicleItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateVehicleItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/vehicle/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.vehicleMarkList==null && this.props.vehicleItem==null&& <Preloader />  }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.vehicleTypeList!=null&&this.props.vehicleModelList!=null&&this.props.vehicleItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Update Vehicle</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <VehicleUpdateReduxForm onSubmit={this.onSubmit}  vehicleModelOptions={this.props.vehicleModelList} vehicleModelFunction={this.props.requestVehicleModelList} 
                        vehicleTypeOptions={this.props.vehicleTypeList} vehicleTypeFunction={this.props.requestVehicleTypeList} instance={this.props.vehicleItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const VehicleForm= ({handleSubmit, error, vehicleModelOptions,vehicleTypeOptions,vehicleModelFunction,vehicleTypeFunction, instance, initialValues}) => {
    console.log(instance)
    initialValues.id=instance.id
    initialValues.plate=instance.plate
    initialValues.serie_number = instance.serie_number
    initialValues.vehicle_model=instance.vehicle_model_detail.name    
    initialValues.vehicle_type=instance.vehicle_type_detail.name    
    initialValues.comment = instance.comment
    return (
        <form onSubmit={handleSubmit}>
            {createField('Plate', 'plate',[required],Input,'Plate')}
            {createField('Serie Number', 'serie_number',[required],Input,'Serie Number')}
            {createField("Vehicle Model", 'vehicle_model', [required], Dropdown,'Vehicle Model',vehicleModelOptions,'name',null,vehicleModelFunction,null,"")}
            {createField("Vehicle Type", 'vehicle_type', [required], Dropdown,'Vehicle Type',vehicleTypeOptions,'name',null,vehicleTypeFunction,null,"")}
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

const VehicleUpdateReduxForm = reduxForm({form: 'vehicleUpdate', initialValues: {
    id:"",
    plate:"",
    serie_number:"",
    vehicle_model: "",
    vehicle_mark: "",
    vehicle_type: "",
    comment:"",

}})(VehicleForm)

const mapStateToProps = (state) => ({
    vehicleModelList: getVehicleModelList(state),
    vehicleTypeList: getVehicleTypeList(state),
    vehicleItem: getVehicleItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state)

})

export default compose(
    connect(mapStateToProps, { getVehicleItem, updateVehicleItem,requestVehicleModelList,requestVehicleTypeList}),
    withRouter
)(VehicleUpdateContainer);