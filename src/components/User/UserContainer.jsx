import React from 'react';
import { connect} from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import {compose} from "redux";
import swal from 'sweetalert';
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import {requestUserList, deleteUserItem,filterUserList,sortUserList,requestUserListAll} from '../../redux/Reducers/userList_reducer'
import {getUserList, getCurrentPage, getPageSize, getTotalItemsCount, getIsFetching, getIsCreated,getSetErrorMessage,getUserListAll,getSortData} from '../../redux/Selectors/userList_selectors'
import UserDataGrid from './UserDataGrid'
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class UserContainer extends React.Component {
    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestUserList(pageNumber);   
    }
    
    onPageChanged = (pageNumber) => {
        this.props.requestUserList(pageNumber);
    }
    onSorting = (sortData) => {

        this.props.sortUserList(sortData)
    }

    onSubmit = (formData) => {

        this.props.filterUserList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteUserItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestUserList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">User List</h1>
                    <NavLink to="/user_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.userList==null && this.props.userListAll==null && <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.userList!=null &&
                    <UserDataGrid 
                    userList={this.props.userList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterUserList={this.props.filterUserList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    userListAll={this.props.userListAll}
                    requestUserListAll = {this.props.requestUserListAll}
                    />
                }
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        userList: getUserList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching:getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        userListAll:getUserListAll(state),
    }
}

export default compose(
    connect(mapStateToProps, {requestUserList, deleteUserItem,filterUserList,sortUserList,requestUserListAll}),
    withRouter
)(UserContainer);
