import React from 'react';

const VehicleModelItem= ({vehicleModelItem}) => {
    console.log(vehicleModelItem)
    return (
        <tr key={vehicleModelItem.id}>
            <td>{vehicleModelItem.id}</td>
            <td>{vehicleModelItem.name}</td>
        </tr>
    )
}

export default VehicleModelItem;