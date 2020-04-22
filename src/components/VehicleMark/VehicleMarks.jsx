import React from 'react';
import VehicleMark from './VehicleMark';

let VehicleMarks = ({ vehicleMarks }) => {
    console.log(vehicleMarks)

    return (
        vehicleMarks.map(vm => <VehicleMark vehicleMark={vm}
        />
        )
    )

}

export default VehicleMarks;