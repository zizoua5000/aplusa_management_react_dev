import React from 'react';
import { NavLink } from 'react-router-dom';

let StatusItem = ({ statusItem, deleteItem, itemCount}) => {
    return (
        <tr key={statusItem.id}>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/status_update/${statusItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(statusItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{statusItem.name}</td>
        </tr>
    )
}

export default StatusItem;