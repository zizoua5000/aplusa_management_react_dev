import React from 'react';
import { NavLink } from 'react-router-dom';

let ConfigurationItem = ({ configurationItem, deleteItem, itemCount}) => {
    return (
        <tr key={configurationItem.id}>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/configuration_update/${configurationItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(configurationItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{configurationItem.name}</td>
        </tr>
    )
}

export default ConfigurationItem;