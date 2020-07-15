import React from 'react';
import { NavLink } from 'react-router-dom';


let PriceItem = ({ priceItem, deleteItem, itemCount}) => {
    return (
        <tr key={priceItem.id}>
            <td>{itemCount}</td>
            <td>
                <NavLink title="Update" to={`/price_update/${priceItem.id}`}><i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                <NavLink title="Delete" to='#' onClick={(e) => {
                                 deleteItem(priceItem.id);
                             }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
            </td>
            <td>{priceItem.start_datetime}</td>
            <td>{priceItem.end_datetime}</td>
            <td>{priceItem.price_type_detail.name}</td>
            <td>{priceItem.sell_price}</td>
            <td>{priceItem.project_detail.name}</td>
            <td>{priceItem.device_model_detail.name}</td>
            <td>{priceItem.accessory_model_detail.name}</td>
            <td>{priceItem.is_second_hand===true?<i className="text-success fas fa-check-circle ml-4"></i>:<i className="text-warning fas fa-times-circle ml-4"></i>}</td>
        </tr>
    )
}

export default PriceItem;