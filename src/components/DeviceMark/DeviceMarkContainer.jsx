import React from 'react';
import { connect } from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import swal from 'sweetalert';
import {compose} from "redux";
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { requestDeviceMarkList,filterDeviceMarkList, sortDeviceMarkList,requestDeviceMarkListAll,deleteDeviceMarkItem } from '../../redux/Reducers/deviceMarkList_reducer';
import DeviceMarkDataGrid from './DeviceMarkDataGrid';
import { getDeviceMarkList, getCurrentPage, getPageSize, getTotalItemsCount, getSortData,getIsFetching,getIsCreated, getSetErrorMessage,getDeviceMarkListAll } from '../../redux/Selectors/deviceMarkList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class DeviceMarkContainer extends React.Component {

    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestDeviceMarkList(pageNumber);
    }
    onPageChanged = (pageNumber) => {
        this.props.requestDeviceMarkList(pageNumber);
    }
    onSorting = (sortData) => {
        this.props.sortDeviceMarkList(sortData)
    }

    onSubmit = (formData) => {
        this.props.filterDeviceMarkList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteDeviceMarkItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestDeviceMarkList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Device Mark List</h1>
                    <NavLink to="/device_mark_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.deviceMarkList == null && this.props.deviceMarkListAll==null && <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.deviceMarkList != null && 
                    <DeviceMarkDataGrid 
                    deviceMarkList={this.props.deviceMarkList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterDeviceMarkList={this.props.filterDeviceMarkList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    deviceMarkListAll={this.props.deviceMarkListAll} 
                    requestDeviceMarkAll = {this.props.requestDeviceMarkListAll}
                /> 
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        deviceMarkList: getDeviceMarkList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching: getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        deviceMarkListAll:getDeviceMarkListAll(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestDeviceMarkList,filterDeviceMarkList,requestDeviceMarkListAll,sortDeviceMarkList, deleteDeviceMarkItem}),
    withRouter
)(DeviceMarkContainer);