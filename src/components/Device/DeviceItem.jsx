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
            <td>{deviceItem.device_details.status_detail.name}</td>
            <td>{deviceItem.device_details.status_datetime}</td>
            <td>{deviceItem.device_details.vehicle_detail.plate}</td>
            <td>{deviceItem.device_details.company_detail.name}</td>
            <td>{deviceItem.device_details.device_location_detail.name}</td> 
            <td>{deviceItem.device_details.project_detail.name}</td>
            <td>{deviceItem.device_details.recipient_detail.full_name}</td> 
            <td>{deviceItem.device_details.region_detail.name}</td>
            <td>{deviceItem.device_details.simcard_detail.number}</td>
            <td>{deviceItem.device_details.simcard_detail.package}</td>
            <td>{deviceItem.device_details.simcard_detail.has_rouming===true?<i className="text-success fas fa-check-circle ml-4"></i>:<i className="text-warning fas fa-times-circle ml-4"></i>}</td>
            <td>{deviceItem.device_details.simcard_detail.is_active===true?<i className="text-success fas fa-check-circle ml-3"></i>:<i className="text-warning fas fa-times-circle ml-3"></i>}</td>
            <td>{deviceItem.device_details.configuration_detail.name}</td> 
            <td>{deviceItem.device_details.fw_version_detail.name}</td>  
            <td>{deviceItem.device_details.sell_count}</td>     
            <td>{deviceItem.device_details.price_datetime}</td>
            <td>{deviceItem.device_details.comment}</td>            
        </tr>
    )
}
export default DeviceItem;