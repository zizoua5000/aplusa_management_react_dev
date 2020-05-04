import React from 'react';
import { connect } from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import {compose} from "redux";
import swal from 'sweetalert';
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import {requestVehicleMarkList,deleteVehicleMarkItem} from '../../redux/Reducers/vehicleMarkList_reducer'
import VehicleMarkList from './VehicleMarkList';
import { getVehicleMarkList,getCurrentPage,getPageSize,getTotalItemsCount,getIsCreated,getIsFetching ,getSetErrorMessage } from "../../redux/Selectors/vehicleMarkList_selectors";
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class VehicleMarkContainer extends React.Component {

    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }
        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestVehicleMarkList(pageNumber);
    }

    onPageChanged = (pageNumber) => {
        this.props.requestVehicleMarkList(pageNumber);
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
        return (
            <div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Vehicle Mark List</h1>
                    <NavLink to="/vehicle_mark_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
            {this.props.isFetching && this.props.vehicleMarkList==null ? <Preloader /> : null }
            {this.props.setErrorMessage && <ErrorMessage /> }
            {this.props.vehicleMarkList!=null &&
                <VehicleMarkList 
                    vehicleMarkList={this.props.vehicleMarkList} 
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
        vehicleMarkList: getVehicleMarkList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching:getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state)
    }
}
export default compose(connect(mapStateToProps,{ requestVehicleMarkList,deleteVehicleMarkItem }),withRouter)(VehicleMarkContainer);
