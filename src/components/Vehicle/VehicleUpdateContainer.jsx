import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {required} from "../../utils/validators/validators";
import {compose} from "redux";
import {createField, Input, Select} from "../Common/FormsControls/FormsControls";
import {getVehicleItem,updateVehicleItem,requestVehicleModelList, requestVehicleMarkList,requestVehicleTypeList} from "../../redux/Reducers/vehicleList_reducer";
import {getIsCreated, getVehicleItemSel,getVehicleModelList, getVehicleMarkList,getVehicleTypeList, getIsFetching,getSetErrorMessage, getCurrentPage} from '../../redux/Selectors/vehicleList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class VehicleUpdateContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;        
        this.props.requestVehicleMarkList();
        this.props.requestVehicleTypeList();
        this.props.requestVehicleModelList();
        this.props.getVehicleItem(id);
    }

    onSubmit = (formData) => {
        console.log(formData)
        this.props.updateVehicleItem(formData);
    }
 
    render() {
        console.log("PROPS ",this.props)

        if (this.props.isCreated) {
            return <Redirect to={`/vehicle/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.vehicleMarkList==null && this.props.vehicleItem==null&& <Preloader />  }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.vehicleMarkList!=null&&this.props.vehicleTypeList!=null&&this.props.vehicleModelList!=null&&this.props.vehicleItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Update Vehicle</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <VehicleUpdateReduxForm onSubmit={this.onSubmit} vehicleMarkOptions={this.props.vehicleMarkList}  vehicleModelOptions={this.props.vehicleModelList} 
                        vehicleTypeOptions={this.props.vehicleTypeList} instance={this.props.vehicleItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const VehicleForm= ({handleSubmit, error, vehicleModelOptions,vehicleMarkOptions,vehicleTypeOptions, instance, initialValues}) => {

    console.log("INSTANCE ",instance)
    initialValues.id=instance.id
    initialValues.plate=instance.plate
    initialValues.serie_number = instance.serie_number
    initialValues.vehicle_model=instance.vehicle_model
    initialValues.vehicle_mark=instance.vehicle_model_detail.vehicle_mark
    initialValues.vehicle_type=instance.vehicle_type
    initialValues.comment = instance.comment
    console.log("INITIAL Values ",initialValues)
    return (
        <form onSubmit={handleSubmit}>
            {createField(null, 'id',[required],Input,null,null,'hidden')}
            {createField('Plate', 'plate',[required],Input,'Plate')}
            {createField('Serie Number', 'serie_number',[required],Input,'Serie Number')}
            {createField("Vehicle Model", 'vehicle_model', [required], Select,null,vehicleModelOptions)}
            {createField("Vehicle Mark", 'vehicle_mark', [required], Select,null,vehicleMarkOptions)}
            {createField("Vehicle Type", 'vehicle_type', [required], Select,null,vehicleTypeOptions)}
            {createField('Comment', 'comment',[required],Input,'Comment')}
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
    vehicleMarkList: getVehicleMarkList(state),
    vehicleTypeList: getVehicleTypeList(state),
    vehicleItem: getVehicleItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state)

})

export default compose(
    connect(mapStateToProps, { getVehicleItem, updateVehicleItem,requestVehicleModelList, requestVehicleMarkList,requestVehicleTypeList}),
    withRouter
)(VehicleUpdateContainer);