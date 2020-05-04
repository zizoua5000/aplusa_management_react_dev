import React from 'react';
import Paginator from "../Common/Paginator/Paginator";
import VehicleMarkItem from './VehicleMarkItem';

let VehicleMarkList = ({ vehicleMarkList, currentPage,deleteItem, pageSize, totalItemsCount, onPageChanged }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1    
    return (
        <div >
            <div>
                <table className="table table-default table-bordered text-nowrap">
                    <thead className="bg-secondary text-light">
                        <tr>
                            <th>#</th>
                            <th></th>
                            <th className="w-100">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicleMarkList.map((item,key) => <VehicleMarkItem vehicleMarkItem={item} itemCount={itemCount++} deleteItem={deleteItem} key={key}/>)}
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

export default VehicleMarkList;