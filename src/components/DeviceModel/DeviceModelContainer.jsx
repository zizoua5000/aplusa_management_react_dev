import React from 'react';
import { connect} from 'react-redux';
import {withRouter, NavLink} from "react-router-dom";
import {compose} from "redux";
import swal from 'sweetalert';
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import {requestDeviceModelList,filterDeviceModelList, sortDeviceModelList, requestDeviceMarkListAll, deleteDeviceModelItem, requestDeviceModelListAll} from '../../redux/Reducers/deviceModelList_reducer'
import {getDeviceModelList, getDeviceMarkListAll,getSortData ,getCurrentPage, getPageSize, getTotalItemsCount, getIsFetching, getIsCreated,getSetErrorMessage,getDeviceModelListAll} from '../../redux/Selectors/deviceModelList_selectors'
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'
import DeviceModelDataGrid from './DeviceModelDataGrid';

class DeviceModelContainer extends React.Component {
    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }
        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestDeviceModelList(pageNumber);
    }

    onPageChanged = (pageNumber) => {
        console.log(pageNumber)
        this.props.requestDeviceModelList(pageNumber);
    }

    onSorting = (sortData) => {
        this.props.sortDeviceModelList(sortData)
    }

    onSubmit = (formData) => {
        this.props.filterDeviceModelList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteDeviceModelItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestDeviceModelList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Device Model List</h1>
                    <NavLink to="/device_model_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.deviceModelList==null&& this.props.deviceModelListAll==null&& <Preloader />}
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.deviceModelList!=null &&
                    <DeviceModelDataGrid 
                        deviceModelList={this.props.deviceModelList} 
                        deviceMarkListAll={this.props.deviceMarkListAll}
                        deleteItem={this.deleteItem}
                        currentPage={this.props.currentPage}
                        pageSize={this.props.pageSize}
                        totalItemsCount={this.props.totalItemsCount}
                        onPageChanged={this.onPageChanged}
                        filterDeviceModelList={this.props.filterDeviceModelList}
                        onSorting={this.onSorting}
                        sortData={this.props.sortData}
                        onSubmit={this.onSubmit}
                        deviceModelListAll={this.props.deviceModelListAll}
                        requestDeviceModelAll = {this.props.requestDeviceModelListAll}
                        requestDeviceMarkAll = {this.props.requestDeviceMarkListAll}
                    /> 
                }
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        deviceModelList: getDeviceModelList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching:getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        deviceMarkListAll: getDeviceMarkListAll(state),
        deviceModelListAll: getDeviceModelListAll(state),
    }
}

export default compose(
    connect(mapStateToProps, {requestDeviceModelList, filterDeviceModelList,sortDeviceModelList,requestDeviceMarkListAll,deleteDeviceModelItem,requestDeviceModelListAll}),
    withRouter
)(DeviceModelContainer);
