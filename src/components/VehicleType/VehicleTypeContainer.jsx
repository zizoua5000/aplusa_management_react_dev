import React from 'react';
import { connect } from 'react-redux';
import { requestVehicleTypeList } from '../../redux/Reducers/vehicleTypeList_reducer';
import VehicleTypeList from './VehicleTypeList';
import { getVehicleTypeList, getCurrentPage, getPageSize, getTotalItemsCount, getIsFetching, getSetErrorMessage } from '../../redux/Selectors/vehicleTypeList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class VehicleTypeContainer extends React.Component {

    componentDidMount() {
        console.log("componentDidMountdayam")
        this.props.requestVehicleTypeList();
    }
    onPageChanged = (pageNumber) => {
        // const {pageSize} = this.props;
        this.props.requestVehicleTypeList(pageNumber);
    }

    render() {
        console.log("renderdeyem");
        console.log(this.props.vehicleTypeList);
        console.log(this.props.setErrorMessage)
        console.log("renderdeyem");
        return (
            <div>
                {this.props.isFetching && this.props.vehicleModelList == null ? <Preloader /> : null}
                {this.props.setErrorMessage && <ErrorMessage />}
                {this.props.vehicleTypeList != null &&
                    < VehicleTypeList vehicleTypeList={this.props.vehicleTypeList}
                        currentPage={this.props.currentPage}
                        pageSize={this.props.pageSize}
                        totalItemsCount={this.props.totalItemsCount}
                        onPageChanged={this.onPageChanged} />}
            </div>
        );
    }


}

const mapStateToProps = (state) => {
    return {
        vehicleTypeList: getVehicleTypeList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching: getIsFetching(state),
        setErrorMessage: getSetErrorMessage(state)
    }
}

export default connect(mapStateToProps, { requestVehicleTypeList })(VehicleTypeContainer)
