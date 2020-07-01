import React from 'react';
import { NavLink } from 'react-router-dom';

let JobTitleItem = ({ jobTitleItem, deleteItem, itemCount}) => {
    return (
        <tr key={jobTitleItem.id}>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/job_title_update/${jobTitleItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(jobTitleItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{jobTitleItem.name}</td>
        </tr>
    )
}

export default JobTitleItem;