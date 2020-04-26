import React from 'react';

let VehicleTypeItem = ({ vehicleTypeItem }) => {
    return (
        <tr key={vehicleTypeItem.key}>
            <td>{vehicleTypeItem.id}</td>
            <td>{vehicleTypeItem.name}</td>
        </tr>
    )
}

export default VehicleTypeItem;