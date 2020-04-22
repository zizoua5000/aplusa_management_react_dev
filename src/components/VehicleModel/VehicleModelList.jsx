import React from 'react';
import VehicleModelItem from './VehicleModelItem';

let VehicleModelList = ({ vehicleModelList }) => {
    console.log(vehicleModelList)
    return vehicleModelList.map(item=> <VehicleModelItem vehicleModelItem={item}/>)
//     return (          
//         <div >
//            VehicleModelList
//         </div>         
// )
}

export default VehicleModelList;