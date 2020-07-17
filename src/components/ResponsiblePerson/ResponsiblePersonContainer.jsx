import React from 'react';
import { connect } from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import swal from 'sweetalert';
import {compose} from "redux";
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { requestResponsiblePersonList,filterResponsiblePersonList, sortResponsiblePersonList,
    requestResponsiblePersonListAll,deleteResponsiblePersonItem,requestPersonListAll,requestDepartmentListAll } from '../../redux/Reducers/responsiblePersonList_reducer';
import ResponsiblePersonDataGrid from './ResponsiblePersonDataGrid';
import { getResponsiblePersonList, getCurrentPage, getPageSize, getTotalItemsCount, getSortData,getIsFetching,getIsCreated,
    getSetErrorMessage,getResponsiblePersonListAll,getDepartmentListAll,getPersonListAll } from '../../redux/Selectors/responsiblePersonList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class ResponsiblePersonContainer extends React.Component {

    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestResponsiblePersonList(pageNumber);
        console.log(this.props)
    }
    onPageChanged = (pageNumber) => {
        this.props.requestResponsiblePersonList(pageNumber);
    }
    onSorting = (sortData) => {
        this.props.sortResponsiblePersonList(sortData)
    }

    onSubmit = (formData) => {
        this.props.filterResponsiblePersonList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteResponsiblePersonItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestResponsiblePersonList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Responsible Person List</h1>
                    <NavLink to="/responsible_person_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.responsiblePersonList == null && this.props.responsiblePersonListAll==null && <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.responsiblePersonList != null && 
                    <ResponsiblePersonDataGrid 
                    responsiblePersonList={this.props.responsiblePersonList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterResponsiblePersonList={this.props.filterResponsiblePersonList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    responsiblePersonListAll={this.props.responsiblePersonListAll} 
                    requestResponsiblePersonAll = {this.props.requestResponsiblePersonListAll}
                    departmentListAll={this.props.departmentListAll}
                    requestDepartmentListAll={this.props.requestDepartmentListAll}
                    personListAll={this.props.personListAll}
                    requestPersonListAll={this.props.requestPersonListAll}
                /> 
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        responsiblePersonList: getResponsiblePersonList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching: getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        responsiblePersonListAll:getResponsiblePersonListAll(state),
        departmentListAll:getDepartmentListAll(state),
        personListAll:getPersonListAll(state),
    }
}

export default compose(
    connect(mapStateToProps, {requestResponsiblePersonList,filterResponsiblePersonList,requestResponsiblePersonListAll,
        sortResponsiblePersonList, deleteResponsiblePersonItem,requestDepartmentListAll,requestPersonListAll}),
    withRouter
)(ResponsiblePersonContainer);