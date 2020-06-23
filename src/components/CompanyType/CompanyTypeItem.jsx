import React from 'react';
import { NavLink } from 'react-router-dom';

let CompanyTypeItem = ({ companyTypeItem, deleteItem, itemCount}) => {
    return (
        <tr key={companyTypeItem.id}>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/company_type_update/${companyTypeItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(companyTypeItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{companyTypeItem.name}</td>
        </tr>
    )
}

export default CompanyTypeItem;