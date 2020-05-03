import React , { useState } from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {createField, Input, ToggleStatus,ToggleRouming} from "../Common/FormsControls/FormsControls";
import {required} from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {createSimcard} from '../../redux/Reducers/simcardList_reducer';
import {custom_success_alert} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import {getIsCreated, getIsFetching,getSetErrorMessage,getCurrentPage} from '../../redux/Selectors/simcardList_selectors';
import {Redirect} from 'react-router-dom';
import style from '../Common/FormsControls/FormsControls.module.css';
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'
// import {AppStateType} from '../../redux/redux-store';

class SimcardCreateContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     this.props.requestsimcardList();
    // }

    onSubmit = (formData) => {
        if(formData.is_active==null){
            formData.is_active=true;
        }
        if(formData.has_roumnig==null){
            formData.has_roumnig=false;
        }
        this.props.createSimcard(formData);
        console.log(formData)
        
    }

    render() {
        // console.log(this.props.setErrorMessage)
        if (this.props.isCreated) {
            console.log("SIMCARD CREATE CONTAINER")
            // custom_success_alert();
            return <Redirect to={`/simcard/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.simcardList==null? <Preloader /> : null }
            {this.props.setErrorMessage ? <ErrorMessage /> : null}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Create Simcard</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <SimcardCreateReduxForm onSubmit={this.onSubmit} options={this.props.simcardList}/>
                    </div>
                </div>
            </div>
        );
    }
}

const SimcardForm= ({handleSubmit, error}) => {

    return (
        <form onSubmit={handleSubmit}>
            {createField('Simcard', 'number',[required],Input,'Simcard')}
            {createField('Package', 'package',[required],Input,'Package')}
            {createField('Rouming', 'has_roumnig',[],ToggleRouming,'Rouming',null,'checkbox')}
            {createField('Status', 'is_active',[],ToggleStatus,'Status',null,'checkbox')}    
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}   
            <div>
                <button className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

const SimcardCreateReduxForm = reduxForm({form: 'simcardCreate'})(SimcardForm)

const mapStateToProps = (state) => ({
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state),
    currentPage:getCurrentPage(state)
})

export default connect(mapStateToProps, {createSimcard})(SimcardCreateContainer);