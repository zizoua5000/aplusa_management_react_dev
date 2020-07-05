import React from 'react';
import { NavLink } from 'react-router-dom';

let AccessoryTypeItem = ({ accessoryTypeItem, deleteItem, itemCount}) => {
    return (
        <tr key={accessoryTypeItem.id}>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/accessory_type_update/${accessoryTypeItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(accessoryTypeItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{accessoryTypeItem.name}</td>
        </tr>
    )
}

export default AccessoryTypeItem;