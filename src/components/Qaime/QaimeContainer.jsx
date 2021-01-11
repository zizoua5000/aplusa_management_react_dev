import React from 'react';
import { connect } from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import swal from 'sweetalert';
import {compose} from "redux";
import {custom_success_alert, custom_sweet_delete,custom_sweet_status_changed} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { requestQaimeList,filterQaimeList, sortQaimeList,requestQaimeListAll,deleteQaimeItem,changeStatusQaime,
    requestStatusList,requestResponsiblePersonList,requestQaimeTypeList,
    requestPersonList } from '../../redux/Reducers/qaimeList_reducer';
import QaimeDataGrid from './QaimeDataGrid';
import { getQaimeList, getCurrentPage, getPageSize, getTotalItemsCount, getSortData,getIsFetching,getIsCreated,
    getSetErrorMessage,getQaimeListAll,getStatusList,getResponsiblePersonList,getQaimeTypeList,
    getPersonList} from '../../redux/Selectors/qaimeList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class QaimeContainer extends React.Component {

    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestQaimeList(pageNumber);
        // this.props.requestStatusListAll();
    }
    onPageChanged = (pageNumber) => {
        this.props.requestQaimeList(pageNumber);
    }
    onSorting = (sortData) => {
        this.props.sortQaimeList(sortData)
    }

    onSubmit = (formData) => {
        this.props.filterQaimeList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteQaimeItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestQaimeList(this.props.currentPage);
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

    changeStatus=(id)=>{
        swal(custom_sweet_status_changed)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.changeStatusQaime(id)
                respone.then(res => {
                        swal("Completed", {
                        icon: "success",
                    })
                    this.props.requestQaimeList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Qaime List</h1>
                    <div className="btn-group">
                    <NavLink to="/qaime_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New Sell</NavLink>
                    <NavLink to="/qaime_return_create" className="btn btn-warning aa_create_trip"><i className="text-light fas fa-plus"></i> Refund</NavLink>
                    </div>
                </div>
                {this.props.isFetching && this.props.qaimeList == null && this.props.qaimeListAll==null && <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.qaimeList != null && 
                    <QaimeDataGrid 
                    qaimeList={this.props.qaimeList} 
                    deleteItem={this.deleteItem}
                    changeStatusQaime={this.changeStatus}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterQaimeList={this.props.filterQaimeList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    qaimeListAll={this.props.qaimeListAll} 
                    statusList={this.props.statusList}
                    responsiblePersonList={this.props.responsiblePersonList}
                    qaimeTypeList={this.props.qaimeTypeList}
                    personList={this.props.personList}
                    requestStatusList={this.props.requestStatusList}
                    requestResponsiblePersonList={this.props.requestResponsiblePersonList}
                    requestQaimeTypeList={this.props.requestQaimeTypeList}
                    requestPersonList={this.props.requestPersonList}
                    requestQaimeListAll={this.props.requestQaimeListAll}
                /> 
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        qaimeList: getQaimeList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching: getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        qaimeListAll:getQaimeListAll(state),
        statusList:getStatusList(state),
        responsiblePersonList:getResponsiblePersonList(state),
        qaimeTypeList:getQaimeTypeList(state),
        personList:getPersonList(state),
    }
}

export default compose(
    connect(mapStateToProps, {requestQaimeList,filterQaimeList,requestQaimeListAll,sortQaimeList, deleteQaimeItem,
        changeStatusQaime,requestStatusList,requestResponsiblePersonList,requestQaimeTypeList,requestPersonList}),
    withRouter
)(QaimeContainer);