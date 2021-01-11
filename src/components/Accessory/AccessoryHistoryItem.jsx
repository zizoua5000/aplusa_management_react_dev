import React from 'react';
import { NavLink } from 'react-router-dom';

const AccessoryHistoryItem= ({accessoryHistoryItem,itemCount}) => {
    return (
        <tr>
            <td>{itemCount}</td>
            <td>{accessoryHistoryItem.add_count}</td>
            <td>{accessoryHistoryItem.rated_price}</td>
            <td>{accessoryHistoryItem.entry_warehouse_date}</td>
            <td>{accessoryHistoryItem.status_detail.name}</td>
        </tr>
    )
}

export default AccessoryHistoryItem;