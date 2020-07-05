import React from 'react';
import { connect} from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import {compose} from "redux";
import swal from 'sweetalert';
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import {requestAccessoryList, deleteAccessoryItem,filterAccessoryList,sortAccessoryList,requestAccessoryModelListAll,
    requestAccessoryTypeListAll,requestAccessoryListAll,requestCompanyListAll} from '../../redux/Reducers/accessoryList_reducer'
import {getAccessoryList, getCurrentPage, getPageSize, getTotalItemsCount, getIsFetching, getIsCreated,getSetErrorMessage,
    getAccessoryListAll,getSortData, getAccessoryModelListAll, getAccessoryTypeListAll,getCompanyListAll} from '../../redux/Selectors/accessoryList_selectors'
import AccessoryDataGrid from './AccessoryDataGrid'
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class AccessoryContainer extends React.Component {
    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }
        console.log(this.props)

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestAccessoryList(pageNumber);   
    }
    
    onPageChanged = (pageNumber) => {
        this.props.requestAccessoryList(pageNumber);
    }
    onSorting = (sortData) => {

        this.props.sortAccessoryList(sortData)
    }

    onSubmit = (formData) => {

        this.props.filterAccessoryList(formData);
    }


    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteAccessoryItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestAccessoryList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Accessory List</h1>
                    <NavLink to="/accessory_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.accessoryList==null && <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.accessoryList!=null &&
                    <AccessoryDataGrid 
                    accessoryList={this.props.accessoryList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterAccessoryList={this.props.filterAccessoryList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    accessoryListAll={this.props.accessoryListAll}
                    companyListAll={this.props.companyListAll}
                    accessoryModelListAll={this.props.accessoryModelListAll}
                    accessoryTypeListAll={this.props.accessoryTypeListAll}
                    accessoryMarkListAll={this.props.accessoryMarkListAll}
                    requestAccessoryListAll = {this.props.requestAccessoryListAll}
                    requestCompanyListAll={this.props.requestCompanyListAll}
                    requestAccessoryModelAll = {this.props.requestAccessoryModelListAll}
                    requestAccessoryTypeAll = {this.props.requestAccessoryTypeListAll}
                /> 
                }
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        accessoryList: getAccessoryList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching:getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        accessoryListAll:getAccessoryListAll(state),
        companyListAll:getCompanyListAll(state),
        accessoryModelListAll:getAccessoryModelListAll(state),
        accessoryTypeListAll:getAccessoryTypeListAll(state),
    }
}

export default compose(
    connect(mapStateToProps, {requestAccessoryList, deleteAccessoryItem,filterAccessoryList,sortAccessoryList,
        requestAccessoryListAll,requestAccessoryTypeListAll,requestAccessoryModelListAll,requestCompanyListAll}),
    withRouter
)(AccessoryContainer);
