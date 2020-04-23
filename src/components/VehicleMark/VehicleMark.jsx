import React from 'react';


const VehicleMark = (vehicleMark) => {
    return (

        <tr key={vehicleMark.vehicleMark.id}>
            <td>{vehicleMark.vehicleMark.id}</td>
            <td>{vehicleMark.vehicleMark.name}</td>
        </tr>

    )
}

export default VehicleMark;