import React from 'react';
import { connect, DefaultRootState } from 'react-redux';
import { requestVehicleTypes } from '../../redux/Reducers/vehicleTypes_reducer';
import VehicleTypes from './VehicleTypes';
import { compose } from "redux";
import { getVehicleTypesSelector } from "../../redux/Selectors/vehicleTypes_selectors";

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
            <VehicleTypes vehicleTypes={this.props.vehicleTypes} /> 
            // <div>TSET</div>
        );
    }


}

let mapStateToProps = (state) => {
    return {
        vehicleTypes: getVehicleTypesSelector(state),
    }
}

export default connect(mapStateToProps, {requestVehicleTypes})(VehicleTypeContainer)
