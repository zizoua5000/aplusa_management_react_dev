import React from 'react';
import { connect} from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import {compose} from "redux";
import swal from 'sweetalert';
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import {requestMProjectCompanyList, deleteMProjectCompanyItem,filterMProjectCompanyList,sortMProjectCompanyList,requestMProjectCompanyListAll,requestProjectList,requestCompanyList} from '../../redux/Reducers/mProjectCompanyList_reducer'
import {getMProjectCompanyList, getCurrentPage, getPageSize, getTotalItemsCount, getIsFetching, getIsCreated,getSetErrorMessage,getMProjectCompanyListAll,getSortData, getProjectList,getCompanyList} from '../../redux/Selectors/mProjectCompanyList_selectors'
import MProjectCompanyDataGrid from './MProjectCompanyDataGrid'
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class MProjectCompanyContainer extends React.Component {
    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestMProjectCompanyList(pageNumber); 
    }
    
    onPageChanged = (pageNumber) => {
        this.props.requestMProjectCompanyList(pageNumber);
    }
    onSorting = (sortData) => {

        this.props.sortMProjectCompanyList(sortData)
    }

    onSubmit = (formData) => {

        this.props.filterMProjectCompanyList(formData);
    }


    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteMProjectCompanyItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestMProjectCompanyList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Project-Company List</h1>
                    <NavLink to="/m_project_company_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.mProjectCompanyList==null && this.props.mProjectCompanyListAll==null && <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.mProjectCompanyList!=null &&
                    <MProjectCompanyDataGrid 
                    mProjectCompanyList={this.props.mProjectCompanyList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterMProjectCompanyList={this.props.filterMProjectCompanyList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    mProjectCompanyListAll={this.props.mProjectCompanyListAll}
                    companyList={this.props.companyList}
                    projectList={this.props.projectList}
                    requestMProjectCompanyListAll = {this.props.requestMProjectCompanyListAll}
                    requestProjectList = {this.props.requestProjectList}
                    requestCompanyList = {this.props.requestCompanyList}
                    />
                }
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        mProjectCompanyList: getMProjectCompanyList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching:getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        mProjectCompanyListAll:getMProjectCompanyListAll(state),
        projectList:getProjectList(state),
        companyList:getCompanyList(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestMProjectCompanyList, deleteMProjectCompanyItem,filterMProjectCompanyList,sortMProjectCompanyList,requestMProjectCompanyListAll,requestProjectList,requestCompanyList}),
    withRouter
)(MProjectCompanyContainer);
