import React from 'react';
import { NavLink } from 'react-router-dom';

let FWVersionItem = ({ fwVersionItem, deleteItem, itemCount}) => {
    return (
        <tr key={fwVersionItem.id}>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/fw_version_update/${fwVersionItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(fwVersionItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{fwVersionItem.name}</td>
        </tr>
    )
}

export default FWVersionItem;