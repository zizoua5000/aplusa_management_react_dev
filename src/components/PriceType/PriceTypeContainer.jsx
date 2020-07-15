import React from 'react';
import { connect } from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import swal from 'sweetalert';
import {compose} from "redux";
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { requestPriceTypeList,filterPriceTypeList, sortPriceTypeList,requestPriceTypeListAll,deletePriceTypeItem } from '../../redux/Reducers/priceTypeList_reducer';
import PriceTypeDataGrid from './PriceTypeDataGrid';
import { getPriceTypeList, getCurrentPage, getPageSize, getTotalItemsCount, getSortData,getIsFetching,getIsCreated, getSetErrorMessage,getPriceTypeListAll } from '../../redux/Selectors/priceTypeList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class PriceTypeContainer extends React.Component {

    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestPriceTypeList(pageNumber);
    }
    onPageChanged = (pageNumber) => {
        this.props.requestPriceTypeList(pageNumber);
    }
    onSorting = (sortData) => {
        this.props.sortPriceTypeList(sortData)
    }

    onSubmit = (formData) => {
        this.props.filterPriceTypeList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deletePriceTypeItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestPriceTypeList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Price Type List</h1>
                    <NavLink to="/price_type_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.priceTypeList == null && this.props.priceTypeListAll==null && <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.priceTypeList != null && 
                    <PriceTypeDataGrid 
                    priceTypeList={this.props.priceTypeList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterPriceTypeList={this.props.filterPriceTypeList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    priceTypeListAll={this.props.priceTypeListAll} 
                    requestPriceTypeListAll = {this.props.requestPriceTypeListAll}
                /> 
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        priceTypeList: getPriceTypeList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching: getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        priceTypeListAll:getPriceTypeListAll(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestPriceTypeList,filterPriceTypeList,requestPriceTypeListAll,sortPriceTypeList, deletePriceTypeItem}),
    withRouter
)(PriceTypeContainer);