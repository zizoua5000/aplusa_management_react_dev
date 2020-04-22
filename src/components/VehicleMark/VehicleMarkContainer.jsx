import React from 'react';
import { connect } from 'react-redux';
import { requestVehicleMarkList } from '../../redux/Reducers/vehicleMarks_reducer';
import VehicleMarks from './VehicleMarks';
import { getVehicleMarksSelector } from "../../redux/Selectors/vehicleMarks_selectors";


class VehicleMarkContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vehicleMarks: []
        };
    }

    componentDidMount() {
        this.props.requestVehicleMarkList();
    }

    render() {
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