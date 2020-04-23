import React from 'react';
import { connect, DefaultRootState } from 'react-redux';
import { requestVehicleTypes,setIsFetching } from '../../redux/Reducers/vehicleTypes_reducer';
import VehicleTypes from './VehicleTypes';
import { compose } from 'redux';
import { getVehicleTypesSelector } from '../../redux/Selectors/vehicleTypes_selectors';
import { getIsFetchingSelector } from '../../redux/Selectors/vehicleTypes_selectors';
import Preloader from '../Common/Preloader/Preloader'


class VehicleTypeContainer extends React.Component {

    componentDidMount() {
        console.log("componentDidMountdayam")
        this.props.requestVehicleTypes();
        
    }

    render() {
        console.log("renderdeyem");
        console.log(this.props.vehicleTypes);
        console.log("renderdeyem");
        return (
                <div>
                    { this.props.isFetching ? <Preloader /> : null }
                    <VehicleTypes vehicleTypes={this.props.vehicleTypes} /> 
                </div>
            );
    }


}

const mapStateToProps = (state) => {
    return {
        vehicleTypes: getVehicleTypesSelector(state),
        isFetching:getIsFetchingSelector(state)
    }
}

export default connect(mapStateToProps,{requestVehicleTypes})(VehicleTypeContainer)
