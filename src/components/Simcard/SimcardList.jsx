import React from 'react';
import SimcardItem from './SimcardItem';
import { NavLink } from 'react-router-dom';
import Paginator from "../Common/Paginator/Paginator";

let SimcardList = ({ simcardList, currentPage, pageSize, totalItemsCount, onPageChanged }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
     return  (
        <div >
            <div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-info">Simcard List</h1>
                    <NavLink to="/vehicle_type_create" className="btn btn-info aa_create_trip"><i className="text-light fas fa-plus"></i> New</NavLink>
                </div>
                <table className="table table-default table-bordered text-nowrap">
                    <thead className="bg-secondary text-light">
                        <tr>
                            <th>#</th>
                            <th></th>
                            <th className="w-100">Simcard</th>
                        </tr>
                    </thead>
                    <tbody>
                        {simcardList.map(item => <SimcardItem simcardItem={item} itemCount={itemCount++} />)}
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

export default SimcardList;