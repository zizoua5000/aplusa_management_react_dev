import React from 'react';
import { NavLink } from 'react-router-dom';

let SimcardItem = ({ simcardItem, deleteItem, itemCount}) => {
    // console.log(simcardItem)
    return (
        <tr key={simcardItem.id}>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/simcard_update/${simcardItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                    deleteItem(simcardItem.id);
                                }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{simcardItem.number}</td>
            <td>{simcardItem.package}</td>
            <td>{simcardItem.has_roumnig===true?<i className="text-success fas fa-check-circle ml-4"></i>:<i className="text-warning fas fa-times-circle ml-4"></i>}</td>
            <td>{simcardItem.is_active===true?<i className="text-success fas fa-check-circle ml-3"></i>:<i className="text-warning fas fa-times-circle ml-3"></i>}</td>
        </tr>
    )
}

export default SimcardItem;