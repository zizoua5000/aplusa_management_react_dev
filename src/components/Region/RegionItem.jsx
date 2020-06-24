import React from 'react';
import { NavLink } from 'react-router-dom';

let RegionItem = ({ regionItem, deleteItem, itemCount}) => {
    return (
        <tr key={regionItem.id}>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/region_update/${regionItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(regionItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{regionItem.name}</td>
        </tr>
    )
}

export default RegionItem;