import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {getVehicleTypeItem,updateVehicleTypeItem} from "../../redux/Reducers/vehicleTypeList_reducer";
import {getIsCreated, getCurrentPage,getVehicleTypeItemSel, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/vehicleTypeList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';

class VehicleTypeUpdateContainer extends React.Component {
 
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getVehicleTypeItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateVehicleTypeItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/vehicle_type/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.vehicleTypeItem==null? <Preloader /> : null }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.vehicleTypeItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Update Vehicle Type</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <VehicleTypeUpdateReduxForm onSubmit={this.onSubmit} instance={this.props.vehicleTypeItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const VehicleTypeForm= ({handleSubmit, error,instance, initialValues}) => {
    initialValues.id=instance.id
    initialValues.name=instance.name
    return (
        <form onSubmit={handleSubmit}>
            {createField('Name', 'name',[required],Input,'Name')}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

const VehicleTypeUpdateReduxForm = reduxForm({form: 'vehicleTypeUpdate', initialValues: {
    id:"",
    name:"",
}})(VehicleTypeForm)

const mapStateToProps = (state) => ({
    vehicleTypeItem: getVehicleTypeItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state),
    currentPage:getCurrentPage(state),
});

export default compose(
    connect(mapStateToProps, { getVehicleTypeItem, updateVehicleTypeItem}),
    withRouter
)(VehicleTypeUpdateContainer);