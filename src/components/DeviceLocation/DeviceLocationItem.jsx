import React from 'react';
import { NavLink } from 'react-router-dom';

let DeviceLocationItem = ({ deviceLocationItem, deleteItem, itemCount}) => {
    return (
        <tr key={deviceLocationItem.id}>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/device_location_update/${deviceLocationItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(deviceLocationItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{deviceLocationItem.name}</td>
        </tr>
    )
}

export default DeviceLocationItem;