import React from 'react';
import { connect} from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import {compose} from "redux";
import swal from 'sweetalert';
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import {requestPermissionList, deletePermissionItem,filterPermissionList,sortPermissionList,requestPermissionListAll,requestContentTypeList} from '../../redux/Reducers/permissionList_reducer'
import {getPermissionList, getCurrentPage, getPageSize, getTotalItemsCount, getIsFetching, getIsCreated,getSetErrorMessage,getPermissionListAll,getSortData, getContentTypeList} from '../../redux/Selectors/permissionList_selectors'
import PermissionDataGrid from './PermissionDataGrid'
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class PermissionContainer extends React.Component {
    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestPermissionList(pageNumber);   
    }
    
    onPageChanged = (pageNumber) => {
        this.props.requestPermissionList(pageNumber);
    }

    onSorting = (sortData) => {

        this.props.sortPermissionList(sortData)
    }

    onSubmit = (formData) => {

        this.props.filterPermissionList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deletePermissionItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestPermissionList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Permission List</h1>
                    <NavLink to="/permission_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.permissionList==null && this.props.permissionListAll==null && <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.permissionList!=null &&
                    <PermissionDataGrid 
                    permissionList={this.props.permissionList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterPermissionList={this.props.filterPermissionList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    permissionListAll={this.props.permissionListAll}
                    contentTypeList={this.props.contentTypeList}
                    requestPermissionListAll = {this.props.requestPermissionListAll}
                    requestContentTypeList = {this.props.requestContentTypeList}
                    />
                }
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        permissionList: getPermissionList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching:getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        permissionListAll:getPermissionListAll(state),
        contentTypeList:getContentTypeList(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestPermissionList, deletePermissionItem,filterPermissionList,sortPermissionList,requestPermissionListAll,requestContentTypeList}),
    withRouter
)(PermissionContainer);
