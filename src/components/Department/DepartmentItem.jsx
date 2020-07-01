import React from 'react';
import { NavLink } from 'react-router-dom';

let DepartmentItem = ({ departmentItem, deleteItem, itemCount}) => {
    return (
        <tr key={departmentItem.id}>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/department_update/${departmentItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(departmentItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{departmentItem.name}</td>
        </tr>
    )
}

export default DepartmentItem;