import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {createField, Dropdown,Toggle} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {getResponsiblePersonItem,updateResponsiblePersonItem,requestPersonListAll,requestDepartmentListAll} from "../../redux/Reducers/responsiblePersonList_reducer";
import {getIsCreated, getCurrentPage,getResponsiblePersonItemSel, getIsFetching,getSetErrorMessage,getDepartmentListAll,getPersonListAll} from '../../redux/Selectors/responsiblePersonList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';

class ResponsiblePersonUpdateContainer extends React.Component {
 
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getResponsiblePersonItem(id);
        console.log(this.props)
    }

    onSubmit = (formData) => {
        this.props.updateResponsiblePersonItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/responsible_person/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.responsiblePersonItem==null? <Preloader /> : null }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.responsiblePersonItem!=null  &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Update Responsible Person</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <ResponsiblePersonUpdateReduxForm onSubmit={this.onSubmit} instance={this.props.responsiblePersonItem} departmentListAll={this.props.departmentListAll}
                    requestDepartmentListAll={this.props.requestDepartmentListAll} requestPersonListAll={this.props.requestPersonListAll} deparmentChiefListAll={this.props.deparmentChiefListAll}
                    chiefSubstituteListAll={this.props.chiefSubstituteListAll} accounterListAll={this.props.accounterListAll} recipientListAll={this.props.recipientListAll} providerListAll={this.props.providerListAll}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const ResponsiblePersonForm= ({handleSubmit, error,instance, initialValues,departmentListAll,requestDepartmentListAll,requestPersonListAll,deparmentChiefListAll,chiefSubstituteListAll,
    accounterListAll,recipientListAll,providerListAll}) => {
    console.log("instance ", instance)
    initialValues.id=instance.id
    initialValues.department=instance.department
    initialValues.department_chief = instance.department_chief
    initialValues.chief_substitute = instance.chief_substitute
    initialValues.accounter = instance.accounter
    initialValues.recipient=instance.recipient
    initialValues.provider=instance.provider
    initialValues.active=instance.active
    console.log("department list: ",departmentListAll)
    
    departmentListAll=(departmentListAll==null?[]:(departmentListAll.length!==0?departmentListAll:[instance.department_detail]))
    deparmentChiefListAll=(deparmentChiefListAll==null?[]:(deparmentChiefListAll.length!==0?deparmentChiefListAll:[instance.department_chief_detail]))
    chiefSubstituteListAll=(chiefSubstituteListAll==null?[]:(chiefSubstituteListAll.length!==0?chiefSubstituteListAll:[instance.chief_substitute_detail]))
    accounterListAll=(accounterListAll==null?[]:(accounterListAll.length!==0?accounterListAll:[instance.accounter_detail]))
    recipientListAll=(recipientListAll==null?[]:(recipientListAll.length!==0?recipientListAll:[instance.recipient_detail]))
    providerListAll=(providerListAll==null?[]:(providerListAll.length!==0?providerListAll:[instance.provider_detail]))

    return (
        <form onSubmit={handleSubmit}>
            {createField('Deparment', 'department', [], Dropdown,'Deparment',departmentListAll,'name',null,requestDepartmentListAll,null,null,"")}
            {createField('Deparment chief', 'department_chief', [], Dropdown,'Deparment chief',deparmentChiefListAll,'full_name',null,requestPersonListAll,null,null,"")}
            {createField('Chief substitute', 'chief_substitute', [], Dropdown,'Chief substitute',chiefSubstituteListAll,'full_name',null,requestPersonListAll,null,null,"")}
            {createField('Accounter', 'accounter', [], Dropdown,'Accounter',accounterListAll,'full_name',null,requestPersonListAll,null,null,"")}
            {createField('Recipient', 'recipient', [], Dropdown,'Recipient',recipientListAll,'full_name',null,requestPersonListAll,null,null,"")}
            {createField('Provider', 'provider', [], Dropdown,'Provider',providerListAll,'full_name',null,requestPersonListAll,null,null,"")}
            {createField('Acive', 'active',[],Toggle,'Active',null,null,'checkbox')}

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

const ResponsiblePersonUpdateReduxForm = reduxForm({form: 'responsiblePersonUpdate', initialValues: {
    id:"",
    department:"",
    department_chief:"",
    chief_substitute:"",
    accounter:"",
    recipient:"",
    provider:"",
    active:"",
}})(ResponsiblePersonForm)

const mapStateToProps = (state) => ({
    responsiblePersonItem: getResponsiblePersonItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state),
    currentPage:getCurrentPage(state),
    departmentListAll:getDepartmentListAll(state),
    deparmentChiefListAll:getPersonListAll(state),
    chiefSubstituteListAll:getPersonListAll(state),
    accounterListAll:getPersonListAll(state),
    recipientListAll:getPersonListAll(state),
    providerListAll:getPersonListAll(state),
});

export default compose(
    connect(mapStateToProps, { getResponsiblePersonItem, updateResponsiblePersonItem,requestDepartmentListAll,requestPersonListAll}),
    withRouter
)(ResponsiblePersonUpdateContainer);