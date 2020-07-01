import React from 'react';
import { NavLink } from 'react-router-dom';

const CompanyItem= ({companyItem,deleteItem,itemCount}) => {
    return (
        <tr>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/company_update/${companyItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(companyItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{companyItem.name}</td>
            <td>{companyItem.main_company_detail.name}</td>
            <td>{companyItem.company_type_detail.name}</td>     
        </tr>
    )
}

export default CompanyItem;