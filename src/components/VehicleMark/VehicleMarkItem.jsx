import React from 'react';


const VehicleMarkItem = (vehicleMarkItem) => {
    return (

        <tr key={vehicleMarkItem.vehicleMark.id}>
            <td>{vehicleMarkItem.vehicleMark.id}</td>
            <td>{vehicleMarkItem.vehicleMark.name}</td>
        </tr>

    )
}

export default VehicleMarkItem;