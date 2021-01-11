import React from 'react';
import { NavLink } from 'react-router-dom';

let QaimeItem = ({ qaimeItem, deleteItem,changeStatusQaime, itemCount}) => {
    return (
        <tr key={qaimeItem.id}>
            <td>{itemCount}</td>
            <td>
                {qaimeItem.status==11 &&
                <>
                    <NavLink title="Delete" to='#' onClick={(e) => {
                                    deleteItem(qaimeItem.id);
                                }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
                    <NavLink title="Detail" to={`/qaime_detail/${qaimeItem.id}`}><i className="text-secondary fas fa-eye ml-2"></i></NavLink>
                    <NavLink title="Pending" to='#' onClick={(e) => {
                                    changeStatusQaime(qaimeItem.id);
                                }}><i className="text-secondary fas fa-lock-open ml-2"></i></NavLink> 
                </>
                }
                {qaimeItem.status==4 &&
                <>
                    <NavLink title="Detail" to={`/qaime_detail/${qaimeItem.id}`}><i className="text-secondary fas fa-eye ml-2"></i></NavLink>
                    <NavLink title="Completed" to='#'><i className="text-secondary fas fa-lock ml-2"></i></NavLink> 
                </>
                }
            </td>
            <td>{qaimeItem.status_detail.name}</td>
            <td>{qaimeItem.name}</td>
            <td>{qaimeItem.responsible_person_detail.department_detail.name}</td>
            <td>{qaimeItem.qaime_type_detail.name}</td>
            <td>{qaimeItem.qaime_datetime}</td>
            <td>{qaimeItem.recipient_detail.first_name + " " + qaimeItem.recipient_detail.last_name}</td>
        </tr>
    )
}

export default QaimeItem;