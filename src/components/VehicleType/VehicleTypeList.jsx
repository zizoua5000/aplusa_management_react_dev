import React from 'react';
import VehicleTypeItem from './VehicleTypeItem';

let VehicleTypeList = ({ vehicleTypeList }) => {
    return (
        <div>
            <h2>Vehicle Type List</h2>
            <table className="table table-default table-bordered">
                <thead className="bg-secondary text-light">
                    <tr>
                        <th>#</th>
                        <th className="w-100">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vehicleTypeList.map(vt => <VehicleTypeItem vehicleTypeItem={vt} />)
                    }
                </tbody>
            </table>
        </div>
    )

}

export default VehicleTypeList;