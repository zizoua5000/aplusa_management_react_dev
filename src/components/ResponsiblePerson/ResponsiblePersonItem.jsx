import React from 'react';
import { NavLink } from 'react-router-dom';

let ResponsiblePersonItem = ({ responsiblePersonItem, deleteItem, itemCount}) => {
    return (
        <tr key={responsiblePersonItem.id}>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/responsible_person_update/${responsiblePersonItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(responsiblePersonItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{responsiblePersonItem.department_detail.name}</td>
            <td>{responsiblePersonItem.department_chief_detail.full_name}</td>
            <td>{responsiblePersonItem.chief_substitute_detail.full_name}</td>
            <td>{responsiblePersonItem.accounter_detail.full_name}</td>
            <td>{responsiblePersonItem.recipient_detail.full_name}</td>
            <td>{responsiblePersonItem.provider_detail.full_name}</td>
        </tr>
    )
}

export default ResponsiblePersonItem;