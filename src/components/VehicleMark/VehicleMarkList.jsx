import React from 'react';
import VehicleMarkItem from './VehicleMarkItem';

let VehicleMarkList = ({ vehicleMarkList }) => {

    return (
        <div>
            <h2>Vehicle Mark List</h2>
            <table className="table table-default table-bordered">
                <thead className="bg-secondary text-light">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicleMarkList.map((vm, key) => <VehicleMarkItem vehicleMarkItem={vm} key={key} />)}
                </tbody>
            </table>
        </div>
    )

}

export default VehicleMarkList;