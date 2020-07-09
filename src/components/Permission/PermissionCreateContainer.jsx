import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input,Dropdown} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createPermission,requestContentTypeList} from "../../redux/Reducers/permissionList_reducer";
import {getIsCreated, getIsFetching,getCurrentPage,getContentTypeList,getSetErrorMessage} from '../../redux/Selectors/permissionList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class PermissionCreateContainer extends React.Component {

    onSubmit = (formData) => {
        this.props.createPermission(formData);
    }

    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/permission/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching &&
                    this.props.contentTypeList==null && <Preloader /> }
            {this.props.setErrorMessage && <ErrorMessage />}     
            {this.props.contentTypeList!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Create Permission</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <PermissionCreateReduxForm onSubmit={this.onSubmit}
                    contentTypeListOptions={this.props.contentTypeList}  requestContentTypeList = {this.props.requestContentTypeList}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const PermissionForm= ({handleSubmit, error,contentTypeListOptions, requestContentTypeList}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Name', 'name',[required],Input,'Name')}
            {createField('Code name', 'codename',[required],Input,'Code name')}
            {createField('Content Type', 'content_type', [required], Dropdown,'Content Type',contentTypeListOptions,'app_label',null,requestContentTypeList,null,null,"")}
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

const PermissionCreateReduxForm = reduxForm({form: 'permissionCreate', initialValues: {
    name: "",
    codename: "",
    content_type: "",

}})(PermissionForm)

const mapStateToProps = (state) => ({
    contentTypeList: getContentTypeList(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state)
})

export default connect(mapStateToProps, {createPermission,requestContentTypeList})(PermissionCreateContainer);