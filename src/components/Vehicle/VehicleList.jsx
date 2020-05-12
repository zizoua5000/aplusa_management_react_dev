import React from 'react';
import Paginator from "../Common/Paginator/Paginator";
import VehicleItem from './VehicleItem';

let VehicleList = ({ vehicleList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    console.log(vehicleList)
    return (
        <div >
            <div>
                <table className="table table-default table-bordered text-nowrap">
                    <thead className="bg-secondary text-light">
                        <tr>
                            <th>#</th>
                            <th></th>
                            <th className="w-100">Plate</th>
                            <th className="w-100">Vehicle Serie Number</th>
                            <th className="w-100">Vehicle Model</th>
                            <th className="w-100">Vehicle Mark</th>
                            <th className="w-100">Vehicle Type</th>
                            <th className="w-100">Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicleList.map((item, key) => <VehicleItem vehicleItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
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

export default VehicleList;
