import React from 'react';
import { NavLink } from 'react-router-dom';

const UserItem= ({userItem,deleteItem,itemCount}) => {
    return (
        <tr>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/user_update/${userItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(userItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{userItem.username}</td>
            <td>{userItem.is_active===true?<i className="text-success fas fa-check-circle ml-3"></i>:<i className="text-warning fas fa-times-circle ml-3"></i>}</td>
        </tr>
    )
}

export default UserItem;