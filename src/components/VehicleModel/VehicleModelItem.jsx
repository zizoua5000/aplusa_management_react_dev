import React from 'react';

const VehicleModelItem= ({vehicleModelItem}) => {
    console.log(vehicleModelItem)
    return (
        <div key={vehicleModelItem.key}>

            <span>{vehicleModelItem.name}</span>           
        </div>
    )
}

export default VehicleModelItem;