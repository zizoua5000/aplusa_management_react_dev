import React , { useState } from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {required} from "../../utils/validators/validators";
import {custom_success_alert} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import {compose} from "redux";
import {createField, Input, Select} from "../Common/FormsControls/FormsControls";
import {getVehicleModelItem,updateVehicleModelItem, requestVehicleMarkList} from "../../redux/Reducers/vehicleModelList_reducer";
import {getIsCreated, getVehicleModelItemSel, getVehicleMarkList, getIsFetching, getCurrentPage} from '../../redux/Selectors/vehicleModelList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';

class VehicleModelUpdateContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.requestVehicleMarkList();
        console.log("Vehicle Model UPDATE DIDMOUNT")
        this.props.getVehicleModelItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateVehicleModelItem(formData);
    }
 
    render() {
        console.log(this.props.VehicleModelItem)

        if (this.props.isCreated) {
            custom_success_alert();
            return <Redirect to={`/vehicle_model/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.vehicleMarkList==null && this.props.vehicleModelItem==null? <Preloader /> : null }
            {this.props.vehicleMarkList!=null && this.props.vehicleModelItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Update Vehicle Model</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <VehicleModelUpdateReduxForm onSubmit={this.onSubmit} options={this.props.vehicleMarkList} instance={this.props.vehicleModelItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const VehicleModelForm= ({handleSubmit, error, options, instance, initialValues}) => {
    initialValues.id=instance.id
    initialValues.name=instance.name
    initialValues.vehicle_mark=instance.vehicle_mark
    return (
        <form onSubmit={handleSubmit}>
            {createField(null, 'id',[required],Input,null,null,'hidden')}
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

const VehicleModelUpdateReduxForm = reduxForm({form: 'vehicleModelUpdate', initialValues: {
    id:"",
    name:"",
    vehicle_mark: ""
}})(VehicleModelForm)

const mapStateToProps = (state) => ({
    vehicleMarkList: getVehicleMarkList(state),
    vehicleModelItem: getVehicleModelItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state)
})

export default compose(
    connect(mapStateToProps, { getVehicleModelItem, updateVehicleModelItem, requestVehicleMarkList}),
    withRouter
)(VehicleModelUpdateContainer);