import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {required} from "../../utils/validators/validators";
import {compose} from "redux";
import {createField,MultiSelect2} from "../Common/FormsControls/FormsControls";
import {getUserPermissionItem,updateUserPermissionItem,requestPermissionList} from "../../redux/Reducers/userPermissionList_reducer";
import {getIsCreated, getUserPermissionItemSel,getPermissionList, getIsFetching,getSetErrorMessage, getCurrentPage} from '../../redux/Selectors/userPermissionList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class UserPermissionUpdateContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;        
        this.props.getUserPermissionItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateUserPermissionItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/user_permission/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching  &&  this.props.userPermissionItem==null&& <Preloader />  }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.userPermissionItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Update User Permission</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <UserPermissionUpdateReduxForm onSubmit={this.onSubmit} permissionListOptions={this.props.permissionList} requestPermissionList={this.props.requestPermissionList} instance={this.props.userPermissionItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const UserPermissionForm= ({handleSubmit, error,permissionListOptions,requestPermissionList, instance, initialValues}) => {
    initialValues.user=instance.id
    initialValues.permissions=instance.user_permissions_detail

    return (
        <form onSubmit={handleSubmit}>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Username: {instance.username}</h1>
            </div>
            {createField("Permissions", 'permissions', [required], MultiSelect2,'Permissions',permissionListOptions,'name',null,requestPermissionList,null,null,"")}
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

const UserPermissionUpdateReduxForm = reduxForm({form: 'userPermissionUpdate',enableReinitialize: true, initialValues: {
    user:"",
}})(UserPermissionForm)

const mapStateToProps = (state) => ({
    permissionList: getPermissionList(state),
    userPermissionItem: getUserPermissionItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state)

})

export default compose(
    connect(mapStateToProps, { getUserPermissionItem, updateUserPermissionItem,requestPermissionList}),
    withRouter
)(UserPermissionUpdateContainer);