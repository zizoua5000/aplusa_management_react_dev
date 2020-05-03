import React from 'react';
import { NavLink } from 'react-router-dom';
import Paginator from "../Common/Paginator/Paginator";
import VehicleModelItem from './VehicleModelItem';

let VehicleModelList = ({ vehicleModelList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    return (
        <div >
            <div>
                <table className="table table-default table-bordered text-nowrap">
                    <thead className="bg-secondary text-light">
                        <tr>
                            <th>#</th>
                            <th></th>
                            <th>Name</th>
                            <th className="w-100">Vehicle Mark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicleModelList.map((item, key) => <VehicleModelItem vehicleModelItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                    </tbody>
                </table>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />

                </div>
            </div>
        </div>
    )
}

export default VehicleModelList;
