import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input,Dropdown} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createPerson,requestCompanyList,requestDepartmentList,requestJobTitleList,requestUserList} from "../../redux/Reducers/personList_reducer";
import {getIsCreated, getIsFetching,getCurrentPage,getCompanyList,getDepartmentList,getJobTitleList,getUserList,getSetErrorMessage} from '../../redux/Selectors/personList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class PersonCreateContainer extends React.Component {

    onSubmit = (formData) => {
        this.props.createPerson(formData);
    }

    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/person/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching &&
                    this.props.companyList==null && <Preloader /> }
            {this.props.setErrorMessage && <ErrorMessage />}     
            {this.props.companyList!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Create Person</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <PersonCreateReduxForm onSubmit={this.onSubmit}
                    companyListOptions={this.props.companyList}  requestCompanyList = {this.props.requestCompanyList}
                    departmentListOptions={this.props.departmentList}  requestDepartmentList = {this.props.requestDepartmentList}
                    jobTitleListOptions={this.props.jobTitleList}  requestJobTitleList = {this.props.requestJobTitleList}
                    userListOptions={this.props.userList}  requestUserList = {this.props.requestUserList}
                   />
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const PersonForm= ({handleSubmit, error,companyListOptions,departmentListOptions,jobTitleListOptions,userListOptions,
    requestCompanyList,requestDepartmentList,requestJobTitleList,requestUserList}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Firstname', 'first_name',[required],Input,'Firstname')}
            {createField('Lastname', 'last_name',[required],Input,'Lastname')}
            {createField('Phone', 'phone',[],Input,'Phone')}
            {createField('Email', 'email',[],Input,'Email')}
            {createField('Company', 'company', [required], Dropdown,'Company',companyListOptions,'name',null,requestCompanyList,null,null,"")}
            {createField('Department', 'department', [], Dropdown,'Department',departmentListOptions,'name',null,requestDepartmentList,null,null,"")}
            {createField('Job title', 'job_title', [], Dropdown,'Job title',jobTitleListOptions,'name',null,requestJobTitleList,null,null,"")}
            {createField('User', 'user', [], Dropdown,'User',userListOptions,'username',null,requestUserList,null,null,"")}
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

const PersonCreateReduxForm = reduxForm({form: 'personCreate', initialValues: {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    company: "",
    department: "",
    job_title: "",
    user: "",

}})(PersonForm)

const mapStateToProps = (state) => ({
    companyList: getCompanyList(state),
    departmentList: getDepartmentList(state),
    jobTitleList: getJobTitleList(state),
    userList: getUserList(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state)
})

export default connect(mapStateToProps, {createPerson,requestCompanyList,requestDepartmentList,requestJobTitleList,requestUserList})(PersonCreateContainer);