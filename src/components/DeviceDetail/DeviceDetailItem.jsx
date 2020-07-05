import React from 'react';
import { NavLink } from 'react-router-dom';

const DeviceDetailItem= ({deviceDetailItem,deleteItem,itemCount}) => {
    return (
        <tr>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/device_detail_update/${deviceDetailItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(deviceDetailItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{deviceDetailItem.id}</td>
            <td>{deviceDetailItem.status_detail.name}</td>
            <td>{deviceDetailItem.simcard_detail.number}</td>
            <td>{deviceDetailItem.vehicle_detail.plate}</td>
            <td>{deviceDetailItem.company_detail.name}</td>
            <td>{deviceDetailItem.device_location_detail.name}</td>
            <td>{deviceDetailItem.configuration_detail.name}</td>
            <td>{deviceDetailItem.project_detail.name}</td>
            <td>{deviceDetailItem.region_detail.name}</td>
            <td>{deviceDetailItem.comment}</td>
            <td>{deviceDetailItem.price_datetime}</td>
            <td>{deviceDetailItem.status_datetime}</td>
            <td>{deviceDetailItem.sell_count}</td>                 
        </tr>
    )
}

export default DeviceDetailItem;