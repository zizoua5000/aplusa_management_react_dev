import React from 'react';
import { connect } from 'react-redux';
import {withRouter,NavLink} from "react-router-dom";
import swal from 'sweetalert';
import {compose} from "redux";
import {custom_success_alert, custom_sweet_delete} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { requestProjectList,filterProjectList, sortProjectList,requestProjectListAll,deleteProjectItem } from '../../redux/Reducers/projectList_reducer';
import ProjectDataGrid from './ProjectDataGrid';
import { getProjectList, getCurrentPage, getPageSize, getTotalItemsCount, getSortData,getIsFetching,getIsCreated, getSetErrorMessage,getProjectListAll } from '../../redux/Selectors/projectList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class ProjectContainer extends React.Component {

    componentDidMount() {
        if (this.props.isCreated) {
            custom_success_alert();
        }

        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestProjectList(pageNumber);
        // this.props.requestProjectListAll();
    }
    onPageChanged = (pageNumber) => {
        this.props.requestProjectList(pageNumber);
    }
    onSorting = (sortData) => {
        this.props.sortProjectList(sortData)
    }

    onSubmit = (formData) => {
        this.props.filterProjectList(formData);
    }

    deleteItem=(id)=>{
        swal(custom_sweet_delete)
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteProjectItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestProjectList(this.props.currentPage);
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
                    <h1 className="h3 mb-0 text-gray-800 text-info">Project List</h1>
                    <NavLink to="/project_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.projectList == null && this.props.projectListAll==null && <Preloader /> }
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.projectList != null && 
                    <ProjectDataGrid 
                    projectList={this.props.projectList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterProjectList={this.props.filterProjectList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    projectListAll={this.props.projectListAll} 
                    projectFunction = {this.props.requestProjectListAll}
                /> 
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        projectList: getProjectList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching: getIsFetching(state),
        isCreated:getIsCreated(state),
        setErrorMessage: getSetErrorMessage(state),
        sortData: getSortData(state),
        projectListAll:getProjectListAll(state)
    }
}

export default compose(
    connect(mapStateToProps, {requestProjectList,filterProjectList,requestProjectListAll,sortProjectList, deleteProjectItem}),
    withRouter
)(ProjectContainer);