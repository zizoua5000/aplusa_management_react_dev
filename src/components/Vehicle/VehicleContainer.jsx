import React from 'react';
import { connect} from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import {compose} from "redux";
import swal from 'sweetalert';
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import {requestVehicleList, deleteVehicleItem} from '../../redux/Reducers/vehicleList_reducer'
import {getVehicleList, getCurrentPage, getPageSize, getTotalItemsCount, getIsFetching, getIsCreated,getSetErrorMessage} from '../../redux/Selectors/vehicleList_selectors'
import VehicleList from './VehicleList';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class VehicleContainer extends React.Component {
    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }
        console.log("DID MOUNT")
        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestVehicleList(pageNumber);   
    }

    onPageChanged = (pageNumber) => {
        this.props.requestVehicleList(pageNumber);
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
        console.log(this.props)
        return (  
            <div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Vehicle List</h1>
                    <NavLink to="/vehicle_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.vehicleList==null? <Preloader /> : null }
                {this.props.setErrorMessage && <ErrorMessage />}
                {this.props.vehicleList!=null &&
                    <VehicleList 
                        vehicleList={this.props.vehicleList} 
                        deleteItem={this.deleteItem}
                        currentPage={this.props.currentPage}
                        pageSize={this.props.pageSize}
                        totalItemsCount={this.props.totalItemsCount}
                        onPageChanged={this.onPageChanged}
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
        setErrorMessage: getSetErrorMessage(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestVehicleList, deleteVehicleItem}),
    withRouter
)(VehicleContainer);
