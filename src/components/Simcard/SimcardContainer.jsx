import React from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import { requestSimcardList, deleteSimcardItem,filterSimcardList,sortSimcardList,requestSimcardListAll } from '../../redux/Reducers/simcardList_reducer';
import SimcardDataGrid from './SimcardDataGrid'
import { NavLink, withRouter } from 'react-router-dom';
import { custom_success_alert, custom_sweet_delete } from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { getSimcardList, getCurrentPage, getPageSize,getSortData, getTotalItemsCount, getIsFetching, getSetErrorMessage, getIsCreated,getSimcardListAll } from '../../redux/Selectors/simcardList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import swal from 'sweetalert';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage';

class SimcardContainer extends React.Component {

    componentDidMount() {
        console.log(this.props)
        if (this.props.isCreated) {
            custom_success_alert();
        }
        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestSimcardList(pageNumber);
    }
    onPageChanged = (pageNumber) => {
        console.log("PAGE CHANGED")
        this.props.requestSimcardList(pageNumber);
    }
    onSorting = (sortData) => {
        console.log("SORTING",sortData)
        this.props.sortSimcardList(sortData)
    }

    onSubmit = (formData) => {
        console.log("------ONSUBMIT------")
        console.log(formData)
        this.props.filterSimcardList(formData);
    }

    searchSpace = (event) => {
        let keyword = event.target.value;
        this.setState({ search: keyword })
    }

    deleteItem = (id) => {
        swal(custom_sweet_delete)
            .then((willDelete) => {
                if (willDelete) {
                    let respone = this.props.deleteSimcardItem(id)
                    respone.then(res => {
                        swal("Deleted", {
                            icon: "success",
                        })
                        this.props.requestSimcardList(this.props.currentPage);
                    })
                        .catch(err => {
                            if (!err.response) {
                                swal("Network error", {
                                    icon: "warning",
                                })
                            } else {
                                swal(err.response.data, {
                                    icon: "warning",
                                })
                            }
                        });
                }
            });
    }

    render() {
        console.log(this.props.simcardList)
        return (
            <div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Simcard List</h1>
                    <NavLink to="/simcard_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.simcardList == null &&this.props.simcardListAll==null && <Preloader />}
                {this.props.setErrorMessage!=null && <ErrorMessage />}
                {this.props.simcardList != null &&
                    <SimcardDataGrid 
                    simcardList={this.props.simcardList} 
                    deleteItem={this.deleteItem}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                    filterSimcardList={this.props.filterSimcardList}
                    onSorting={this.onSorting}
                    sortData={this.props.sortData}
                    onSubmit={this.onSubmit}
                    simcardListAll={this.props.simcardListAll}
                    requestSimcardListAll={this.props.requestSimcardListAll} 
                    /> 
                    }
            </div>
        );
    }


}

const mapStateToProps = (state) => {
    return {
        simcardList: getSimcardList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching: getIsFetching(state),
        setErrorMessage: getSetErrorMessage(state),
        isCreated: getIsCreated(state),
        sortData: getSortData(state),
        simcardListAll:getSimcardListAll(state)
    }
}
export default compose(connect(mapStateToProps, { requestSimcardList, filterSimcardList,requestSimcardListAll,sortSimcardList, deleteSimcardItem }),
    withRouter)(SimcardContainer);
