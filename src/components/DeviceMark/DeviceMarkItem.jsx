import React from 'react';
import { NavLink } from 'react-router-dom';

let DeviceMarkItem = ({ deviceMarkItem, deleteItem, itemCount}) => {
    return (
        <tr key={deviceMarkItem.id}>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/device_mark_update/${deviceMarkItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(deviceMarkItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{deviceMarkItem.name}</td>
        </tr>
    )
}

export default DeviceMarkItem;