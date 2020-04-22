import React from 'react';
import VehicleMark from './VehicleMark';

let VehicleMarks = ({ vehicleMarks }) => {

    return (
        <div>
            <h2>Vehicle Marks</h2>
            <table className="table table-default table-bordered">
                <thead className="bg-secondary text-light">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicleMarks.map((vm, key) => <VehicleMark vehicleMark={vm} key={key} />)}
                </tbody>
            </table>
        </div>
    )

}

export default VehicleMarks;