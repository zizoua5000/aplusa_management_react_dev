import React from 'react';
import {reduxForm} from 'redux-form';
import {createField, Input, Toggle} from "../Common/FormsControls/FormsControls";
import {required} from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {createSimcard} from '../../redux/Reducers/simcardList_reducer';
import {getIsCreated, getIsFetching,getSetErrorMessage,getCurrentPage} from '../../redux/Selectors/simcardList_selectors';
import {Redirect} from 'react-router-dom';
import style from '../Common/FormsControls/FormsControls.module.css';
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class SimcardCreateContainer extends React.Component {

    onSubmit = (formData) => {
        console.log(formData)

        if(formData.is_active==null){
            formData.is_active=true;
        }
        if(formData.has_rouming==null){
            formData.has_rouming=false;
        }
        this.props.createSimcard(formData);        
    }

    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/simcard/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.simcardList==null&& <Preloader />}
            {this.props.setErrorMessage && <ErrorMessage />}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Create Simcard</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <SimcardCreateReduxForm onSubmit={this.onSubmit} />
                    </div>
                </div>
            </div>
        );
    }
}

const SimcardForm= ({handleSubmit, error,initialValues}) => {
    initialValues.has_rouming=false;
    initialValues.is_active=true;
    return (
        <form onSubmit={handleSubmit}>
            {createField('Simcard', 'number',[required],Input,'Simcard')}
            {createField('Package', 'package',[required],Input,'Package')}
            {createField('Rouming', 'has_rouming',[],Toggle,'Rouming',null,null,'checkbox')}
            {createField('Acive', 'is_active',[],Toggle,'Active',null,null,'checkbox')}    
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}   
            <div>
                <button className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

const SimcardCreateReduxForm = reduxForm({form: 'simcardCreate',initialValues: {
    has_rouming: "",
    is_active:""
}})(SimcardForm)

const mapStateToProps = (state) => ({
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state),
    currentPage:getCurrentPage(state)
})

export default connect(mapStateToProps, {createSimcard})(SimcardCreateContainer);