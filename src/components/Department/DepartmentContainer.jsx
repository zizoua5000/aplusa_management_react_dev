import React from 'react';
import { connect } from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import swal from 'sweetalert';
import {compose} from "redux";
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { requestDepartmentList,filterDepartmentList, sortDepartmentList,requestDepartmentListAll,deleteDepartmentItem } from '../../redux/Reducers/departmentList_reducer';
import DepartmentDataGrid from './DepartmentDataGrid';
import { getDepartmentList, getCurrentPage, getPageSize, getTotalItemsCount, getSortData,getIsFetching,getIsCreated, getSetErrorMessage,getDepartmentListAll } from '../../redux/Selectors/departmentList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class DepartmentContainer extends React.Component {

    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }
        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestDepartmentList(pageNumber);
    }
    onPageChanged = (pageNumber) => {
        this.props.requestDepartmentList(pageNumber);
    }
    onSorting = (sortData) => {
        this.props.sortDepartmentList(sortData)
    }

    onSubmit = (formData) => {
        this.props.filterDepartmentList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteDepartmentItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestDepartmentList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Department List</h1>
                    <NavLink to="/department_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.departmentList == null && this.props.departmentListAll==null && <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.departmentList != null && 
                    <DepartmentDataGrid 
                    departmentList={this.props.departmentList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterDepartmentList={this.props.filterDepartmentList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    departmentListAll={this.props.departmentListAll} 
                    departmentFunction = {this.props.requestDepartmentListAll}
                /> 
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        departmentList: getDepartmentList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching: getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        departmentListAll:getDepartmentListAll(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestDepartmentList,filterDepartmentList,requestDepartmentListAll,sortDepartmentList, deleteDepartmentItem}),
    withRouter
)(DepartmentContainer);