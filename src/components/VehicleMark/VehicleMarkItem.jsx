import React from 'react';


const VehicleMarkItem = ({vehicleMarkItem}) => {
    return (

        <tr key={vehicleMarkItem.id}>
            <td>{vehicleMarkItem.id}</td>
            <td>{vehicleMarkItem.name}</td>
        </tr>

    )
}

export default VehicleMarkItem;