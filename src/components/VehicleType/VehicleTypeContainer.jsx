import React from 'react';
import { connect } from 'react-redux';
import { requestVehicleTypeList} from '../../redux/Reducers/vehicleTypeList_reducer';
import VehicleTypeList from './VehicleTypeList';
import { getVehicleTypeList,getIsFetching ,getSetErrorMessage} from '../../redux/Selectors/vehicleTypeList_selectors';
import Preloader from '../Common/Preloader/Preloader'
import ErrorMessage from '../Common/ErrorMessage/ErrorMessage'


class VehicleTypeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleTypeList:[]
        };   
    }

    componentDidMount() {
        console.log('-----COMMIT TEST------')

        console.log("componentDidMountdayam")
        this.props.requestVehicleTypeList();
    }

    render() {
        console.log("renderdeyem");
        console.log(this.props.vehicleTypeList);
        console.log(this.props.setErrorMessage)
        console.log("renderdeyem");
        return (
                <div>
                    {this.props.isFetching ? <Preloader /> : null }
                    {this.props.setErrorMessage ? <ErrorMessage message={this.props.setErrorMessage}/> :null}
                    <VehicleTypeList vehicleTypeList={this.props.vehicleTypeList} /> 
                </div>
            );
    }


}

const mapStateToProps = (state) => {
    return {
        vehicleTypeList: getVehicleTypeList(state),
        isFetching:getIsFetching(state),
        setErrorMessage: getSetErrorMessage(state)
    }
}

export default connect(mapStateToProps,{requestVehicleTypeList})(VehicleTypeContainer)
