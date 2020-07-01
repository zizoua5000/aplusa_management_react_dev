import React from 'react';
import { NavLink } from 'react-router-dom';

let PriceTypeItem = ({ priceTypeItem, deleteItem, itemCount}) => {
    return (
        <tr key={priceTypeItem.id}>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/price_type_update/${priceTypeItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(priceTypeItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{priceTypeItem.name}</td>
        </tr>
    )
}

export default PriceTypeItem;