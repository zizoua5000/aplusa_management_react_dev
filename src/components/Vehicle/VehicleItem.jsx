import React from 'react';
import { NavLink } from 'react-router-dom';

const VehicleItem= ({vehicleItem,deleteItem,itemCount}) => {
    return (
        <tr>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/vehicle_update/${vehicleItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(vehicleItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{vehicleItem.plate}</td>
            <td>{vehicleItem.serie_number}</td>
            <td>{vehicleItem.vehicle_model_detail.name}</td>
            <td>{vehicleItem.vehicle_model_detail.vehicle_mark_detail.name}</td>
            <td>{vehicleItem.vehicle_type_detail.name}</td>
            <td>{vehicleItem.comment}</td>
            

        </tr>
    )
}

export default VehicleItem;