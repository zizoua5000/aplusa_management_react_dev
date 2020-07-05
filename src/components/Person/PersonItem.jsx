import React from 'react';
import { NavLink } from 'react-router-dom';

const PersonItem= ({personItem,deleteItem,itemCount}) => {
    return (
        <tr>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/person_update/${personItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(personItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{personItem.first_name}</td>
            <td>{personItem.last_name}</td>
            <td>{personItem.phone}</td>
            <td>{personItem.email}</td>
            <td>{personItem.company_detail.name}</td>
            <td>{personItem.department_detail.name}</td>   
            <td>{personItem.job_title_detail.name}</td>   
            <td>{personItem.user_detail.username}</td>        
        </tr>
    )
}

export default PersonItem;