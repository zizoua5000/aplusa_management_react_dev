import React from 'react';
import { connect } from 'react-redux';
import { requestSimcardList,deleteSimcardItem } from '../../redux/Reducers/simcardList_reducer';
import SimcardList from './SimcardList';
import {custom_success_alert} from "../../utils/custom_sweet_alert/custom_sweet_alert";
import { getSimcardList, getCurrentPage, getPageSize, getTotalItemsCount, getIsFetching, getSetErrorMessage, getIsCreated } from '../../redux/Selectors/simcardList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import swal from 'sweetalert';
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'

class SimcardContainer extends React.Component {

    componentDidMount() {
        this.props.requestSimcardList();
        console.log("SimCardContainerDIDMOUNT");
        if (this.props.isCreated) {
            console.log("SimCardContainerSweetAlert",this.props.isCreated)
            custom_success_alert();
        }
    }
    onPageChanged = (pageNumber) => {
        // const {pageSize} = this.props;
        this.props.requestSimcardList(pageNumber);
    }

    deleteItem=(id)=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                let respone=this.props.deleteSimcardItem(id)
                respone.then(res => {
                        swal("Deleted", {
                        icon: "success",
                    })
                    this.props.requestSimcardList(this.props.currentPage);
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
        console.log("renderdeyem");
        console.log(this.props.simcardList);
        console.log(this.props.setErrorMessage)
        console.log("renderdeyem");
        return (
            <div>
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
        isCreated:getIsCreated(state)
    }
}

export default connect(mapStateToProps, { requestSimcardList,deleteSimcardItem })(SimcardContainer)
