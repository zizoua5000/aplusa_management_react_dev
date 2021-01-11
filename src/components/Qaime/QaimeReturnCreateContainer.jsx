import React from 'react';
import {reduxForm,FieldArray} from "redux-form";
import {createField, Input,Dropdown, Textarea,DatePickerReact,Toggle} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {createQaimeReturn,requestQaimeTypeList,requestResponsiblePersonList,requestPersonList,requestStatusList,
    requestDeviceList,requestAccessoryList,requestSimcardList,requestProjectList,requestCompanyList,
    requestConfigurationList,requestFWVersionList,requestQaimeListAll} from "../../redux/Reducers/qaimeList_reducer";
import {getIsCreated, getIsFetching,getCurrentPage,getQaimeTypeList,getResponsiblePersonList,getPersonList,
    getStatusList,getDeviceList,getAccessoryList,getSimcardList,getProjectList,getCompanyList,getConfigurationList,
    getFWVersionList,getQaimeListAll,getSetErrorMessage} from '../../redux/Selectors/qaimeList_selectors';
import {Redirect} from "react-router-dom";
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class QaimeReturnCreateContainer extends React.Component {

    onSubmit = (formData) => {
        this.props.createQaimeReturn(formData);
    }

    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/qaime/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching &&
                    this.props.qaimeTypeList==null && <Preloader /> }
            {this.props.setErrorMessage && <ErrorMessage />}     
            {this.props.qaimeTypeList!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Create Qaime</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <QaimeReturnCreateReduxForm onSubmit={this.onSubmit}
                    qaimeTypeListOptions={this.props.qaimeTypeList}  requestQaimeTypeList = {this.props.requestQaimeTypeList}
                    qaimeListAllOptions={this.props.qaimeListAll}  requestQaimeListAll = {this.props.requestQaimeListAll}
                    responsiblePersonListOptions={this.props.responsiblePersonList}  requestResponsiblePersonList = {this.props.requestResponsiblePersonList}
                    personListOptions={this.props.personList}  requestPersonList = {this.props.requestPersonList}
                    statusListOptions={this.props.statusList}  requestStatusList = {this.props.requestStatusList}
                    deviceListOptions={this.props.deviceList}  requestDeviceList = {this.props.requestDeviceList}
                    accessoryListOptions={this.props.accessoryList}  requestAccessoryList = {this.props.requestAccessoryList}
                    simcardListOptions={this.props.simcardList}  requestSimcardList = {this.props.requestSimcardList}
                    projectListOptions={this.props.projectList}  requestProjectList = {this.props.requestProjectList}
                    companyListOptions={this.props.companyList}  requestCompanyList = {this.props.requestCompanyList}
                    configurationListOptions={this.props.configurationList}  requestConfigurationList = {this.props.requestConfigurationList}
                    fwVersionListOptions={this.props.fwVersionList}  requestFWVersionList = {this.props.requestFWVersionList}
                    />
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const QaimeForm= ({handleSubmit, error,qaimeTypeListOptions,responsiblePersonListOptions,personListOptions,statusListOptions,
    deviceListOptions,accessoryListOptions,simcardListOptions,projectListOptions,companyListOptions,configurationListOptions,
    fwVersionListOptions,qaimeListAllOptions, requestQaimeTypeList,requestResponsiblePersonList,requestPersonList,requestStatusList,
    requestDeviceList,requestAccessoryList,requestSimcardList,requestProjectList,requestCompanyList,
    requestConfigurationList,requestFWVersionList,requestQaimeListAll}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Name', 'name',[required],Input,'Name')}
            {createField(null, `qaime_type`,[],Input,null,null,null,"hidden")}
            {createField('Responsible Person', 'responsible_person', [required], Dropdown,'Responsible Person',responsiblePersonListOptions,'name',null,requestResponsiblePersonList,null,null,"")}
            {createField('Recipient', 'recipient', [required], Dropdown,'Recipient',personListOptions,'full_name',null,requestPersonList,null,null,"")}
            {createField(null, `status`,[],Input,null,null,null,"hidden")}
            {createField('Comment','comment',[],Textarea,'Comment')}
            {createField('Date', 'qaime_datetime',[required],DatePickerReact,'Date')}

            <FieldArray name="qaime_details" component={renderQaimeDetails} 
             deviceListOptions={deviceListOptions}  requestDeviceList = {requestDeviceList}
             accessoryListOptions={accessoryListOptions}  requestAccessoryList = {requestAccessoryList}
             simcardListOptions={simcardListOptions}  requestSimcardList = {requestSimcardList}
             projectListOptions={projectListOptions}  requestProjectList = {requestProjectList}
             companyListOptions={companyListOptions}  requestCompanyList = {requestCompanyList}
             configurationListOptions={configurationListOptions}  requestConfigurationList = {requestConfigurationList}
             fwVersionListOptions={fwVersionListOptions}  requestFWVersionList = {requestFWVersionList}/>
            
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

const renderQaimeDetails = ({ fields, meta: { error, submitFailed },
    deviceListOptions,accessoryListOptions,simcardListOptions,projectListOptions,companyListOptions,configurationListOptions,
    fwVersionListOptions,requestDeviceList,requestAccessoryList,requestSimcardList,requestProjectList,requestCompanyList,
    requestConfigurationList,requestFWVersionList }) => (
    <div className="card shadow mb-4">
        <div className="card-body"></div>
    <ul>
     
      {fields.map((qaime_detail, index) => (
        <li key={index}>
          <h4>Detail #{index + 1}</h4>
            {createField('Device', `${qaime_detail}.device`, [], Dropdown,'Device',deviceListOptions,'serie',null,requestDeviceList,null,null,"")}
            {createField('Accessory', `${qaime_detail}accessory`, [], Dropdown,'Accessory',accessoryListOptions,'name',null,requestAccessoryList,null,null,"")}
            {createField('Project', `${qaime_detail}project`, [], Dropdown,'Project',projectListOptions,'name',null,requestProjectList,null,null,"")}
            {createField('Company', `${qaime_detail}company`, [], Dropdown,'Company',companyListOptions,'name',null,requestCompanyList,null,null,"")}
            {createField('Count', `${qaime_detail}.count`,[],Input,'Count')}
            {createField('Is new', `${qaime_detail}.is_new`,[],Toggle,'Is new',null,null,'checkbox')}
                
            <button
            className="btn btn-danger aa_create_trip"
            type="button"
            title="Remove"
            onClick={() => fields.remove(index)}>
            Remove
           </button>
           <h1></h1>
           <br></br>
        </li>
      ))}
       <li>
        <button className="btn btn-primary aa_create_trip" type="button" onClick={() => fields.push({device:null,accessory:null,count:1,sold_or_rent:true,is_new:true,company:"",project:""})}>
          Add Qaime Details
        </button>
        
        {submitFailed && error && <span>{error}</span>}
      </li>
    </ul>
    </div>
    
  )

const QaimeReturnCreateReduxForm = reduxForm({form: 'qaimeCreate', initialValues: {
    name: "",
    qaime_type: 2,
    responsible_person: "",
    recipient: "",
    status: 11,
    qaime_details: [{device:null,accessory:null,count:1,sold_or_rent:true,is_new:true,company:"",project:""}]
}})(QaimeForm)

const mapStateToProps = (state) => ({
    qaimeListAll: getQaimeListAll(state),
    qaimeTypeList: getQaimeTypeList(state),
    responsiblePersonList: getResponsiblePersonList(state),
    personList: getPersonList(state),
    statusList: getStatusList(state),
    deviceList: getDeviceList(state),
    accessoryList: getAccessoryList(state),
    simcardList: getSimcardList(state),
    projectList: getProjectList(state),
    companyList: getCompanyList(state),
    configurationList: getConfigurationList(state),
    fwVersionList: getFWVersionList(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state)
})

export default connect(mapStateToProps, {createQaimeReturn,requestQaimeTypeList,requestQaimeListAll,
    requestResponsiblePersonList,requestPersonList,requestStatusList,requestDeviceList,requestAccessoryList,
    requestSimcardList,requestProjectList,requestCompanyList,requestConfigurationList,requestFWVersionList})(QaimeReturnCreateContainer);