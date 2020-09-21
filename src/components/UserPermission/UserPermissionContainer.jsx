import React from 'react';
import { connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {custom_success_alert} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import {requestUserPermissionList,filterUserPermissionList,sortUserPermissionList,requestUserPermissionListAll,requestUserList,requestPermissionList} from '../../redux/Reducers/userPermissionList_reducer'
import {getUserPermissionList, getCurrentPage, getPageSize, getTotalItemsCount, getIsFetching, getIsCreated,getSetErrorMessage,getUserPermissionListAll,getSortData, getUserList,getPermissionList} from '../../redux/Selectors/userPermissionList_selectors'
import UserPermissionDataGrid from './UserPermissionDataGrid'
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class UserPermissionContainer extends React.Component {
    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestUserPermissionList(pageNumber);   
    }
    
    onPageChanged = (pageNumber) => {
        this.props.requestUserPermissionList(pageNumber);
    }
    onSorting = (sortData) => {

        this.props.sortUserPermissionList(sortData)
    }

    onSubmit = (formData) => {

        this.props.filterUserPermissionList(formData);
    }

    render() {
        return (  
            <div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">User Permission List</h1>
                </div>
                {this.props.isFetching && this.props.userPermissionList==null && this.props.userPermissionListAll==null && <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.userPermissionList!=null &&
                    <UserPermissionDataGrid 
                    userPermissionList={this.props.userPermissionList} 
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterUserPermissionList={this.props.filterUserPermissionList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    userPermissionListAll={this.props.userPermissionListAll}
                    userList={this.props.userList}
                    permissionList={this.props.permissionList}
                    requestUserPermissionListAll = {this.props.requestUserPermissionListAll}
                    requestUserList = {this.props.requestUserList}
                    requestPermissionList = {this.props.requestPermissionList}
                    />
                }
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        userPermissionList: getUserPermissionList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching:getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        userPermissionListAll:getUserPermissionListAll(state),
        userList:getUserList(state),
        permissionList:getPermissionList(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestUserPermissionList,filterUserPermissionList,sortUserPermissionList,requestUserPermissionListAll,requestUserList,requestPermissionList}),
    withRouter
)(UserPermissionContainer);
