import React from 'react';
import { connect} from 'react-redux';
import {withRouter, NavLink} from "react-router-dom";
import {compose} from "redux";
import swal from 'sweetalert';
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import {requestDeviceDetailList,filterDeviceDetailList, sortDeviceDetailList, deleteDeviceDetailItem, requestDeviceDetailListAll,requestStatusListAll,
    requestSimcardListAll,requestVehicleListAll,requestCompanyListAll,requestDeviceLocationListAll,requestConfigurationListAll,requestProjectListAll,requestRegionListAll} from '../../redux/Reducers/deviceDetailList_reducer'
import {getDeviceDetailList,getSortData ,getCurrentPage, getPageSize, getTotalItemsCount, getIsFetching, getIsCreated,getSetErrorMessage,getDeviceDetailListAll,
    getStatusListAll,getSimcardListAll,getVehicleListAll,getCompanyListAll,getDeviceLocationListAll,getConfigurationListAll,getProjectListAll,getRegionListAll} from '../../redux/Selectors/deviceDetailList_selectors'
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'
import DeviceDetailDataGrid from './DeviceDetailDataGrid';

class DeviceDetailContainer extends React.Component {
    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }
        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestDeviceDetailList(pageNumber);
    }

    onPageChanged = (pageNumber) => {
        console.log(pageNumber)
        this.props.requestDeviceDetailList(pageNumber);
    }

    onSorting = (sortData) => {
        this.props.sortDeviceDetailList(sortData)
    }

    onSubmit = (formData) => {
        this.props.filterDeviceDetailList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteDeviceDetailItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestDeviceDetailList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Device Detail List</h1>
                    <NavLink to="/device_detail_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.deviceDetailList==null&& <Preloader />}
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.deviceDetailList!=null &&
                    <DeviceDetailDataGrid 
                        deviceDetailList={this.props.deviceDetailList} 
                        deleteItem={this.deleteItem}
                        currentPage={this.props.currentPage}
                        pageSize={this.props.pageSize}
                        totalItemsCount={this.props.totalItemsCount}
                        onPageChanged={this.onPageChanged}
                        filterDeviceDetailList={this.props.filterDeviceDetailList}
                        onSorting={this.onSorting}
                        sortData={this.props.sortData}
                        onSubmit={this.onSubmit}
                        deviceDetailListAll={this.props.deviceDetailListAll}
                        statusListAll={this.props.statusListAll}
                        simcardListAll={this.props.simcardListAll}
                        vehicleListAll={this.props.vehicleListAll}
                        companyListAll={this.props.companyListAll}
                        configurationListAll={this.props.configurationListAll}
                        projectListAll={this.props.projectListAll}
                        regionListAll={this.props.regionListAll}
                        deviceLocationListAll={this.props.deviceLocationListAll}
                        requestStatusListAll={this.props.requestStatusListAll}
                        requestSimcardListAll={this.props.requestSimcardListAll}
                        requestVehicleListAll={this.props.requestVehicleListAll}
                        requestCompanyListAll={this.props.requestCompanyListAll}
                        requestDeviceLocationListAll={this.props.requestDeviceLocationListAll}
                        requestConfigurationListAll={this.props.requestConfigurationListAll}
                        requestProjectListAll={this.props.requestProjectListAll}
                        requestRegionListAll={this.props.requestRegionListAll}
                        requestDeviceDetailAll = {this.props.requestDeviceDetailListAll}
                    /> 
                }
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        deviceDetailList: getDeviceDetailList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching:getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        deviceDetailListAll: getDeviceDetailListAll(state),
        statusListAll:getStatusListAll(state),
        simcardListAll:getSimcardListAll(state),
        vehicleListAll:getVehicleListAll(state),
        companyListAll:getCompanyListAll(state),
        deviceLocationListAll:getDeviceLocationListAll(state),
        configurationListAll:getConfigurationListAll(state),
        projectListAll:getProjectListAll(state),
        regionListAll:getRegionListAll(state),
    }
}

export default compose(
    connect(mapStateToProps, {requestDeviceDetailList, filterDeviceDetailList,sortDeviceDetailList,deleteDeviceDetailItem,requestDeviceDetailListAll,requestStatusListAll,
        requestSimcardListAll,requestVehicleListAll,requestCompanyListAll,requestDeviceLocationListAll,requestConfigurationListAll,requestProjectListAll,requestRegionListAll}),
    withRouter
)(DeviceDetailContainer);
