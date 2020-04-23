import React from 'react';
import { connect } from 'react-redux';
import { requestVehicleTypes} from '../../redux/Reducers/vehicleTypes_reducer';
import VehicleTypes from './VehicleTypes';
import { getVehicleTypesSelector } from '../../redux/Selectors/vehicleTypes_selectors';
import { getIsFetchingSelector ,getSetErrorMessage} from '../../redux/Selectors/vehicleTypes_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class VehicleTypeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleTypes:[]
        };   
    }

    componentDidMount() {
        console.log('-----COMMIT TEST------')

        console.log("componentDidMountdayam")
        this.props.requestVehicleTypes();
    }

    render() {
        console.log("renderdeyem");
        console.log(this.props.vehicleTypes);
        // console.log(this.props.setErrorMessage)
        console.log("renderdeyem");
        return (
                <div>
                    {this.props.isFetching ? <Preloader /> : null }
                    {this.props.setErrorMessage ? <ErrorMessage nizam = {this.props.setErrorMessage}/> :null}
                    <VehicleTypes vehicleTypes={this.props.vehicleTypes} /> 
                </div>
            );
    }


}

const mapStateToProps = (state) => {
    return {
        vehicleTypes: getVehicleTypesSelector(state),
        isFetching:getIsFetchingSelector(state),
        setErrorMessage: getSetErrorMessage(state)
    }
}

export default connect(mapStateToProps,{requestVehicleTypes})(VehicleTypeContainer)
