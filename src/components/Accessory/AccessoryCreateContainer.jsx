import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input,Dropdown} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createAccessory,requestAccessoryTypeListAll,requestAccessoryModelListAll,requestCompanyListAll} from "../../redux/Reducers/accessoryList_reducer";
import {getIsCreated, getIsFetching,getCurrentPage,getAccessoryModelListAll,getAccessoryTypeListAll,getSetErrorMessage,getCompanyListAll} from '../../redux/Selectors/accessoryList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class AccessoryCreateContainer extends React.Component {

    onSubmit = (formData) => {
        console.log(formData)
        this.props.createAccessory(formData);
    }

    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/accessory/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.accessoryModelListAll==null&&
                    this.props.accessoryTypeListAll==null && <Preloader /> }
            {this.props.setErrorMessage && <ErrorMessage />}     
            {this.props.accessoryModelListAll!=null && this.props.accessoryTypeListAll!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Create Accessory</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <AccessoryCreateReduxForm onSubmit={this.onSubmit} accessoryModelListAll={this.props.accessoryModelListAll} requestAccessoryTypeListAll = {this.props.requestAccessoryTypeListAll}
                    requestAccessoryModelListAll = {this.props.requestAccessoryModelListAll} accessoryTypeListAll={this.props.accessoryTypeListAll} companyListAll={this.props.companyListAll} requestCompanyListAll={this.props.requestCompanyListAll}   />
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const AccessoryForm= ({handleSubmit, error,accessoryModelListAll,accessoryTypeListAll,companyListAll,requestAccessoryTypeListAll,requestAccessoryModelListAll,requestCompanyListAll}) => {

    // initialValues.accessory_model=accessoryModelOptions[0].id
    // initialValues.accessory_type=accessoryTypeOptions[0].id
    return (
        <form onSubmit={handleSubmit}>
            {createField('Name', 'name',[required],Input,'Name')}
            {createField('Company', 'company', [required], Dropdown,'Company',companyListAll,'name',null,requestCompanyListAll,null,null,"")}
            {createField('Accessory Model', 'accessory_model', [required], Dropdown,'Accessory Model',accessoryModelListAll,'name',null,requestAccessoryModelListAll,null,null,"")}
            {createField('Accessory Type', 'accessory_type', [required], Dropdown,'Accessory Type',accessoryTypeListAll,'name',null,requestAccessoryTypeListAll,null,null,"")}
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

const AccessoryCreateReduxForm = reduxForm({form: 'accessoryCreate', initialValues: {
    accessory_model: "",
    accessory_type: "",
    company:"",
}})(AccessoryForm)

const mapStateToProps = (state) => ({
    accessoryModelListAll: getAccessoryModelListAll(state),
    accessoryTypeListAll: getAccessoryTypeListAll(state),
    companyListAll: getCompanyListAll(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state)
})

export default connect(mapStateToProps, {createAccessory,requestAccessoryTypeListAll,requestAccessoryModelListAll,requestCompanyListAll})(AccessoryCreateContainer);