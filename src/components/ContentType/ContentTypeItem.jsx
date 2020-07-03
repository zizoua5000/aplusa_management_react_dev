import React from 'react';
import { NavLink } from 'react-router-dom';

let ContentTypeItem = ({ contentTypeItem, deleteItem, itemCount}) => {
    return (
        <tr key={contentTypeItem.id}>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/content_type_update/${contentTypeItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(contentTypeItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{contentTypeItem.app_label}</td>
            <td>{contentTypeItem.model}</td>
        </tr>
    )
}

export default ContentTypeItem;