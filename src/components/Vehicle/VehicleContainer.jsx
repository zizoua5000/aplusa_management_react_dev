import React from 'react';
import { connect} from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import {compose} from "redux";
import swal from 'sweetalert';
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import {requestVehicleList, deleteVehicleItem,filterVehicleList,sortVehicleList,requestVehicleModelListAll,requestVehicleTypeListAll,requestVehicleListAll,requestVehicleMarkListAll} from '../../redux/Reducers/vehicleList_reducer'
import {getVehicleList, getCurrentPage, getPageSize, getTotalItemsCount, getIsFetching, getIsCreated,getSetErrorMessage,getVehicleListAll,getSortData, getVehicleModelListAll, getVehicleTypeListAll,getVehicleMarkListAll} from '../../redux/Selectors/vehicleList_selectors'
import VehicleDataGrid from './VehicleDataGrid'
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class VehicleContainer extends React.Component {
    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }
        console.log(this.props)

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestVehicleList(pageNumber);   
    }
    
    onPageChanged = (pageNumber) => {
        this.props.requestVehicleList(pageNumber);
    }
    onSorting = (sortData) => {

        this.props.sortVehicleList(sortData)
    }

    onSubmit = (formData) => {

        this.props.filterVehicleList(formData);
    }


    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteVehicleItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestVehicleList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Vehicle List</h1>
                    <NavLink to="/vehicle_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.vehicleList!=null &&
                    <VehicleDataGrid 
                    vehicleList={this.props.vehicleList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterVehicleList={this.props.filterVehicleList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    vehicleListAll={this.props.vehicleListAll}
                    vehicleModelListAll={this.props.vehicleModelListAll}
                    vehicleTypeListAll={this.props.vehicleTypeListAll}
                    vehicleMarkListAll={this.props.vehicleMarkListAll}
                    requestVehicleListAll = {this.props.requestVehicleListAll}
                    requestVehicleModelAll = {this.props.requestVehicleModelListAll}
                    requestVehicleMarkAll = {this.props.requestVehicleMarkListAll}
                    requestVehicleTypeAll = {this.props.requestVehicleTypeListAll}
                /> 
                }
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        vehicleList: getVehicleList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching:getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        vehicleListAll:getVehicleListAll(state),
        vehicleModelListAll:getVehicleModelListAll(state),
        vehicleMarkListAll:getVehicleMarkListAll(state),
        vehicleTypeListAll:getVehicleTypeListAll(state),
    }
}

export default compose(
    connect(mapStateToProps, {requestVehicleList, deleteVehicleItem,filterVehicleList,sortVehicleList,requestVehicleListAll,requestVehicleTypeListAll,requestVehicleModelListAll,requestVehicleMarkListAll}),
    withRouter
)(VehicleContainer);
