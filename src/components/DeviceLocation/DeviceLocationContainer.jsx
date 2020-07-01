import React from 'react';
import { connect } from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import swal from 'sweetalert';
import {compose} from "redux";
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { requestDeviceLocationList,filterDeviceLocationList, sortDeviceLocationList,requestDeviceLocationListAll,deleteDeviceLocationItem } from '../../redux/Reducers/deviceLocationList_reducer';
import DeviceLocationDataGrid from './DeviceLocationDataGrid';
import { getDeviceLocationList, getCurrentPage, getPageSize, getTotalItemsCount, getSortData,getIsFetching,getIsCreated, getSetErrorMessage,getDeviceLocationListAll } from '../../redux/Selectors/deviceLocationList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class DeviceLocationContainer extends React.Component {

    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestDeviceLocationList(pageNumber);
    }
    onPageChanged = (pageNumber) => {
        this.props.requestDeviceLocationList(pageNumber);
    }
    onSorting = (sortData) => {
        this.props.sortDeviceLocationList(sortData)
    }

    onSubmit = (formData) => {
        this.props.filterDeviceLocationList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteDeviceLocationItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestDeviceLocationList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Device Location List</h1>
                    <NavLink to="/device_location_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching&& <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.deviceLocationList != null && 
                    <DeviceLocationDataGrid 
                    deviceLocationList={this.props.deviceLocationList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterDeviceLocationList={this.props.filterDeviceLocationList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    deviceLocationListAll={this.props.deviceLocationListAll} 
                    requestDeviceLocationAll = {this.props.requestDeviceLocationListAll}
                /> 
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        deviceLocationList: getDeviceLocationList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching: getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        deviceLocationListAll:getDeviceLocationListAll(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestDeviceLocationList,filterDeviceLocationList,requestDeviceLocationListAll,sortDeviceLocationList, deleteDeviceLocationItem}),
    withRouter
)(DeviceLocationContainer);