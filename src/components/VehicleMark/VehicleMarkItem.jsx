import React from 'react';
import { NavLink } from 'react-router-dom';


const VehicleMarkItem = ({vehicleMarkItem,deleteItem,itemCount}) => {
    return (
        <tr>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/vehicle_mark_update/${vehicleMarkItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#'onClick={(e) => {
                                 deleteItem(vehicleMarkItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{vehicleMarkItem.name}</td>
        </tr>

    )
}

export default VehicleMarkItem;