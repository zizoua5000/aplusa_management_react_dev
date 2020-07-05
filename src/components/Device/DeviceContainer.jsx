import React from 'react';
import { connect} from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import {compose} from "redux";
import swal from 'sweetalert';
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import {requestDeviceList, deleteDeviceItem,filterDeviceList,sortDeviceList,requestDeviceModelListAll,requestDeviceTypeListAll,requestDeviceListAll,requestDeviceLocationListAll,requestConfigurationListAll,
    requestDeviceMarkListAll,requestCompanyListAll,requestDeviceDetailListAll,requestSimcardListAll,requestVehicleListAll,requestProjectListAll,requestRegionListAll,requestStatusListAll} from '../../redux/Reducers/deviceList_reducer'
import {getDeviceList, getCurrentPage, getPageSize, getTotalItemsCount, getIsFetching, getIsCreated,getSetErrorMessage,getDeviceListAll,getDeviceLocationListAll,getStatusListAll,getConfigurationListAll,
    getSortData, getDeviceModelListAll, getDeviceTypeListAll,getDeviceMarkListAll,getCompanyListAll,getDeviceDetailListAll,getSimcardListAll,getVehicleListAll,getProjectListAll,getRegionListAll} from '../../redux/Selectors/deviceList_selectors'
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
                {this.props.isFetching && this.props.deviceList==null && <Preloader /> }
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
                    deviceLocationListAll={this.props.deviceLocationListAll}
                    companyListAll={this.props.companyListAll}
                    simcardListAll={this.props.simcardListAll}
                    vehicleListAll={this.props.vehicleListAll}
                    projectListAll={this.props.projectListAll}
                    regionListAll={this.props.regionListAll}
                    statusListAll={this.props.statusListAll}
                    deviceDetailListAll={this.props.deviceDetailListAll}
                    requestDeviceListAll = {this.props.requestDeviceListAll}
                    requestDeviceModelAll = {this.props.requestDeviceModelListAll}
                    requestDeviceMarkAll = {this.props.requestDeviceMarkListAll}
                    requestDeviceTypeAll = {this.props.requestDeviceTypeListAll}
                    configurationListAll = {this.props.configurationListAll}
                    requestDeviceLocationListAll = {this.props.requestDeviceLocationListAll}
                    requestCompanyListAll = {this.props.requestCompanyListAll}
                    requestSimcardListAll={this.props.requestSimcardListAll}
                    requestVehicleListAll={this.props.requestVehicleListAll}
                    requestProjectListAll={this.props.requestProjectListAll}
                    requestRegionListAll={this.props.requestRegionListAll}
                    requestStatusListAll={this.props.requestStatusListAll}
                    requestConfigurationListAll={this.props.requestConfigurationListAll}
                    requestDeviceDetailListAll={this.props.requestDeviceDetailListAll}
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
        simcardListAll:getSimcardListAll(state),
        vehicleListAll:getVehicleListAll(state),
        projectListAll:getProjectListAll(state),
        regionListAll:getRegionListAll(state),
        deviceLocationListAll:getDeviceLocationListAll(state),
        statusListAll:getStatusListAll(state),
        configurationListAll:getConfigurationListAll(state),
        deviceDetailListAll:getDeviceDetailListAll(state),
    }
}

export default compose(
    connect(mapStateToProps, {requestDeviceList, deleteDeviceItem,filterDeviceList,sortDeviceList,requestDeviceListAll,
        requestDeviceTypeListAll,requestProjectListAll,requestDeviceLocationListAll, requestDeviceModelListAll,
        requestDeviceMarkListAll,requestCompanyListAll,requestDeviceDetailListAll,requestSimcardListAll,
        requestVehicleListAll,requestRegionListAll, requestStatusListAll,requestConfigurationListAll}),
    withRouter
)(DeviceContainer);
