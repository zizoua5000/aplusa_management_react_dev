import React from 'react';

let VehicleTypeItem= ({vehicleTypeItem}) => {
    return (
        <div key={vehicleTypeItem.key}>
            <span>{vehicleTypeItem.id}</span>
            <span>{vehicleTypeItem.name}</span>        
        </div>
    )
}

export default VehicleTypeItem;