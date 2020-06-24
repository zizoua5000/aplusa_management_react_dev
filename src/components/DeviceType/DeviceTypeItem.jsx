import React from 'react';
import { NavLink } from 'react-router-dom';

let DeviceTypeItem = ({ deviceTypeItem, deleteItem, itemCount}) => {
    return (
        <tr key={deviceTypeItem.id}>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/device_type_update/${deviceTypeItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(deviceTypeItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{deviceTypeItem.name}</td>
        </tr>
    )
}

export default DeviceTypeItem;