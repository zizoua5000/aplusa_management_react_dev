import React from 'react';
import { connect } from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import swal from 'sweetalert';
import {compose} from "redux";
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { requestStatusList,filterStatusList, sortStatusList,requestStatusListAll,deleteStatusItem } from '../../redux/Reducers/statusList_reducer';
import StatusDataGrid from './StatusDataGrid';
import { getStatusList, getCurrentPage, getPageSize, getTotalItemsCount, getSortData,getIsFetching,getIsCreated, getSetErrorMessage,getStatusListAll } from '../../redux/Selectors/statusList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class StatusContainer extends React.Component {

    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestStatusList(pageNumber);
        // this.props.requestStatusListAll();
    }
    onPageChanged = (pageNumber) => {
        this.props.requestStatusList(pageNumber);
    }
    onSorting = (sortData) => {
        this.props.sortStatusList(sortData)
    }

    onSubmit = (formData) => {
        this.props.filterStatusList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteStatusItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestStatusList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Status List</h1>
                    <NavLink to="/status_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.statusList == null && this.props.statusListAll==null && <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.statusList != null && 
                    <StatusDataGrid 
                    statusList={this.props.statusList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterStatusList={this.props.filterStatusList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    statusListAll={this.props.statusListAll} 
                    statusFunction = {this.props.requestStatusListAll}
                /> 
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        statusList: getStatusList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching: getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        statusListAll:getStatusListAll(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestStatusList,filterStatusList,requestStatusListAll,sortStatusList, deleteStatusItem}),
    withRouter
)(StatusContainer);