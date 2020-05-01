import React from 'react';
import { NavLink } from 'react-router-dom';

let SimcardItem = ({ simcardItem ,itemCount}) => {
    return (
        <tr key={simcardItem.id}>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/simcard_update/${simcardItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#'><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{simcardItem.number}</td>
            <td>{simcardItem.package}</td>
            <td>{simcardItem.is_active}</td>
            <td>{simcardItem.has_rouming}</td>
        </tr>
    )
}

export default SimcardItem;