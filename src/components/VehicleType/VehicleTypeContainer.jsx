import React from 'react';
import { connect } from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import swal from 'sweetalert';
import {compose} from "redux";
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { requestVehicleTypeList,filterVehicleTypeList, sortVehicleTypeList,requestVehicleTypeListAll,deleteVehicleTypeItem } from '../../redux/Reducers/vehicleTypeList_reducer';
import VehicleTypeDataGrid from './VehicleTypeDataGrid';
import { getVehicleTypeList, getCurrentPage, getPageSize, getTotalItemsCount, getSortData,getIsFetching,getIsCreated, getSetErrorMessage,getVehicleTypeListAll } from '../../redux/Selectors/vehicleTypeList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class VehicleTypeContainer extends React.Component {

    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestVehicleTypeList(pageNumber);
    }
    onPageChanged = (pageNumber) => {
        this.props.requestVehicleTypeList(pageNumber);
    }
    onSorting = (sortData) => {
        this.props.sortVehicleTypeList(sortData)
    }

    onSubmit = (formData) => {
        this.props.filterVehicleTypeList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteVehicleTypeItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestVehicleTypeList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Vehicle Type List</h1>
                    <NavLink to="/vehicle_type_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.vehicleTypeList == null && this.props.vehicleTypeListAll==null && <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.vehicleTypeList != null && 
                    <VehicleTypeDataGrid 
                    vehicleTypeList={this.props.vehicleTypeList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterVehicleTypeList={this.props.filterVehicleTypeList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    vehicleTypeListAll={this.props.vehicleTypeListAll} 
                    requestVehicleTypeAll = {this.props.requestVehicleTypeListAll}
                /> 
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        vehicleTypeList: getVehicleTypeList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching: getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        vehicleTypeListAll:getVehicleTypeListAll(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestVehicleTypeList,filterVehicleTypeList,requestVehicleTypeListAll,sortVehicleTypeList, deleteVehicleTypeItem}),
    withRouter
)(VehicleTypeContainer);