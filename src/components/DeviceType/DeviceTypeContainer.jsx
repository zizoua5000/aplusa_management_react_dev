import React from 'react';
import { connect } from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import swal from 'sweetalert';
import {compose} from "redux";
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { requestDeviceTypeList,filterDeviceTypeList, sortDeviceTypeList,requestDeviceTypeListAll,deleteDeviceTypeItem } from '../../redux/Reducers/deviceTypeList_reducer';
import DeviceTypeDataGrid from './DeviceTypeDataGrid';
import { getDeviceTypeList, getCurrentPage, getPageSize, getTotalItemsCount, getSortData,getIsFetching,getIsCreated, getSetErrorMessage,getDeviceTypeListAll } from '../../redux/Selectors/deviceTypeList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class DeviceTypeContainer extends React.Component {

    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestDeviceTypeList(pageNumber);
    }
    onPageChanged = (pageNumber) => {
        this.props.requestDeviceTypeList(pageNumber);
    }
    onSorting = (sortData) => {
        this.props.sortDeviceTypeList(sortData)
    }

    onSubmit = (formData) => {
        this.props.filterDeviceTypeList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteDeviceTypeItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestDeviceTypeList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Device Type List</h1>
                    <NavLink to="/device_type_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching&& <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.deviceTypeList != null && 
                    <DeviceTypeDataGrid 
                    deviceTypeList={this.props.deviceTypeList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterDeviceTypeList={this.props.filterDeviceTypeList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    deviceTypeListAll={this.props.deviceTypeListAll} 
                    requestDeviceTypeAll = {this.props.requestDeviceTypeListAll}
                /> 
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        deviceTypeList: getDeviceTypeList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching: getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        deviceTypeListAll:getDeviceTypeListAll(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestDeviceTypeList,filterDeviceTypeList,requestDeviceTypeListAll,sortDeviceTypeList, deleteDeviceTypeItem}),
    withRouter
)(DeviceTypeContainer);