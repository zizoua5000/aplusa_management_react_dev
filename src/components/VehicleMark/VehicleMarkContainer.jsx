import React from 'react';
import { connect } from 'react-redux';
import {requestVehicleMarkList} from '../../redux/Reducers/vehicleMarkList_reducer'
import VehicleMarkList from './VehicleMarkList';
import { getVehicleMarkList,getCurrentPage,getPageSize,getTotalItemsCount,getIsFetching ,getSetErrorMessage } from "../../redux/Selectors/vehicleMarkList_selectors";
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class VehicleMarkContainer extends React.Component {
    constructor(props) {
        super(props);
    }    

    componentDidMount() {
        this.props.requestVehicleMarkList();
    }

    onPageChanged = (pageNumber) => {
        // const {pageSize} = this.props;
        this.props.requestVehicleMarkList(pageNumber);
    }

    render() {
        return (
            <div>
            {this.props.isFetching && this.props.vehicleModelList==null ? <Preloader /> : null }
            {this.props.setErrorMessage ? <ErrorMessage /> :null}
            {this.props.vehicleMarkList!=null &&
                <VehicleMarkList 
                    vehicleMarkList={this.props.vehicleMarkList} 
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalItemsCount}
                    onPageChanged={this.onPageChanged}
                /> 
            }
            </div>
        );
    }


}

let mapStateToProps = (state) => {
    return {
        vehicleMarkList: getVehicleMarkList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching:getIsFetching(state),
        setErrorMessage: getSetErrorMessage(state)
    }
}
export default connect(mapStateToProps, { requestVehicleMarkList })(VehicleMarkContainer)