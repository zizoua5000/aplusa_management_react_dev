import React from 'react';
import { connect} from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import {compose} from "redux";
import swal from 'sweetalert';
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import {requestDeviceList, deleteDeviceItem,filterDeviceList,sortDeviceList,requestDeviceModelListAll,requestDeviceTypeListAll,requestDeviceListAll,requestDeviceMarkListAll,requestCompanyListAll} from '../../redux/Reducers/deviceList_reducer'
import {getDeviceList, getCurrentPage, getPageSize, getTotalItemsCount, getIsFetching, getIsCreated,getSetErrorMessage,getDeviceListAll,getSortData, getDeviceModelListAll, getDeviceTypeListAll,getDeviceMarkListAll,getCompanyListAll} from '../../redux/Selectors/deviceList_selectors'
import DeviceDataGrid from './DeviceDataGrid'
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class DeviceContainer extends React.Component {
    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }
        console.log(this.props)

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestDeviceList(pageNumber);   
    }
    
    onPageChanged = (pageNumber) => {
        this.props.requestDeviceList(pageNumber);
    }
    onSorting = (sortData) => {

        this.props.sortDeviceList(sortData)
    }

    onSubmit = (formData) => {

        this.props.filterDeviceList(formData);
    }


    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteDeviceItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestDeviceList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Device List</h1>
                    <NavLink to="/device_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.deviceList==null&&this.props.deviceListAll==null&& <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.deviceList!=null &&
                    <DeviceDataGrid 
                    deviceList={this.props.deviceList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterDeviceList={this.props.filterDeviceList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    deviceListAll={this.props.deviceListAll}
                    deviceModelListAll={this.props.deviceModelListAll}
                    deviceTypeListAll={this.props.deviceTypeListAll}
                    deviceMarkListAll={this.props.deviceMarkListAll}
                    companyListAll={this.props.companyListAll}
                    requestDeviceListAll = {this.props.requestDeviceListAll}
                    requestDeviceModelAll = {this.props.requestDeviceModelListAll}
                    requestDeviceMarkAll = {this.props.requestDeviceMarkListAll}
                    requestDeviceTypeAll = {this.props.requestDeviceTypeListAll}
                    requestCompanyListAll = {this.props.requestCompanyListAll}
                /> 
                }
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        deviceList: getDeviceList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching:getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        deviceListAll:getDeviceListAll(state),
        deviceModelListAll:getDeviceModelListAll(state),
        deviceMarkListAll:getDeviceMarkListAll(state),
        deviceTypeListAll:getDeviceTypeListAll(state),
        companyListAll:getCompanyListAll(state),
    }
}

export default compose(
    connect(mapStateToProps, {requestDeviceList, deleteDeviceItem,filterDeviceList,sortDeviceList,requestDeviceListAll,requestDeviceTypeListAll,requestDeviceModelListAll,requestDeviceMarkListAll,requestCompanyListAll}),
    withRouter
)(DeviceContainer);
