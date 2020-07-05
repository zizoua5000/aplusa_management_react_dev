import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {required} from "../../utils/validators/validators";
import {compose} from "redux";
import {createField, Input,Dropdown} from "../Common/FormsControls/FormsControls";
import {getPersonItem,updatePersonItem,requestCompanyList,requestDepartmentList,requestJobTitleList,requestUserList} from "../../redux/Reducers/personList_reducer";
import {getIsCreated, getPersonItemSel,getCompanyList,getDepartmentList,getJobTitleList,getUserList, getIsFetching,getSetErrorMessage, getCurrentPage} from '../../redux/Selectors/personList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class PersonUpdateContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;        
        this.props.getPersonItem(id);
    }

    onSubmit = (formData) => {
        this.props.updatePersonItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/person/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching  &&  this.props.personItem==null&& <Preloader />  }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.personItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Update Person</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <PersonUpdateReduxForm onSubmit={this.onSubmit}  personListAllOptions={this.props.personListAll} requestPersonListAll={this.props.requestPersonListAll} 
                        companyListOptions={this.props.companyList}  requestCompanyList = {this.props.requestCompanyList}
                        departmentListOptions={this.props.departmentList}  requestDepartmentList = {this.props.requestDepartmentList}
                        jobTitleListOptions={this.props.jobTitleList}  requestJobTitleList = {this.props.requestJobTitleList} 
                        userListOptions={this.props.userList}  requestUserList = {this.props.requestUserList}
                        instance={this.props.personItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const PersonForm= ({handleSubmit, error, personListAllOptions,companyListOptions,departmentListOptions,
    jobTitleListOptions,userListOptions,requestPersonListAll, requestCompanyList,requestDepartmentList,
    requestJobTitleList,requestUserList, instance, initialValues}) => {
    initialValues.id=instance.id
    initialValues.first_name=instance.first_name
    initialValues.last_name=instance.last_name
    initialValues.phone=instance.phone
    initialValues.email=instance.email
    initialValues.company=instance.company_detail.id
    initialValues.department=instance.department_detail.id
    initialValues.job_title=instance.job_title_detail.id
    initialValues.user=instance.user_detail.id

    companyListOptions=(companyListOptions==null?[]:(companyListOptions.length!=0?companyListOptions:[instance.company_detail]))
    departmentListOptions=(departmentListOptions==null?[]:(departmentListOptions.length!=0?departmentListOptions:[instance.department_detail]))
    jobTitleListOptions=(jobTitleListOptions==null?[]:(jobTitleListOptions.length!=0?jobTitleListOptions:[instance.job_title_detail]))
    userListOptions=(userListOptions==null?[]:(userListOptions.length!=0?userListOptions:[instance.user_detail]))    
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

const PersonUpdateReduxForm = reduxForm({form: 'personUpdate',enableReinitialize: true, initialValues: {
    id:"",
    first_name:"",
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
    personItem: getPersonItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state)

})

export default compose(
    connect(mapStateToProps, { getPersonItem, updatePersonItem,requestCompanyList,requestDepartmentList,requestJobTitleList,requestUserList}),
    withRouter
)(PersonUpdateContainer);