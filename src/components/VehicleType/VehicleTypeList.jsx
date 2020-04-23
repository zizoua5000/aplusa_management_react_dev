import React from 'react';
import VehicleTypeItem from './VehicleTypeItem';

let VehicleTypeList = ({ vehicleTypeList }) => {
    console.log(vehicleTypeList)
    return (
        vehicleTypeList.map(vt => <VehicleTypeItem vehicleTypeItem={vt}/>
        )
    )     

}

export default VehicleTypeList;