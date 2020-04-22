import React from 'react';
import { connect } from 'react-redux';
import {requestVehicleModelList} from '../../redux/Reducers/vehicleModelList_reducer'
import {getVehicleModelListSelector} from '../../redux/Selectors/vehicleModelList_selectors'
import VehicleModelList from './VehicleModelList';

class VehicleModelContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleModelList:[]
        };   
    }

    componentDidMount() {
        // axios.get('http://192.168.20.142:8010/api/vehicle_type/list_create/')
        //     .then((result) => {
        //         this.setState({vehicleTypes:result.data})
        //     });
        console.log("----- ---- --- --- -")
        this.props.requestVehicleModelList();
        console.log("----- ---- --- --- -")
        
    }

    render() {
        console.log('--------- render-------')
        console.log(this.props.vehicleModelList);
        console.log('--------- render-------')
        return (  
            <VehicleModelList vehicleModelList={this.props.vehicleModelList} /> 
        );
    }


}

let mapStateToProps = (state) => {
    return {
        vehicleModelList: getVehicleModelListSelector(state),
    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         requestVehicleTypes
        
//     }
// }

// export default compose(
export default connect(mapStateToProps, {requestVehicleModelList})(VehicleModelContainer)

// export default VehicleTypeContainer