import React from 'react';
import { connect } from 'react-redux';
import {requestVehicleMarkList} from '../../redux/Reducers/vehicleMarkList_reducer'
import VehicleMarkList from './VehicleMarkList';
import { getVehicleMarkListSelector,getIsFetching ,getSetErrorMessage } from "../../redux/Selectors/vehicleMarkList_selectors";
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class VehicleMarkContainer extends React.Component {
    constructor(props) {
        super(props);
    }    

    componentDidMount() {
        this.props.requestVehicleMarkList();
    }

    render() {
        return (
            <div>
            {this.props.isFetching ? <Preloader /> : null }
            {this.props.setErrorMessage ? <ErrorMessage /> :null}
            <VehicleMarkList vehicleMarkList={this.props.vehicleMarkList} />
            </div>
        );
    }


}

let mapStateToProps = (state) => {
    return {
        vehicleMarkList: getVehicleMarkListSelector(state),
        isFetching:getIsFetching(state),
        setErrorMessage: getSetErrorMessage(state)
    }
}
export default connect(mapStateToProps, { requestVehicleMarkList })(VehicleMarkContainer)