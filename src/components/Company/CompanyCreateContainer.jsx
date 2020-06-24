import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input,Dropdown} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createCompany,requestCompanyTypeList,requestCompanyListAll} from "../../redux/Reducers/companyList_reducer";
import {getIsCreated, getIsFetching,getCurrentPage,getCompanyTypeList,getCompanyListAll,getSetErrorMessage} from '../../redux/Selectors/companyList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class CompanyCreateContainer extends React.Component {

    onSubmit = (formData) => {
        this.props.createCompany(formData);
    }

    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/company/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching &&
                    this.props.companyTypeList==null && <Preloader /> }
            {this.props.setErrorMessage && <ErrorMessage />}     
            {this.props.companyTypeList!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Create Company</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <CompanyCreateReduxForm onSubmit={this.onSubmit}
                    companyTypeListOptions={this.props.companyTypeList}  requestCompanyTypeList = {this.props.requestCompanyTypeList}
                    companyListAllOptions={this.props.companyListAll}  requestCompanyListAll = {this.props.requestCompanyListAll}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const CompanyForm= ({handleSubmit, error,companyTypeListOptions,companyListAllOptions, requestCompanyTypeList,requestCompanyListAll}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Name', 'name',[required],Input,'Name')}
            {createField('Main Company', 'main_company', [required], Dropdown,'Main Company',companyListAllOptions,'name',null,requestCompanyListAll,null,"")}
            {createField('Company Type', 'company_type', [required], Dropdown,'Company Type',companyTypeListOptions,'name',null,requestCompanyTypeList,null,"")}
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

const CompanyCreateReduxForm = reduxForm({form: 'companyCreate', initialValues: {
    name: "",
    main_company: "",
    company_type: "",

}})(CompanyForm)

const mapStateToProps = (state) => ({
    companyListAll: getCompanyListAll(state),
    companyTypeList: getCompanyTypeList(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state)
})

export default connect(mapStateToProps, {createCompany,requestCompanyTypeList,requestCompanyListAll})(CompanyCreateContainer);