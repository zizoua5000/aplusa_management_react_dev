import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {required} from "../../utils/validators/validators";
import {compose} from "redux";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {getVehicleMarkItem,updateVehicleMarkItem} from "../../redux/Reducers/vehicleMarkList_reducer";
import {getIsCreated, getVehicleMarkItemSel, getIsFetching, getCurrentPage} from '../../redux/Selectors/vehicleMarkList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';

class VehicleMarkUpdateContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getVehicleMarkItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateVehicleMarkItem(formData);
    }
 
    render() {
        console.log(this.props.vehicleMarkItem)

        if (this.props.isCreated) {
            return <Redirect to={`/vehicle_mark/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.vehicleMarkItem==null? <Preloader /> : null }
            {this.props.vehicleMarkItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Update Vehicle Mark</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <VehicleMarkUpdateReduxForm onSubmit={this.onSubmit} instance={this.props.vehicleMarkItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const VehicleMarkForm= ({handleSubmit, error, instance, initialValues}) => {
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
                <button className="btn btn-info">Submit</button>
            </div>
        </form>
    )
}

const VehicleMarkUpdateReduxForm = reduxForm({form: 'vehicleMarkUpdate', initialValues: {
    id:"",
    name: ""
}})(VehicleMarkForm)

const mapStateToProps = (state) => ({
    vehicleMarkItem: getVehicleMarkItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state)
})

export default compose(
    connect(mapStateToProps, { getVehicleMarkItem, updateVehicleMarkItem}),
    withRouter
)(VehicleMarkUpdateContainer);