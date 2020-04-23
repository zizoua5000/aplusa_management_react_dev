import React from 'react';


const VehicleMarkItem = (vehicleMarkItem) => {
    return (

        <tr key={vehicleMarkItem.vehicleMarkItem.id}>
            <td>{vehicleMarkItem.vehicleMarkItem.id}</td>
            <td>{vehicleMarkItem.vehicleMarkItem.name}</td>
        </tr>

    )
}

export default VehicleMarkItem;