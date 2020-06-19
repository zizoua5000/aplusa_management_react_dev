import React from 'react';
import { connect} from 'react-redux';
import {withRouter, NavLink} from "react-router-dom";
import {compose} from "redux";
import swal from 'sweetalert';
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import {requestVehicleModelList,filterVehicleModelList, sortVehicleModelList, requestVehicleMarkList, deleteVehicleModelItem, requestVehicleModelListAll} from '../../redux/Reducers/vehicleModelList_reducer'
import {getVehicleModelList, getVehicleMarkList,getSortData ,getCurrentPage, getPageSize, getTotalItemsCount, getIsFetching, getIsCreated,getSetErrorMessage,getVehicleModelListAll} from '../../redux/Selectors/vehicleModelList_selectors'
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'
import VehicleModelDataGrid from './VehicleModelDataGrid';

class VehicleModelContainer extends React.Component {
    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }
        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestVehicleModelList(pageNumber);
        // this.props.requestVehicleMarkList();   
        // this.props.requestVehicleModelListAll();
    }

    onPageChanged = (pageNumber) => {
        this.props.requestVehicleModelList(pageNumber);
    }

    onSorting = (sortData) => {
        this.props.sortVehicleModelList(sortData)
    }

    onSubmit = (formData) => {
        this.props.filterVehicleModelList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteVehicleModelItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestVehicleModelList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Vehicle Model List</h1>
                    <NavLink to="/vehicle_model_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.vehicleModelList==null&& this.props.vehicleModelListAll==null&& <Preloader />}
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.vehicleModelList!=null &&
                    <VehicleModelDataGrid 
                        vehicleModelList={this.props.vehicleModelList} 
                        vehicleMarkList={this.props.vehicleMarkList}
                        deleteItem={this.deleteItem}
                        currentPage={this.props.currentPage}
                        pageSize={this.props.pageSize}
                        totalItemsCount={this.props.totalItemsCount}
                        onPageChanged={this.onPageChanged}
                        filterVehicleModelList={this.props.filterVehicleModelList}
                        onSorting={this.onSorting}
                        sortData={this.props.sortData}
                        onSubmit={this.onSubmit}
                        vehicleModelListAll={this.props.vehicleModelListAll}
                        vehicleModelFunction = {this.props.requestVehicleModelListAll}
                        vehicleMarkFunction = {this.props.requestVehicleMarkList}
                    /> 
                }
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        vehicleModelList: getVehicleModelList(state),
        vehicleMarkList: getVehicleMarkList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching:getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        vehicleModelListAll:getVehicleModelListAll(state),

    }
}

export default compose(
    connect(mapStateToProps, {requestVehicleModelList, filterVehicleModelList,sortVehicleModelList,requestVehicleMarkList,deleteVehicleModelItem,requestVehicleModelListAll}),
    withRouter
)(VehicleModelContainer);
