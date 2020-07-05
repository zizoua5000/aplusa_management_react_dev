import React from 'react';
import { NavLink } from 'react-router-dom';

const AccessoryItem= ({accessoryItem,deleteItem,itemCount}) => {
    return (
        <tr>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/accessory_update/${accessoryItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(accessoryItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{accessoryItem.name}</td>
            <td>{accessoryItem.company_detail.name}</td>
            <td>{accessoryItem.accessory_model_detail.name}</td>
            <td>{accessoryItem.accessory_type_detail.name}</td>
        </tr>
    )
}

export default AccessoryItem;