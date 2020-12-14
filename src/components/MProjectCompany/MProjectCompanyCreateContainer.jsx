import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input,Dropdown} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createMProjectCompany,requestProjectList,requestCompanyList,requestMProjectCompanyListAll} from "../../redux/Reducers/mProjectCompanyList_reducer";
import {getIsCreated, getIsFetching,getCurrentPage,getProjectList,getCompanyList,getMProjectCompanyListAll,getSetErrorMessage} from '../../redux/Selectors/mProjectCompanyList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class MProjectCompanyCreateContainer extends React.Component {

    onSubmit = (formData) => {
        this.props.createMProjectCompany(formData);
    }

    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/m_project_company/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching &&
                    this.props.projectList==null && <Preloader /> }
            {this.props.setErrorMessage && <ErrorMessage />}     
            {this.props.projectList!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Create Project-Company</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <MProjectCompanyCreateReduxForm onSubmit={this.onSubmit}
                    projectListOptions={this.props.projectList}  requestProjectList = {this.props.requestProjectList}
                    companyListOptions={this.props.companyList}  requestCompanyList = {this.props.requestCompanyList}
                    mProjectCompanyListOptions={this.props.mProjectCompanyList}  requestMProjectCompanyList = {this.props.requestMProjectCompanyList}
                    mProjectCompanyListAllOptions={this.props.mProjectCompanyListAll}  requestMProjectCompanyListAll = {this.props.requestMProjectCompanyListAll}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const MProjectCompanyForm= ({handleSubmit, error,projectListOptions,companyListOptions,companyListAllOptions, requestProjectList,requestCompanyList,requestMProjectCompanyListAll}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Project', 'project', [required], Dropdown,'Project',projectListOptions,'name',null,requestProjectList,null,null,"")}
            {createField('Company', 'company', [required], Dropdown,'Company',companyListOptions,'name',null,requestCompanyList,null,null,"")}
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

const MProjectCompanyCreateReduxForm = reduxForm({form: 'mProjectCompanyCreate', initialValues: {
    project: "",
    company: "",

}})(MProjectCompanyForm)

const mapStateToProps = (state) => ({
    mProjectCompanyListAll: getMProjectCompanyListAll(state),
    projectList: getProjectList(state),
    companyList: getCompanyList(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state)
})

export default connect(mapStateToProps, {createMProjectCompany,requestProjectList,requestCompanyList,requestMProjectCompanyListAll})(MProjectCompanyCreateContainer);