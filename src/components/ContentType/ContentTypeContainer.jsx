import React from 'react';
import { connect } from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import swal from 'sweetalert';
import {compose} from "redux";
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { requestContentTypeList,filterContentTypeList, sortContentTypeList,requestContentTypeListAll,deleteContentTypeItem } from '../../redux/Reducers/contentTypeList_reducer';
import ContentTypeDataGrid from './ContentTypeDataGrid';
import { getContentTypeList, getCurrentPage, getPageSize, getTotalItemsCount, getSortData,getIsFetching,getIsCreated, getSetErrorMessage,getContentTypeListAll } from '../../redux/Selectors/contentTypeList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class ContentTypeContainer extends React.Component {

    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }
        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestContentTypeList(pageNumber);
    }
    onPageChanged = (pageNumber) => {
        this.props.requestContentTypeList(pageNumber);
    }
    onSorting = (sortData) => {
        this.props.sortContentTypeList(sortData)
    }

    onSubmit = (formData) => {
        this.props.filterContentTypeList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteContentTypeItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestContentTypeList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Content Type List</h1>
                    <NavLink to="/content_type_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.contentTypeList == null && this.props.contentTypeListAll==null && <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.contentTypeList != null && 
                    <ContentTypeDataGrid 
                    contentTypeList={this.props.contentTypeList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterContentTypeList={this.props.filterContentTypeList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    contentTypeListAll={this.props.contentTypeListAll} 
                    contentTypeFunction = {this.props.requestContentTypeListAll}
                /> 
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        contentTypeList: getContentTypeList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching: getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        contentTypeListAll:getContentTypeListAll(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestContentTypeList,filterContentTypeList,requestContentTypeListAll,sortContentTypeList, deleteContentTypeItem}),
    withRouter
)(ContentTypeContainer);