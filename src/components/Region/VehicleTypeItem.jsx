import React from 'react';
import { NavLink } from 'react-router-dom';

let VehicleTypeItem = ({ vehicleTypeItem, deleteItem, itemCount}) => {
    return (
        <tr key={vehicleTypeItem.id}>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/vehicle_type_update/${vehicleTypeItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(vehicleTypeItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{vehicleTypeItem.name}</td>
        </tr>
    )
}

export default VehicleTypeItem;