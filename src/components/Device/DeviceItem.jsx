import React from 'react';
import { NavLink } from 'react-router-dom';

const DeviceItem= ({deviceItem,deleteItem,itemCount}) => {
    console.log(deviceItem)
    return (
        <tr>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/device_update/${deviceItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(deviceItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{deviceItem.serie}</td>
            <td>{deviceItem.company_detail.name}</td>
            <td>{deviceItem.device_model_detail.name}</td>
            <td>{deviceItem.device_model_detail.device_mark_detail.name}</td>
            <td>{deviceItem.device_type_detail.name}</td>

        </tr>
    )
}

export default DeviceItem;