import React from 'react';
import { connect } from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import swal from 'sweetalert';
import {compose} from "redux";
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { requestConfigurationList,filterConfigurationList, sortConfigurationList,requestConfigurationListAll,deleteConfigurationItem } from '../../redux/Reducers/configurationList_reducer';
import ConfigurationDataGrid from './ConfigurationDataGrid';
import { getConfigurationList, getCurrentPage, getPageSize, getTotalItemsCount, getSortData,getIsFetching,getIsCreated, getSetErrorMessage,getConfigurationListAll } from '../../redux/Selectors/configurationList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class ConfigurationContainer extends React.Component {

    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }
        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestConfigurationList(pageNumber);
    }
    onPageChanged = (pageNumber) => {
        this.props.requestConfigurationList(pageNumber);
    }
    onSorting = (sortData) => {
        this.props.sortConfigurationList(sortData)
    }

    onSubmit = (formData) => {
        this.props.filterConfigurationList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteConfigurationItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestConfigurationList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Configuration List</h1>
                    <NavLink to="/configuration_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.configurationList == null && this.props.configurationListAll==null && <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.configurationList != null && 
                    <ConfigurationDataGrid 
                    configurationList={this.props.configurationList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterConfigurationList={this.props.filterConfigurationList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    configurationListAll={this.props.configurationListAll} 
                    configurationFunction = {this.props.requestConfigurationListAll}
                /> 
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        configurationList: getConfigurationList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching: getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        configurationListAll:getConfigurationListAll(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestConfigurationList,filterConfigurationList,requestConfigurationListAll,sortConfigurationList, deleteConfigurationItem}),
    withRouter
)(ConfigurationContainer);