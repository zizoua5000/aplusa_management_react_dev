import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {required} from "../../utils/validators/validators";
import {compose} from "redux";
import {createField, Input,Dropdown} from "../Common/FormsControls/FormsControls";
import {getPermissionItem,updatePermissionItem,requestContentTypeList} from "../../redux/Reducers/permissionList_reducer";
import {getIsCreated, getPermissionItemSel,getContentTypeList, getIsFetching,getSetErrorMessage, getCurrentPage} from '../../redux/Selectors/permissionList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class PermissionUpdateContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;        
        this.props.getPermissionItem(id);
    }

    onSubmit = (formData) => {
        this.props.updatePermissionItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/permission/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching  &&  this.props.permissionItem==null&& <Preloader />  }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.permissionItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Update Permission</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <PermissionUpdateReduxForm onSubmit={this.onSubmit} contentTypeListOptions={this.props.contentTypeList} requestContentTypeList={this.props.requestContentTypeList} instance={this.props.permissionItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const PermissionForm= ({handleSubmit, error, permissionListAllOptions,contentTypeListOptions,requestPermissionListAll,requestContentTypeList, instance, initialValues}) => {
    initialValues.id=instance.id
    initialValues.name=instance.name
    initialValues.codename=instance.codename
    initialValues.content_type=instance.content_type_detail.id
    contentTypeListOptions=(contentTypeListOptions==null?[]:(contentTypeListOptions.length!=0?contentTypeListOptions:[instance.content_type_detail]))

    return (
        <form onSubmit={handleSubmit}>
            {createField('Name', 'name',[required],Input,'Name')}
            {createField('Code name', 'codename',[required],Input,'Code name')}
            {createField("Content Type", 'content_type', [required], Dropdown,'Content Type',contentTypeListOptions,'app_label',null,requestContentTypeList,null,null,"")}
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

const PermissionUpdateReduxForm = reduxForm({form: 'permissionUpdate',enableReinitialize: true, initialValues: {
    id:"",
    name:"",
    codename: "",
    content_type: "",
}})(PermissionForm)

const mapStateToProps = (state) => ({
    contentTypeList: getContentTypeList(state),
    permissionItem: getPermissionItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state)

})

export default compose(
    connect(mapStateToProps, { getPermissionItem, updatePermissionItem,requestContentTypeList}),
    withRouter
)(PermissionUpdateContainer);