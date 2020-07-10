import React from 'react';
import { NavLink } from 'react-router-dom';

const UserPermissionItem= ({userPermissionItem,itemCount}) => {
    let permissions="";
    if (userPermissionItem.user_permissions_detail.length!=0){
        let result=userPermissionItem.user_permissions_detail.map(p=>{
            return <span className="badge badge-light" key={p.id}>{p.name}</span>
        })
        permissions=result
    }
   
    return (
        <tr>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/user_permission_update/${userPermissionItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
            </td>
            <td>{userPermissionItem.username}</td>
            <td>{permissions}</td>     
        </tr>
    )
}

export default UserPermissionItem;