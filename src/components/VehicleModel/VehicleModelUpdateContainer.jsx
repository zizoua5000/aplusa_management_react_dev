import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {required} from "../../utils/validators/validators";
import {compose} from "redux";
import {createField, Input, Dropdown} from "../Common/FormsControls/FormsControls";
import {getVehicleModelItem,updateVehicleModelItem, requestVehicleMarkListAll} from "../../redux/Reducers/vehicleModelList_reducer";
import {getIsCreated, getVehicleModelItemSel, getVehicleMarkListAll, getIsFetching, getCurrentPage} from '../../redux/Selectors/vehicleModelList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class VehicleModelUpdateContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;
        // this.props.requestVehicleMarkList();
        this.props.getVehicleModelItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateVehicleModelItem(formData);
    }
 
    render() {
        console.log(this.props.VehicleModelItem)

        if (this.props.isCreated) {
            return <Redirect to={`/vehicle_model/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.vehicleMarkListAll==null && this.props.vehicleModelItem==null&& <Preloader /> }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.vehicleMarkListAll!=null && this.props.vehicleModelItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Update Vehicle Model</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <VehicleModelUpdateReduxForm onSubmit={this.onSubmit} vehicleMarkListAll={this.props.vehicleMarkListAll} instance={this.props.vehicleModelItem} requestVehicleMarkListAll={this.props.requestVehicleMarkListAll}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const VehicleModelForm= ({handleSubmit, error, vehicleMarkListAll, instance, initialValues,requestVehicleMarkListAll}) => {
    initialValues.id=instance.id
    initialValues.name=instance.name
    initialValues.vehicle_mark=instance.vehicle_mark_detail.name
    console.log(instance)
    return (
        <form onSubmit={handleSubmit}>
            {createField('Name', 'name',[required],Input,'Name')}
            {createField("Vehicle Mark", 'vehicle_mark', [required], Dropdown,'Vehicle Mark',vehicleMarkListAll,'name',null,requestVehicleMarkListAll,null,null,"")}
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
    vehicleMarkListAll: getVehicleMarkListAll(state),
    vehicleModelItem: getVehicleModelItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state)
})

export default compose(
    connect(mapStateToProps, { getVehicleModelItem, updateVehicleModelItem, requestVehicleMarkListAll}),
    withRouter
)(VehicleModelUpdateContainer);