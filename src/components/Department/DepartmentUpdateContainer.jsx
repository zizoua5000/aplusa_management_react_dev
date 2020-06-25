import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {getDepartmentItem,updateDepartmentItem} from "../../redux/Reducers/departmentList_reducer";
import {getIsCreated, getCurrentPage,getDepartmentItemSel, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/departmentList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';

class DepartmentUpdateContainer extends React.Component {
 
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getDepartmentItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateDepartmentItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/department/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.departmentItem==null? <Preloader /> : null }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.departmentItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Update Department</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <DepartmentUpdateReduxForm onSubmit={this.onSubmit} instance={this.props.departmentItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const DepartmentForm= ({handleSubmit, error,instance, initialValues}) => {
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

const DepartmentUpdateReduxForm = reduxForm({form: 'departmentUpdate', initialValues: {
    id:"",
    name:"",
}})(DepartmentForm)

const mapStateToProps = (state) => ({
    departmentItem: getDepartmentItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state),
    currentPage:getCurrentPage(state),
});

export default compose(
    connect(mapStateToProps, { getDepartmentItem, updateDepartmentItem}),
    withRouter
)(DepartmentUpdateContainer);