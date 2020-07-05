import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {required} from "../../utils/validators/validators";
import {compose} from "redux";
import {createField, Input,Dropdown} from "../Common/FormsControls/FormsControls";
import {getAccessoryItem,updateAccessoryItem,requestAccessoryModelListAll,requestAccessoryTypeListAll} from "../../redux/Reducers/accessoryList_reducer";
import {getIsCreated, getAccessoryItemSel,getAccessoryModelListAll,getAccessoryTypeListAll,
     getIsFetching,getSetErrorMessage, getCurrentPage,getCompanyListAll} from '../../redux/Selectors/accessoryList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class AccessoryUpdateContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;        
        this.props.getAccessoryItem(id);
        console.log(this.props)
    }

    onSubmit = (formData) => {
        this.props.updateAccessoryItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/accessory/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching && this.props.accessoryTypeListAll==null&&this.props.accessoryModelListAll==null && this.props.accessoryItem==null&& <Preloader />  }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.accessoryTypeListAll!=null&&this.props.accessoryModelListAll!=null&&this.props.accessoryItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Update Accessory</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <AccessoryUpdateReduxForm onSubmit={this.onSubmit}  accessoryModelAll={this.props.accessoryModelListAll} requestAccessoryModelAll={this.props.requestAccessoryModelListAll} companyAll={this.props.companyListAll}
                        accessoryTypeAll={this.props.accessoryTypeListAll} requestAccessoryTypeAll={this.props.requestAccessoryTypeListAll} instance={this.props.accessoryItem} requestCompanyAll={this.props.requestCompanyListAll}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const AccessoryForm= ({handleSubmit, error, accessoryModelAll,accessoryTypeAll,companyAll,requestAccessoryModelAll,requestAccessoryTypeAll,requestCompanyAll, instance, initialValues}) => {
    console.log(initialValues)
    initialValues.id=instance.id
    initialValues.name=instance.name
    initialValues.company=instance.company_detail.id
    initialValues.accessory_model=instance.accessory_model_detail.id    
    initialValues.accessory_type=instance.accessory_type_detail.id
    companyAll=(companyAll==null?[]:(companyAll.length!=0?companyAll:[instance.company_detail]))
    accessoryModelAll=(accessoryModelAll==null?[]:(accessoryModelAll.length!=0?accessoryModelAll:[instance.accessory_model_detail]))
    accessoryTypeAll=(accessoryTypeAll==null?[]:(accessoryTypeAll.length!=0?accessoryTypeAll:[instance.accessory_type_detail]))
    return (
        <form onSubmit={handleSubmit}>
            
            {createField('Name', 'name',[required],Input,'Name')}
            {createField("Company", 'company', [required], Dropdown,'Company',companyAll,'name',null,requestCompanyAll,null,null,"")}
            {createField("Accessory Model", 'accessory_model', [required], Dropdown,'Accessory Model',accessoryModelAll,'name',null,requestAccessoryModelAll,null,null,"")}
            {createField("Accessory Type", 'accessory_type', [required], Dropdown,'Accessory Type',accessoryTypeAll,'name',null,requestAccessoryTypeAll,null,null,"")}
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

const AccessoryUpdateReduxForm = reduxForm({form: 'accessoryUpdate', initialValues: {
    id:"",
    company:"",
    accessory_model: "",
    accessory_type: "",

}})(AccessoryForm)

const mapStateToProps = (state) => ({
    accessoryModelListAll: getAccessoryModelListAll(state),
    accessoryTypeListAll: getAccessoryTypeListAll(state),
    accessoryItem: getAccessoryItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state),
    companyListAll: getCompanyListAll(state),

})

export default compose(
    connect(mapStateToProps, { getAccessoryItem, updateAccessoryItem,requestAccessoryModelListAll,requestAccessoryTypeListAll}),
    withRouter
)(AccessoryUpdateContainer);