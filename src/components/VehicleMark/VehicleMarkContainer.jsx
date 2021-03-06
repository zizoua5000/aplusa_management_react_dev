import React from 'react';
import { connect } from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import {compose} from "redux";
import swal from 'sweetalert';
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import {requestVehicleMarkList,deleteVehicleMarkItem,filterVehicleMarkList, sortVehicleMarkList,requestVehicleMarkListAll} from '../../redux/Reducers/vehicleMarkList_reducer'
import VehicleMarkDataGrid from './VehicleMarkDataGrid';
import { getVehicleMarkList,getCurrentPage,getPageSize,getTotalItemsCount,
    getIsCreated,getIsFetching ,getSetErrorMessage,getVehicleMarkListAll,getSortData } from "../../redux/Selectors/vehicleMarkList_selectors";
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class VehicleMarkContainer extends React.Component {

    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }
        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestVehicleMarkList(pageNumber);
        console.log(this.props)
        
    }

    onPageChanged = (pageNumber) => {
        this.props.requestVehicleMarkList(pageNumber);
    }
    onSorting = (sortData) => {
        this.props.sortVehicleMarkList(sortData)
    }
    onSubmit = (formData) => {
        this.props.filterVehicleMarkList(formData);
    }
    
    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let response=this.props.deleteVehicleMarkItem(id)
                response.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestVehicleMarkList(this.props.currentPage);
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
        console.log(this.props)
        return (
            <div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Vehicle Mark List</h1>
                    <NavLink to="/vehicle_mark_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
            {this.props.isFetching && this.props.vehicleMarkList==null &&this.props.vehicleMarkListAll&& <Preloader /> }
            {this.props.setErrorMessage!=null && <ErrorMessage /> }
            {this.props.vehicleMarkList!=null &&
                <VehicleMarkDataGrid 
                vehicleMarkList={this.props.vehicleMarkList} 
                deleteItem={this.deleteItem}
                currentPage={this.props.currentPage}
                pageSize={this.props.pageSize}
                totalItemsCount={this.props.totalItemsCount}
                onPageChanged={this.onPageChanged}
                filterVehicleMarkList={this.props.filterVehicleMarkList}
                onSorting={this.onSorting}
                sortData={this.props.sortData}
                onSubmit={this.onSubmit}
                vehicleMarkListAll={this.props.vehicleMarkListAll}
                requestVehicleMarkListAll={this.props.requestVehicleMarkListAll}
                /> 
            }
            </div>
        );
    }


}

let mapStateToProps = (state) => {
    return {
        vehicleMarkList: getVehicleMarkList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching:getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        vehicleMarkListAll:getVehicleMarkListAll(state)
    }
}
export default compose(connect(mapStateToProps,{ requestVehicleMarkList,deleteVehicleMarkItem,filterVehicleMarkList, sortVehicleMarkList,requestVehicleMarkListAll }),withRouter)(VehicleMarkContainer);
