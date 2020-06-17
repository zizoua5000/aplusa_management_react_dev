import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createVehicleMark, requestVehicleMarkList} from "../../redux/Reducers/vehicleMarkList_reducer";
import {getIsCreated,getVehicleMarkList, getIsFetching,getCurrentPage} from '../../redux/Selectors/vehicleMarkList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class VehicleMarkCreateContainer extends React.Component {
    componentDidMount() {
        this.props.requestVehicleMarkList();
    }

    onSubmit = (formData) => {
        this.props.createVehicleMark(formData);
    }

    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/vehicle_mark/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.vehicleMarkList==null? <Preloader /> : null }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.vehicleMarkList!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Create Vehicle Mark</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <VehicleMarkCreateReduxForm onSubmit={this.onSubmit} options={this.props.vehicleMarkList}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const VehicleMarkForm= ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Name', 'name',[required],Input,'Name')}
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

const VehicleMarkCreateReduxForm = reduxForm({form: 'vehicleMarkCreate', initialValues: {
    name: ""
}})(VehicleMarkForm)

const mapStateToProps = (state) => ({
    vehicleMarkList: getVehicleMarkList(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state)
})

export default connect(mapStateToProps, {createVehicleMark, requestVehicleMarkList})(VehicleMarkCreateContainer);