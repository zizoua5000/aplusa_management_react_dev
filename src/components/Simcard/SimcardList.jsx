import React from 'react';
import SimcardItem from './SimcardItem';
import Paginator from "../Common/Paginator/Paginator";

let SimcardList = ({ simcardList,deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
     return  (
        <div >
            <div>
                <table className="table table-default table-bordered text-nowrap">
                    <thead className="bg-secondary text-light">
                        <tr>
                            <th>#</th>
                            <th></th>
                            <th className="w-100">Simcard</th>
                            <th className="w-100">Package</th>
                            <th className="w-100">Rouming</th>                       
                            <th className="w-100">Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {simcardList.map(item => <SimcardItem simcardItem={item} deleteItem={deleteItem} itemCount={itemCount++} />)}
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