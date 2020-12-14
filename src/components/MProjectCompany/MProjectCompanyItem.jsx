import React from 'react';
import { NavLink } from 'react-router-dom';

const MProjectCompanyItem= ({mProjectCompanyItem,deleteItem,itemCount}) => {
    return (
        <tr>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(mProjectCompanyItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{mProjectCompanyItem.project_detail.name}</td>
            <td>{mProjectCompanyItem.company_detail.name}</td>     
        </tr>
    )
}

export default MProjectCompanyItem;