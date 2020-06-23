import React from 'react';
import { connect } from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import swal from 'sweetalert';
import {compose} from "redux";
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { requestCompanyTypeList,filterCompanyTypeList, sortCompanyTypeList,requestCompanyTypeListAll,deleteCompanyTypeItem } from '../../redux/Reducers/companyTypeList_reducer';
import CompanyTypeDataGrid from './CompanyTypeDataGrid';
import { getCompanyTypeList, getCurrentPage, getPageSize, getTotalItemsCount, getSortData,getIsFetching,getIsCreated, getSetErrorMessage,getCompanyTypeListAll } from '../../redux/Selectors/companyTypeList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class CompanyTypeContainer extends React.Component {

    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }
        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestCompanyTypeList(pageNumber);
    }
    onPageChanged = (pageNumber) => {
        this.props.requestCompanyTypeList(pageNumber);
    }
    onSorting = (sortData) => {
        this.props.sortCompanyTypeList(sortData)
    }

    onSubmit = (formData) => {
        this.props.filterCompanyTypeList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteCompanyTypeItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestCompanyTypeList(this.props.currentPage);
                })
                .catch(err => { 
                    if (!err.response){
                        swal("Network error", {
                            icon: "warning",
                        })
                    }else{
                        swal(err.response.data, {
                            icon: "warning",
                        })
                    }    
                  });
            }
          });
    }
    render() {
        return (
            <div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Company Type List</h1>
                    <NavLink to="/company_type_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.companyTypeList == null && this.props.companyTypeListAll==null && <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.companyTypeList != null && 
                    <CompanyTypeDataGrid 
                    companyTypeList={this.props.companyTypeList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterCompanyTypeList={this.props.filterCompanyTypeList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    companyTypeListAll={this.props.companyTypeListAll} 
                    companyTypeFunction = {this.props.requestCompanyTypeListAll}
                /> 
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        companyTypeList: getCompanyTypeList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching: getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        companyTypeListAll:getCompanyTypeListAll(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestCompanyTypeList,filterCompanyTypeList,requestCompanyTypeListAll,sortCompanyTypeList, deleteCompanyTypeItem}),
    withRouter
)(CompanyTypeContainer);