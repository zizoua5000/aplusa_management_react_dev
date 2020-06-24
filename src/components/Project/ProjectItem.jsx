import React from 'react';
import { NavLink } from 'react-router-dom';

let ProjectItem = ({ projectItem, deleteItem, itemCount}) => {
    return (
        <tr key={projectItem.id}>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/project_update/${projectItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(projectItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{projectItem.name}</td>
        </tr>
    )
}

export default ProjectItem;