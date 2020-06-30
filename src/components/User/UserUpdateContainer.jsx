import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {required} from "../../utils/validators/validators";
import {compose} from "redux";
import {createField, Input,Toggle} from "../Common/FormsControls/FormsControls";
import {getUserItem,updateUserItem} from "../../redux/Reducers/userList_reducer";
import {getIsCreated, getUserItemSel, getIsFetching,getSetErrorMessage, getCurrentPage} from '../../redux/Selectors/userList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class UserUpdateContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;        
        this.props.getUserItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateUserItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/user/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching  &&  this.props.userItem==null&& <Preloader />  }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.userItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Update User</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <UserUpdateReduxForm onSubmit={this.onSubmit} instance={this.props.userItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const UserForm= ({handleSubmit, error, instance, initialValues}) => {
    initialValues.id=instance.id
    initialValues.username=instance.username
    initialValues.password=""
    initialValues.is_active=instance.is_active

    return (
        <form onSubmit={handleSubmit}>
            {createField('Username', 'username',[required],Input,'Username')}
            {createField('Password', 'password',[],Input,'Password',null,null,'password')}
            {createField('Status', 'is_active',[],Toggle,'Status',null,null,'checkbox')} 
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

const UserUpdateReduxForm = reduxForm({form: 'userUpdate',enableReinitialize: true, initialValues: {
    id:"",
    username:"",
    password: "",
    is_active: "",
}})(UserForm)

const mapStateToProps = (state) => ({
    userItem: getUserItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state)
})

export default compose(
    connect(mapStateToProps, { getUserItem, updateUserItem}),
    withRouter
)(UserUpdateContainer);