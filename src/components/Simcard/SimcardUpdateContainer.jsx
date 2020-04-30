import React , { useState } from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {createField, Input, Select} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {getSimcardItem,updateSimcardItem} from "../../redux/Reducers/simcardList_reducer";
import {getIsCreated, getSimcardItemSel, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/simcardList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';
// import {AppStateType} from '../../redux/redux-store';

class SimcardUpdateContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        console.log("DIDIDDIIDIDIDIDIDI")
        this.props.getSimcardItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateSimcardItem(formData);
    }
 
    render() {
        console.log(this.props.simcardItem)
        if (this.props.isCreated) {
            return <Redirect to={"/simcard"}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.simcardItem==null? <Preloader /> : null }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.simcardItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Update Simcard</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <SimcardUpdateReduxForm onSubmit={this.onSubmit} instance={this.props.simcardItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const SimcardForm= ({handleSubmit, error,instance, initialValues}) => {
    initialValues.id=instance.id
    initialValues.number=instance.number
    initialValues.package=instance.package
    initialValues.is_active=instance.is_active
    initialValues.has_roumnig=instance.has_roumnig
    return (
        <form onSubmit={handleSubmit}>
            {createField(null, 'id',[required],Input,null,null,'hidden')}
            {createField('Simcard', 'number',[required],Input,'Simcard')}
            {createField('Package', 'package',[required],Input,'Package')}
            {createField('Status', 'is_active',[required],Input,'Status')}
            {createField('Rouming', 'has_roumnig',[required],Input,'Rouming')}
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

const SimcardUpdateReduxForm = reduxForm({form: 'simcardUpdate', initialValues: {
    id:"",
    name:"",
}})(SimcardForm)

const mapStateToProps = (state) => ({
    simcardItem: getSimcardItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state)
})

// export default connect(mapStateToProps, { getVehicleModelItem, updateVehicleModelItem, requestVehicleMarkList})(VehicleModelUpdateContainer);

export default compose(
    connect(mapStateToProps, { getSimcardItem, updateSimcardItem}),
    withRouter
)(SimcardUpdateContainer);