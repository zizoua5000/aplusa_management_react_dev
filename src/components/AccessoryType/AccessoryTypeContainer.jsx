import React from 'react';
import { connect } from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import swal from 'sweetalert';
import {compose} from "redux";
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { requestAccessoryTypeList,filterAccessoryTypeList, sortAccessoryTypeList,requestAccessoryTypeListAll,deleteAccessoryTypeItem } from '../../redux/Reducers/accessoryTypeList_reducer';
import AccessoryTypeDataGrid from './AccessoryTypeDataGrid';
import { getAccessoryTypeList, getCurrentPage, getPageSize, getTotalItemsCount, getSortData,getIsFetching,getIsCreated, getSetErrorMessage,getAccessoryTypeListAll } from '../../redux/Selectors/accessoryTypeList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class AccessoryTypeContainer extends React.Component {

    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestAccessoryTypeList(pageNumber);
    }
    onPageChanged = (pageNumber) => {
        this.props.requestAccessoryTypeList(pageNumber);
    }
    onSorting = (sortData) => {
        this.props.sortAccessoryTypeList(sortData)
    }

    onSubmit = (formData) => {
        this.props.filterAccessoryTypeList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteAccessoryTypeItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestAccessoryTypeList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Accessory Type List</h1>
                    <NavLink to="/accessory_type_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.accessoryTypeList == null&& <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.accessoryTypeList != null && 
                    <AccessoryTypeDataGrid 
                    accessoryTypeList={this.props.accessoryTypeList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterAccessoryTypeList={this.props.filterAccessoryTypeList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    accessoryTypeListAll={this.props.accessoryTypeListAll} 
                    requestAccessoryTypeAll = {this.props.requestAccessoryTypeListAll}
                /> 
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accessoryTypeList: getAccessoryTypeList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching: getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        accessoryTypeListAll:getAccessoryTypeListAll(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestAccessoryTypeList,filterAccessoryTypeList,requestAccessoryTypeListAll,sortAccessoryTypeList, deleteAccessoryTypeItem}),
    withRouter
)(AccessoryTypeContainer);