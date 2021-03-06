import React from 'react';
import { NavLink } from 'react-router-dom';

const VehicleModelItem= ({vehicleModelItem,deleteItem,itemCount}) => {
    return (
        <tr>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/vehicle_model_update/${vehicleModelItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(vehicleModelItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{vehicleModelItem.name}</td>
            <td>{vehicleModelItem.vehicle_mark_detail.name}</td>
        </tr>
    )
}

export default VehicleModelItem;