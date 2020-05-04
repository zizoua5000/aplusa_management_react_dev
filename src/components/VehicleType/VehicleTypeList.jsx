import React from 'react';
import VehicleTypeItem from './VehicleTypeItem';
import Paginator from "../Common/Paginator/Paginator";

let VehicleTypeList = ({ vehicleTypeList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
     return  (
        <div >
            <div>
                <table className="table table-default table-bordered text-nowrap">
                    <thead className="bg-secondary text-light">
                        <tr>
                            <th>#</th>
                            <th></th>
                            <th className="w-100">Vehicle Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicleTypeList.map((item, key) => <VehicleTypeItem vehicleTypeItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key} />)}
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

export default VehicleTypeList;