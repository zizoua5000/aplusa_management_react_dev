import React from 'react';
import { connect } from 'react-redux';
import {compose} from "redux";
import { requestSimcardList, deleteSimcardItem } from '../../redux/Reducers/simcardList_reducer';
import SimcardList from './SimcardList';
import { NavLink,withRouter} from 'react-router-dom';
import { custom_success_alert,custom_sweet_delete } from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { getSimcardList, getCurrentPage, getPageSize, getTotalItemsCount, getIsFetching, getSetErrorMessage, getIsCreated } from '../../redux/Selectors/simcardList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import swal from 'sweetalert';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class SimcardContainer extends React.Component {

    componentDidMount() {
        let pageNumber = this.props.match.params.pageNumber;
        this.props.requestSimcardList(pageNumber);
        if (this.props.isCreated) {
            custom_success_alert();
        }
    }
    onPageChanged = (pageNumber) => {
        this.props.requestSimcardList(pageNumber);
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
        return (
            <div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Simcard List</h1>
                    <NavLink to="/simcard_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                {this.props.isFetching && this.props.simcardList == null ? <Preloader /> : null}
                {this.props.setErrorMessage && <ErrorMessage />}
                {this.props.simcardList != null &&
                    <SimcardList simcardList={this.props.simcardList}
                        currentPage={this.props.currentPage}
                        deleteItem={this.deleteItem}
                        pageSize={this.props.pageSize}
                        totalItemsCount={this.props.totalItemsCount}
                        onPageChanged={this.onPageChanged} />}
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
        isCreated: getIsCreated(state)
    }
}

export default compose( connect(mapStateToProps, { requestSimcardList, deleteSimcardItem }),
    withRouter)(SimcardContainer);
