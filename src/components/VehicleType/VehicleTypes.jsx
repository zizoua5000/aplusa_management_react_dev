import React from 'react';
import VehicleType from './VehicleType';

let VehicleTypes = ({ vehicleTypes }) => {
    console.log(vehicleTypes)
    return (
        vehicleTypes.map(vt => <VehicleType vehicleType={vt}/>
        )
    )     

}

export default VehicleTypes;