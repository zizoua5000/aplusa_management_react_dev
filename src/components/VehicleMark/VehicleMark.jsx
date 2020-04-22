import React from 'react';


const VehicleMark = (vehicleMark) => {
    console.log(vehicleMark)
    return (
        <div>
               
            <span>{vehicleMark.vehicleMark.id}</span>   
            <span>{vehicleMark.vehicleMark.name}</span>           
        </div>
    )
}

export default VehicleMark;