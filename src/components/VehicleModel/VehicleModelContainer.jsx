import React from 'react';
import { connect, DefaultRootState } from 'react-redux';
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import swal from 'sweetalert';
import {requestVehicleModelList, deleteVehicleModelItem} from '../../redux/Reducers/vehicleModelList_reducer'
import {getVehicleModelList, getCurrentPage, getPageSize, getTotalItemsCount, getIsFetching,getSetErrorMessage} from '../../redux/Selectors/vehicleModelList_selectors'
import VehicleModelList from './VehicleModelList';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class VehicleModelContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestVehicleModelList(pageNumber);   
    }

    onPageChanged = (pageNumber) => {
        this.props.requestVehicleModelList(pageNumber);
    }

    deleteItem=(id)=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
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
            } else {
                swal("Is safe!");
            }
          });
    }

    render() {
        return (  
            <div>
            {this.props.isFetching && this.props.vehicleModelList==null? <Preloader /> : null }
            {this.props.setErrorMessage ? <ErrorMessage /> :null}
            {this.props.vehicleModelList!=null &&
                <VehicleModelList 
                    vehicleModelList={this.props.vehicleModelList} 
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
        vehicleModelList: getVehicleModelList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching:getIsFetching(state),
        setErrorMessage: getSetErrorMessage(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestVehicleModelList, deleteVehicleModelItem}),
    withRouter
)(VehicleModelContainer);
