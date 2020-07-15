import React from 'react';
import { connect } from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import swal from 'sweetalert';
import {compose} from "redux";
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { requestPriceList,filterPriceList, sortPriceList,requestPriceListAll,deletePriceItem ,requestDeviceModelListAll,
    requestAccessoryModelListAll,requestProjectListAll,requestPriceTypeListAll} from '../../redux/Reducers/priceList_reducer';
import PriceDataGrid from './PriceDataGrid';
import { getPriceList, getCurrentPage, getPageSize, getTotalItemsCount, getSortData,getIsFetching,getIsCreated, getSetErrorMessage,getPriceListAll,
    getDeviceModelListAll,getAccessoryModelListAll,getProjectListAll,getPriceTypeListAll} from '../../redux/Selectors/priceList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class PriceContainer extends React.Component {

    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestPriceList(pageNumber);
    }
    onPageChanged = (pageNumber) => {
        this.props.requestPriceList(pageNumber);
    }
    onSorting = (sortData) => {
        this.props.sortPriceList(sortData)
    }

    onSubmit = (formData) => {
        this.props.filterPriceList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deletePriceItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestPriceList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Price List</h1>
                    <NavLink to="/price_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.priceList == null && this.props.priceListAll==null && <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.priceList != null && 
                    <PriceDataGrid 
                    priceList={this.props.priceList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterPriceList={this.props.filterPriceList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    priceListAll={this.props.priceListAll} 
                    requestPriceListAll = {this.props.requestPriceListAll}
                    deviceModelListAll={this.props.deviceModelListAll}
                    requestDeviceModelListAll={this.props.requestDeviceModelListAll}
                    accessoryModelListAll={this.props.accessoryModelListAll}
                    requestAccessoryModelListAll={this.props.requestAccessoryModelListAll}
                    projectListAll={this.props.projectListAll}
                    requestProjectListAll={this.props.requestProjectListAll}
                    priceTypeListAll={this.props.priceTypeListAll}
                    requestPriceTypeListAll={this.props.requestPriceTypeListAll}
                    priceListAllExcel={this.props.priceListAllExcel}
                /> 
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        priceList: getPriceList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching: getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        priceListAll:getPriceListAll(state),
        deviceModelListAll:getDeviceModelListAll(state),
        accessoryModelListAll:getAccessoryModelListAll(state),
        projectListAll:getProjectListAll(state),
        priceTypeListAll:getPriceTypeListAll(state),
        priceListAllExcel:getPriceListAll(state),
    }
}

export default compose(
    connect(mapStateToProps, {requestPriceList,filterPriceList,sortPriceList, deletePriceItem,requestPriceListAll,
        requestDeviceModelListAll,requestAccessoryModelListAll,requestProjectListAll,requestPriceTypeListAll}),
    withRouter
)(PriceContainer);