import React from 'react';
import { NavLink } from 'react-router-dom';

const PermissionItem= ({permissionItem,deleteItem,itemCount}) => {
    return (
        <tr>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/permission_update/${permissionItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(permissionItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{permissionItem.name}</td>
            <td>{permissionItem.codename}</td>
            <td>{permissionItem.content_type_detail.app_label}</td>     
        </tr>
    )
}

export default PermissionItem;