import React from 'react';
import { NavLink } from 'react-router-dom';

let PriceItem = ({ priceItem, deleteItem, itemCount}) => {
    return (
        <tr key={priceItem.id}>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/price_type_update/${priceItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(priceItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{priceItem.name}</td>
        </tr>
    )
}

export default PriceItem;