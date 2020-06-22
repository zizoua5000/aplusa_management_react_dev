import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {getCompanyTypeItem,updateCompanyTypeItem} from "../../redux/Reducers/companyTypeList_reducer";
import {getIsCreated, getCurrentPage,getCompanyTypeItemSel, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/companyTypeList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';

class CompanyTypeUpdateContainer extends React.Component {
 
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getCompanyTypeItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateCompanyTypeItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/company_type/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.companyTypeItem==null? <Preloader /> : null }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.companyTypeItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Update Company Type</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <CompanyTypeUpdateReduxForm onSubmit={this.onSubmit} instance={this.props.companyTypeItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const CompanyTypeForm= ({handleSubmit, error,instance, initialValues}) => {
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

const CompanyTypeUpdateReduxForm = reduxForm({form: 'companyTypeUpdate', initialValues: {
    id:"",
    name:"",
}})(CompanyTypeForm)

const mapStateToProps = (state) => ({
    companyTypeItem: getCompanyTypeItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state),
    currentPage:getCurrentPage(state),
});

export default compose(
    connect(mapStateToProps, { getCompanyTypeItem, updateCompanyTypeItem}),
    withRouter
)(CompanyTypeUpdateContainer);