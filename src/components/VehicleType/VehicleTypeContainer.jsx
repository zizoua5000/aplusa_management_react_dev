import React from 'react';
import { connect, DefaultRootState } from 'react-redux';
import { requestVehicleTypes,setIsFetching } from '../../redux/Reducers/vehicleTypes_reducer';
import VehicleTypes from './VehicleTypes';
import { compose } from 'redux';
import { getVehicleTypesSelector } from '../../redux/Selectors/vehicleTypes_selectors';
import { getIsFetchingSelector } from '../../redux/Selectors/vehicleTypes_selectors';
import Preloader from '../Common/Preloader/Preloader'

import axios from 'axios';

class VehicleTypeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleTypes:[]
        };   
    }

    componentDidMount() {
        // axios.get('http://192.168.20.142:8010/api/vehicle_type/list_create/')
        //     .then((result) => {
        //         this.setState({vehicleTypes:result.data})
        //     });
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
