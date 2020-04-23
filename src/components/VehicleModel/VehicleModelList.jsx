import React from 'react';
import Paginator from "../Common/Paginator/Paginator";
import VehicleModelItem from './VehicleModelItem';

let VehicleModelList = ({ vehicleModelList, currentPage, pageSize, totalItemsCount, onPageChanged}) => {
    console.log(vehicleModelList)
    // return vehicleModelList.map(item=> <VehicleModelItem vehicleModelItem={item}/>)
    return (          
        <div >
            <Paginator currentPage={currentPage} pageSize={pageSize} 
            totalItemsCount={totalItemsCount}  onPageChanged={onPageChanged}/>

            <div>
                <h2>Vehicle Model List</h2>
                <table className="table table-default table-bordered">
                    <thead className="bg-secondary text-light">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicleModelList.map(item=> <VehicleModelItem vehicleModelItem={item}/>)}
                    </tbody>
                </table>
            </div>
        </div>         
)
}

export default VehicleModelList;