import React from 'react';
import { NavLink } from 'react-router-dom';

let AccessoryModelItem = ({ accessoryModelItem, deleteItem, itemCount}) => {
    return (
        <tr key={accessoryModelItem.id}>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/accessory_model_update/${accessoryModelItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(accessoryModelItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{accessoryModelItem.name}</td>
        </tr>
    )
}

export default AccessoryModelItem;