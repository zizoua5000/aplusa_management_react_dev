import React from 'react';
import { NavLink } from 'react-router-dom';

const AccessoryItem= ({accessoryItem,deleteItem,historyItem,itemCount}) => {
    return (
        <tr>
            <td>{itemCount}</td>
            <td>
                <NavLink title="History" to='#' onClick={(e) => {
                                 historyItem(accessoryItem.id);
                             }}><i className="text-secondary fas fa-eye ml-2"></i></NavLink>
                <NavLink title="Update" to={`/accessory_update/${accessoryItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(accessoryItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>

            </td>
            <td>{accessoryItem.name}</td>
            <td>{accessoryItem.manufacturer_detail.name}</td>
            <td>{accessoryItem.accessory_model_detail.name}</td>
            <td>{accessoryItem.accessory_type_detail.name}</td>
            <td>{accessoryItem.count}</td>
            <td>{accessoryItem.is_new===true?<i className="text-success fas fa-check-circle ml-3"></i>:<i className="text-warning fas fa-times-circle ml-3"></i>}</td>
            <td>{accessoryItem.is_our===true?<i className="text-success fas fa-check-circle ml-3"></i>:<i className="text-warning fas fa-times-circle ml-3"></i>}</td>
        </tr>
    )
}

export default AccessoryItem;