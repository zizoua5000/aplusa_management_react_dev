import React from 'react';
import { connect } from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import swal from 'sweetalert';
import {compose} from "redux";
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { requestFWVersionList,filterFWVersionList, sortFWVersionList,requestFWVersionListAll,deleteFWVersionItem } from '../../redux/Reducers/fwVersionList_reducer';
import FWVersionDataGrid from './FWVersionDataGrid';
import { getFWVersionList, getCurrentPage, getPageSize, getTotalItemsCount, getSortData,getIsFetching,getIsCreated, getSetErrorMessage,getFWVersionListAll } from '../../redux/Selectors/fwVersionList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class FWVersionContainer extends React.Component {

    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }
        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestFWVersionList(pageNumber);
    }
    onPageChanged = (pageNumber) => {
        this.props.requestFWVersionList(pageNumber);
    }
    onSorting = (sortData) => {
        this.props.sortFWVersionList(sortData)
    }

    onSubmit = (formData) => {
        this.props.filterFWVersionList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteFWVersionItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestFWVersionList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">FW Version List</h1>
                    <NavLink to="/fw_version_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.fwVersionList == null && this.props.fwVersionListAll==null && <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.fwVersionList != null && 
                    <FWVersionDataGrid 
                    fwVersionList={this.props.fwVersionList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterFWVersionList={this.props.filterFWVersionList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    fwVersionListAll={this.props.fwVersionListAll} 
                    fwVersionFunction = {this.props.requestFWVersionListAll}
                /> 
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fwVersionList: getFWVersionList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching: getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        fwVersionListAll:getFWVersionListAll(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestFWVersionList,filterFWVersionList,requestFWVersionListAll,sortFWVersionList, deleteFWVersionItem}),
    withRouter
)(FWVersionContainer);