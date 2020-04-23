import React from 'react';
import { connect } from 'react-redux';
import {requestVehicleMarkList} from '../../redux/Reducers/vehicleMarkList_reducer'
import VehicleMarkList from './VehicleMarkList';
import { getVehicleMarkListSelector } from "../../redux/Selectors/vehicleMarkList_selectors";


class VehicleMarkContainer extends React.Component {

    componentDidMount() {
        this.props.requestVehicleMarkList();
    }

    render() {
        return (
            <VehicleMarkList vehicleMarkList={this.props.vehicleMarkList} />
        );
    }


}

let mapStateToProps = (state) => {
    return {
        vehicleMarkList: getVehicleMarkListSelector(state),
    }
}
export default connect(mapStateToProps, { requestVehicleMarkList })(VehicleMarkContainer)