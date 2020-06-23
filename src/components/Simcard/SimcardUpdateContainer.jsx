import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {createField, Input, Toggle} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {getSimcardItem,updateSimcardItem} from "../../redux/Reducers/simcardList_reducer";
import {getIsCreated, getSimcardItemSel, getIsFetching,getSetErrorMessage,getCurrentPage} from '../../redux/Selectors/simcardList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';

class SimcardUpdateContainer extends React.Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getSimcardItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateSimcardItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/simcard/${this.props.currentPage}`}/>
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
    initialValues.has_rouming=instance.has_rouming
    initialValues.is_active=instance.is_active
    return (
        <form onSubmit={handleSubmit}>
            {createField('Simcard', 'number',[required],Input,'Simcard')}
            {createField('Package', 'package',[required],Input,'Package')}
            {createField('Rouming', 'has_rouming',[],Toggle,'Rouming',null,null,'checkbox')}
            {createField('Active', 'is_active',[],Toggle,'Active',null,null,'checkbox')}            
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
    number:"",
    package:"",
    has_roumnig:"",
    is_active:"",
}})(SimcardForm)

const mapStateToProps = (state) => ({
    simcardItem: getSimcardItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state),
    currentPage:getCurrentPage(state),
    
})

export default compose(
    connect(mapStateToProps, { getSimcardItem, updateSimcardItem}),withRouter
)(SimcardUpdateContainer);