import React from 'react';
import { connect } from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import swal from 'sweetalert';
import {compose} from "redux";
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { requestJobTitleList,filterJobTitleList, sortJobTitleList,requestJobTitleListAll,deleteJobTitleItem } from '../../redux/Reducers/jobTitleList_reducer';
import JobTitleDataGrid from './JobTitleDataGrid';
import { getJobTitleList, getCurrentPage, getPageSize, getTotalItemsCount, getSortData,getIsFetching,getIsCreated, getSetErrorMessage,getJobTitleListAll } from '../../redux/Selectors/jobTitleList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class JobTitleContainer extends React.Component {

    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestJobTitleList(pageNumber);
        // this.props.requestJobTitleListAll();
    }
    onPageChanged = (pageNumber) => {
        this.props.requestJobTitleList(pageNumber);
    }
    onSorting = (sortData) => {
        this.props.sortJobTitleList(sortData)
    }

    onSubmit = (formData) => {
        this.props.filterJobTitleList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteJobTitleItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestJobTitleList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Job Title List</h1>
                    <NavLink to="/job_title_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.jobTitleList == null && this.props.jobTitleListAll==null && <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.jobTitleList != null && 
                    <JobTitleDataGrid 
                    jobTitleList={this.props.jobTitleList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterJobTitleList={this.props.filterJobTitleList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    jobTitleListAll={this.props.jobTitleListAll} 
                    jobTitleFunction = {this.props.requestJobTitleListAll}
                /> 
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        jobTitleList: getJobTitleList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching: getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        jobTitleListAll:getJobTitleListAll(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestJobTitleList,filterJobTitleList,requestJobTitleListAll,sortJobTitleList, deleteJobTitleItem}),
    withRouter
)(JobTitleContainer);