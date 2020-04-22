import React from 'react';
import { connect, DefaultRootState } from 'react-redux';
import { requestVehicleMarkList } from '../../redux/Reducers/vehicleMarks_reducer';
import VehicleMarks from './VehicleMarks';
import { compose } from "redux";
import { getVehicleMarksSelector } from "../../redux/Selectors/vehicleMarks_selectors";

import axios from 'axios';

class VehicleMarkContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vehicleMarks: []
        };
    }

    componentDidMount() {
        console.log("/////componentDIDmount//////")
        this.props.requestVehicleMarkList();
        console.log("/////componentDIDmount//////")
    }

    render() {
        console.log("-----RENDER- --- -")
        const vehicleMarks = this.props.vehicleMarks;
        console.log(vehicleMarks)
        console.log("-----ASADASAD- --- -")

     
        return (
            <VehicleMarks vehicleMarks={this.props.vehicleMarks} />
        
        );
    }


}

let mapStateToProps = (state) => {
    return {
        vehicleMarks: getVehicleMarksSelector(state),
    }
}


export default connect(mapStateToProps, { requestVehicleMarkList })(VehicleMarkContainer)