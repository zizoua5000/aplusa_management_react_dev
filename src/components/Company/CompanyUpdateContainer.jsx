import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {required} from "../../utils/validators/validators";
import {compose} from "redux";
import {createField, Input,Dropdown} from "../Common/FormsControls/FormsControls";
import {getCompanyItem,updateCompanyItem,requestCompanyListAll,requestCompanyTypeList} from "../../redux/Reducers/companyList_reducer";
import {getIsCreated, getCompanyItemSel,getCompanyListAll,getCompanyTypeList, getIsFetching,getSetErrorMessage, getCurrentPage} from '../../redux/Selectors/companyList_selectors';
import style from "./../Common/FormsControls/FormsControls.module.css";
import Preloader from '../Common/Preloader/Preloader';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class CompanyUpdateContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;        
        this.props.getCompanyItem(id);
        // this.props.requestCompanyTypeList()
        // this.props.requestCompanyListAll()
    }

    onSubmit = (formData) => {
        this.props.updateCompanyItem(formData);
    }
 
    render() {
        if (this.props.isCreated) {
            return <Redirect to={`/company/${this.props.currentPage}`}/>
        }
        return (
            <div>
            {this.props.isFetching  &&  this.props.companyItem==null&& <Preloader />  }
            {this.props.setErrorMessage && <ErrorMessage />}
            {this.props.companyItem!=null &&
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Update Company</h1>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                    <CompanyUpdateReduxForm onSubmit={this.onSubmit}  companyListAllOptions={this.props.companyListAll} requestCompanyListAll={this.props.requestCompanyListAll} 
                        companyTypeListOptions={this.props.companyTypeList} requestCompanyTypeList={this.props.requestCompanyTypeList} instance={this.props.companyItem}/>
                    </div>
                </div>
            </>
            }  
            </div>
        );
    }
}

const CompanyForm= ({handleSubmit, error, companyListAllOptions,companyTypeListOptions,requestCompanyListAll,requestCompanyTypeList, instance, initialValues}) => {
    initialValues.id=instance.id
    initialValues.name=instance.name
    initialValues.main_company=instance.main_company_detail.id
    initialValues.company_type=instance.company_type_detail.id
    companyListAllOptions=(companyListAllOptions==null?[]:(companyListAllOptions.length!=0?companyListAllOptions:[instance.main_company_detail]))
    companyTypeListOptions=(companyTypeListOptions==null?[]:(companyTypeListOptions.length!=0?companyTypeListOptions:[instance.company_type_detail]))

    return (
        <form onSubmit={handleSubmit}>
            {createField('Name', 'name',[required],Input,'Name')}
            {createField("Main Company", 'main_company', [required], Dropdown,'Main Company',companyListAllOptions,'name',null,requestCompanyListAll,null,"")}
            {createField("Company Type", 'company_type', [required], Dropdown,'Company Type',companyTypeListOptions,'name',null,requestCompanyTypeList,null,"")}
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

const CompanyUpdateReduxForm = reduxForm({form: 'companyUpdate',enableReinitialize: true, initialValues: {
    id:"",
    name:"",
    main_company: "",
    company_type: "",
}})(CompanyForm)

const mapStateToProps = (state) => ({
    companyListAll: getCompanyListAll(state),
    companyTypeList: getCompanyTypeList(state),
    companyItem: getCompanyItemSel(state),
    isCreated: getIsCreated(state),
    isFetching: getIsFetching(state),
    currentPage:getCurrentPage(state),
    setErrorMessage: getSetErrorMessage(state)

})

export default compose(
    connect(mapStateToProps, { getCompanyItem, updateCompanyItem,requestCompanyListAll,requestCompanyTypeList}),
    withRouter
)(CompanyUpdateContainer);