import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {getAccessoryTypeItem,updateAccessoryTypeItem} from "../../redux/Reducers/accessoryTypeList_reducer";
import {getIsCreated, getCurrentPage,getAccessoryTypeItemSel, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/accessoryTypeList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';

class AccessoryTypeUpdateContainer extends React.Component {
 
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getAccessoryTypeItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateAccessoryTypeItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/accessory_type/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.accessoryTypeItem==null? <Preloader /> : null }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.accessoryTypeItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Update Accessory Type</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <AccessoryTypeUpdateReduxForm onSubmit={this.onSubmit} instance={this.props.accessoryTypeItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const AccessoryTypeForm= ({handleSubmit, error,instance, initialValues}) => {
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

const AccessoryTypeUpdateReduxForm = reduxForm({form: 'accessoryTypeUpdate', initialValues: {
    id:"",
    name:"",
}})(AccessoryTypeForm)

const mapStateToProps = (state) => ({
    accessoryTypeItem: getAccessoryTypeItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state),
    currentPage:getCurrentPage(state),
});

export default compose(
    connect(mapStateToProps, { getAccessoryTypeItem, updateAccessoryTypeItem}),
    withRouter
)(AccessoryTypeUpdateContainer);