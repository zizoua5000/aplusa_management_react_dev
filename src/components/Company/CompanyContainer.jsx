import React from 'react';
import { connect} from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import {compose} from "redux";
import swal from 'sweetalert';
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import {requestCompanyList, deleteCompanyItem,filterCompanyList,sortCompanyList,requestCompanyListAll,requestCompanyTypeList} from '../../redux/Reducers/companyList_reducer'
import {getCompanyList, getCurrentPage, getPageSize, getTotalItemsCount, getIsFetching, getIsCreated,getSetErrorMessage,getCompanyListAll,getSortData, getCompanyTypeList} from '../../redux/Selectors/companyList_selectors'
import CompanyDataGrid from './CompanyDataGrid'
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class CompanyContainer extends React.Component {
    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestCompanyList(pageNumber);   
    }
    
    onPageChanged = (pageNumber) => {
        this.props.requestCompanyList(pageNumber);
    }
    onSorting = (sortData) => {

        this.props.sortCompanyList(sortData)
    }

    onSubmit = (formData) => {

        this.props.filterCompanyList(formData);
    }


    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteCompanyItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestCompanyList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Company List</h1>
                    <NavLink to="/company_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.companyList==null && this.props.companyListAll==null && <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.companyList!=null &&
                    <CompanyDataGrid 
                    companyList={this.props.companyList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterCompanyList={this.props.filterCompanyList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    companyListAll={this.props.companyListAll}
                    companyTypeList={this.props.companyTypeList}
                    requestCompanyListAll = {this.props.requestCompanyListAll}
                    requestCompanyTypeList = {this.props.requestCompanyTypeList}
                    />
                }
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        companyList: getCompanyList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching:getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        companyListAll:getCompanyListAll(state),
        companyTypeList:getCompanyTypeList(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestCompanyList, deleteCompanyItem,filterCompanyList,sortCompanyList,requestCompanyListAll,requestCompanyTypeList}),
    withRouter
)(CompanyContainer);
