import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {getAccessoryModelItem,updateAccessoryModelItem} from "../../redux/Reducers/accessoryModelList_reducer";
import {getIsCreated, getCurrentPage,getAccessoryModelItemSel, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/accessoryModelList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';

class AccessoryModelUpdateContainer extends React.Component {
 
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getAccessoryModelItem(id);
    }

    onSubmit = (formData) => {
        this.props.updateAccessoryModelItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/accessory_model/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.accessoryModelItem==null? <Preloader /> : null }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.accessoryModelItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Update Accessory Model</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header"></div>
                    <div className="card-body">
                    <AccessoryModelUpdateReduxForm onSubmit={this.onSubmit} instance={this.props.accessoryModelItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const AccessoryModelForm= ({handleSubmit, error,instance, initialValues}) => {
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

const AccessoryModelUpdateReduxForm = reduxForm({form: 'accessoryModelUpdate', initialValues: {
    id:"",
    name:"",
}})(AccessoryModelForm)

const mapStateToProps = (state) => ({
    accessoryModelItem: getAccessoryModelItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    setErrorMessage: getSetErrorMessage(state),
    currentPage:getCurrentPage(state),
});

export default compose(
    connect(mapStateToProps, { getAccessoryModelItem, updateAccessoryModelItem}),
    withRouter
)(AccessoryModelUpdateContainer);