import React from 'react';
import { connect, DefaultRootState } from 'react-redux';
import swal from 'sweetalert';
import {requestVehicleModelList, deleteVehicleModelItem} from '../../redux/Reducers/vehicleModelList_reducer';
import {getVehicleModelList, getCurrentPage, getPageSize, getTotalItemsCount, getIsFetching} from '../../redux/Selectors/vehicleModelList_selectors';
import VehicleModelList from './VehicleModelList';
import Preloader from '../Common/Preloader/Preloader';

class VehicleModelContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.requestVehicleModelList();   
    }

    onPageChanged = (pageNumber) => {
        // const {pageSize} = this.props;
        this.props.requestVehicleModelList(pageNumber);
    }

    render() {
        return (  
            <div>
            { this.props.isFetching && this.props.vehicleModelList==null? <Preloader /> : null }
            {this.props.vehicleModelList!=null &&
                <VehicleModelList 
                    vehicleModelList={this.props.vehicleModelList} 
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
        vehicleModelList: getVehicleModelList(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        isFetching:getIsFetching(state)
    }
}

// export default compose(
export default connect(mapStateToProps, {requestVehicleModelList, deleteVehicleModelItem})(VehicleModelContainer)
