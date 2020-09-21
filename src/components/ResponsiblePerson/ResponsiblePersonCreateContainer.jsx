import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Toggle,Dropdown} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createResponsiblePerson,requestResponsiblePersonList,requestDepartmentListAll,requestPersonListAll} from "../../redux/Reducers/responsiblePersonList_reducer";
import {getIsCreated, getCurrentPage, getIsFetching,getSetErrorMessage,getPersonListAll,getDepartmentListAll} from '../../redux/Selectors/responsiblePersonList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class ResponsiblePersonCreateContainer extends React.Component {

    componentDidMount() {
        console.log("Props ",this.props)
        this.props.requestResponsiblePersonList();
    }

    onSubmit = (formData) => {
        console.log("FormData ",formData)
        this.props.createResponsiblePerson(formData);
    }

    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/responsible_person/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.responsiblePersonList==null&& <Preloader /> }
            {this.props.setErrorMessage ? <ErrorMessage /> : null}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Create Responsible Person</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <ResponsiblePersonCreateReduxForm onSubmit={this.onSubmit} personListAll={this.props.personListAll} departmentListAll={this.props.departmentListAll}
                    requestDepartmentListAll={this.props.requestDepartmentListAll} requestPersonListAll={this.props.requestPersonListAll}/>
                    </div>
                </div>
            </div>
        );
    }
}

const ResponsiblePersonForm= ({handleSubmit, error,initialValues, personListAll,departmentListAll,requestDepartmentListAll,requestPersonListAll}) => {
    initialValues.active=0;
    return (
        <form onSubmit={handleSubmit}>
            {createField('Deparment', 'department', [required], Dropdown,'Deparment',departmentListAll,'name',null,requestDepartmentListAll,null,null,"")}
            {createField('Deparment chief', 'department_chief', [required], Dropdown,'Deparment chief',personListAll,'full_name',null,requestPersonListAll,null,null,"")}
            {createField('Chief substitute', 'chief_substitute', [required], Dropdown,'Chief substitute',personListAll,'full_name',null,requestPersonListAll,null,null,"")}
            {createField('Accounter', 'accounter', [required], Dropdown,'Accounter',personListAll,'full_name',null,requestPersonListAll,null,null,"")}
            {createField('Recipient', 'recipient', [required], Dropdown,'Recipient',personListAll,'full_name',null,requestPersonListAll,null,null,"")}
            {createField('Provider', 'provider', [required], Dropdown,'Provider',personListAll,'full_name',null,requestPersonListAll,null,null,"")}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}   
            <div>
                <button className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

const ResponsiblePersonCreateReduxForm = reduxForm({form: 'responsiblePersonCreate',initialValues: {
    active: "",
}})(ResponsiblePersonForm)

const mapStateToProps = (state) => ({
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state),
    personListAll:getPersonListAll(state),
    departmentListAll:getDepartmentListAll(state),
})

export default connect(mapStateToProps, {createResponsiblePerson,requestResponsiblePersonList,requestDepartmentListAll,requestPersonListAll})(ResponsiblePersonCreateContainer);