import React from 'react';
import { connect} from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import {compose} from "redux";
import swal from 'sweetalert';
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import {requestPersonList, deletePersonItem,filterPersonList,sortPersonList,requestPersonListAll,requestCompanyList,requestDepartmentList,requestJobTitleList,requestUserList} from '../../redux/Reducers/personList_reducer'
import {getPersonList, getCurrentPage, getPageSize, getTotalItemsCount, getIsFetching, getIsCreated,getSetErrorMessage,getPersonListAll,getSortData,getCompanyList,getDepartmentList,getJobTitleList,getUserList} from '../../redux/Selectors/personList_selectors'
import PersonDataGrid from './PersonDataGrid'
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class PersonContainer extends React.Component {
    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestPersonList(pageNumber);   
    }
    
    onPageChanged = (pageNumber) => {
        this.props.requestPersonList(pageNumber);
    }
    onSorting = (sortData) => {

        this.props.sortPersonList(sortData)
    }

    onSubmit = (formData) => {

        this.props.filterPersonList(formData);
    }


    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deletePersonItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestPersonList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Person List</h1>
                    <NavLink to="/person_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.personList==null && this.props.personListAll==null && <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.personList!=null &&
                    <PersonDataGrid 
                    personList={this.props.personList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterPersonList={this.props.filterPersonList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    personListAll={this.props.personListAll}
                    companyList={this.props.companyList}
                    departmentList={this.props.departmentList}
                    jobTitleList={this.props.jobTitleList}
                    userList={this.props.userList}
                    requestPersonListAll = {this.props.requestPersonListAll}
                    requestCompanyList = {this.props.requestCompanyList}
                    requestDepartmentList = {this.props.requestDepartmentList}
                    requestJobTitleList = {this.props.requestJobTitleList}
                    requestUserList = {this.props.requestUserList}
                    />
                }
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        personList: getPersonList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching:getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        personListAll:getPersonListAll(state),
        companyList:getCompanyList(state),
        departmentList:getDepartmentList(state),
        jobTitleList:getJobTitleList(state),
        userList:getUserList(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestPersonList, deletePersonItem,filterPersonList,sortPersonList,requestPersonListAll,requestComapanyList,requestDepartmentList,requestJobTitleList,requestUserList}),
    withRouter
)(PersonContainer);
