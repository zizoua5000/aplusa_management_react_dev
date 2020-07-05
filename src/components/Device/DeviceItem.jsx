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
            <td>{deviceItem.device_detail_detail.status_detail.name}</td>
            <td>{deviceItem.device_detail_detail.vehicle_detail.plate}</td>
            <td>{deviceItem.device_detail_detail.company_detail.name}</td>
            <td>{deviceItem.device_detail_detail.device_location_detail.name}</td> 
            <td>{deviceItem.device_detail_detail.configuration_detail.name}</td>  
            <td>{deviceItem.device_detail_detail.simcard_detail.number}</td>         
            <td>{deviceItem.device_detail_detail.project_detail.name}</td>
            <td>{deviceItem.device_detail_detail.region_detail.name}</td>
            <td>{deviceItem.device_detail_detail.comment}</td>
            <td>{deviceItem.device_detail_detail.price_datetime}</td>
            <td>{deviceItem.device_detail_detail.status_datetime}</td>
            <td>{deviceItem.device_detail_detail.sell_count}</td> 
            
        </tr>
    )
}

export default DeviceItem;