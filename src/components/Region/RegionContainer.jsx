import React from 'react';
import { connect } from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import swal from 'sweetalert';
import {compose} from "redux";
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { requestRegionList,filterRegionList, sortRegionList,requestRegionListAll,deleteRegionItem } from '../../redux/Reducers/vehicleTypeList_reducer';
import RegionDataGrid from './RegionDataGrid';
import { getRegionList, getCurrentPage, getPageSize, getTotalItemsCount, getSortData,getIsFetching,getIsCreated, getSetErrorMessage,getRegionListAll } from '../../redux/Selectors/vehicleTypeList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class RegionContainer extends React.Component {

    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestRegionList(pageNumber);
        // this.props.requestRegionListAll();
    }
    onPageChanged = (pageNumber) => {
        this.props.requestRegionList(pageNumber);
    }
    onSorting = (sortData) => {
        this.props.sortRegionList(sortData)
    }

    onSubmit = (formData) => {
        this.props.filterRegionList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteRegionItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestRegionList(this.props.currentPage);
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
                    <RegionDataGrid 
                    vehicleTypeList={this.props.vehicleTypeList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterRegionList={this.props.filterRegionList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    vehicleTypeListAll={this.props.vehicleTypeListAll} 
                    vehicleTypeFunction = {this.props.requestRegionListAll}
                /> 
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        vehicleTypeList: getRegionList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching: getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        vehicleTypeListAll:getRegionListAll(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestRegionList,filterRegionList,requestRegionListAll,sortRegionList, deleteRegionItem}),
    withRouter
)(RegionContainer);