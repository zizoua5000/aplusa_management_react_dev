import React from 'react';
import { NavLink } from 'react-router-dom';

let SimcardItem = ({ simcardItem ,itemCount}) => {
    return (
        <tr key={simcardItem.id}>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/vehicle_type_update/${simcardItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#'><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{simcardItem.name}</td>
        </tr>
    )
}

export default SimcardItem;