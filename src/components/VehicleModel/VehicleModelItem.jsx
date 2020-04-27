import React from 'react';
import { NavLink } from 'react-router-dom';

const VehicleModelItem= ({vehicleModelItem,itemCount}) => {
    return (
        <tr key={vehicleModelItem.id}>
            <td>{itemCount}</td>
            <td><NavLink title="Update" to={`/vehicle_model_update/${vehicleModelItem.id}`}><i className="text-secondary fas fa-edit aa_update_user"></i></NavLink></td>
            <td>{vehicleModelItem.name}</td>
            <td>{vehicleModelItem.vehicle_mark_detail.name}</td>
        </tr>
    )
}

export default VehicleModelItem;