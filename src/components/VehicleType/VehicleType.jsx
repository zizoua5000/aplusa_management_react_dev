import React from 'react';

let VehicleType= ({vehicleType}) => {
    return (
        <div key={vehicleType.key}>
            <span>{vehicleType.id}</span>
            <span>{vehicleType.name}</span>  
            <span>{vehicleType.name} ve {vehicleType.id} </span>           
        </div>
    )
}

export default VehicleType;