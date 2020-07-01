import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input,Toggle} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createUser} from "../../redux/Reducers/userList_reducer";
import {getIsCreated, getIsFetching,getCurrentPage,getSetErrorMessage} from '../../redux/Selectors/userList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class UserCreateContainer extends React.Component {

    onSubmit = (formData) => {
        this.props.createUser(formData);
    }

    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/user/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && <Preloader /> }
            {this.props.setErrorMessage && <ErrorMessage />}     
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Create User</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <UserCreateReduxForm onSubmit={this.onSubmit}/>
                    </div>
                </div>
            </>
            </div>
        );
    }
}

const UserForm= ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Username', 'username',[required],Input,'Username')}
            {createField('Password', 'password',[required],Input,'Password',null,null,'password')}
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

const UserCreateReduxForm = reduxForm({form: 'userCreate', initialValues: {
    username: "",
    password: "",
    is_active: false,

}})(UserForm)

const mapStateToProps = (state) => ({
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state)
})

export default connect(mapStateToProps, {createUser})(UserCreateContainer);