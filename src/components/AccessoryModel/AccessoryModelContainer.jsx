import React from 'react';
import { connect } from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import swal from 'sweetalert';
import {compose} from "redux";
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { requestAccessoryModelList,filterAccessoryModelList, sortAccessoryModelList,requestAccessoryModelListAll,deleteAccessoryModelItem } from '../../redux/Reducers/accessoryModelList_reducer';
import AccessoryModelDataGrid from './AccessoryModelDataGrid';
import { getAccessoryModelList, getCurrentPage, getPageSize, getTotalItemsCount, getSortData,getIsFetching,getIsCreated, getSetErrorMessage,getAccessoryModelListAll } from '../../redux/Selectors/accessoryModelList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class AccessoryModelContainer extends React.Component {

    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestAccessoryModelList(pageNumber);
    }
    onPageChanged = (pageNumber) => {
        this.props.requestAccessoryModelList(pageNumber);
    }
    onSorting = (sortData) => {
        this.props.sortAccessoryModelList(sortData)
    }

    onSubmit = (formData) => {
        this.props.filterAccessoryModelList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteAccessoryModelItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestAccessoryModelList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Accessory Model List</h1>
                    <NavLink to="/accessory_model_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.accessoryModelList == null&& <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.accessoryModelList != null && 
                    <AccessoryModelDataGrid 
                    accessoryModelList={this.props.accessoryModelList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterAccessoryModelList={this.props.filterAccessoryModelList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    accessoryModelListAll={this.props.accessoryModelListAll} 
                    requestAccessoryModelAll = {this.props.requestAccessoryModelListAll}
                /> 
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accessoryModelList: getAccessoryModelList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching: getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        accessoryModelListAll:getAccessoryModelListAll(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestAccessoryModelList,filterAccessoryModelList,requestAccessoryModelListAll,sortAccessoryModelList, deleteAccessoryModelItem}),
    withRouter
)(AccessoryModelContainer);