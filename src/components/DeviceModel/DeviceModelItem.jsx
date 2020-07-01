import React from 'react';
import { NavLink } from 'react-router-dom';

const DeviceModelItem= ({deviceModelItem,deleteItem,itemCount}) => {
    return (
        <tr>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/device_model_update/${deviceModelItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(deviceModelItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{deviceModelItem.name}</td>
            <td>{deviceModelItem.device_mark_detail.name}</td>
        </tr>
    )
}

export default DeviceModelItem;