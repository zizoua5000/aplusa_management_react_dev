import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelFWVersionList} from "../Common/Export/ExportExcelFWVersion";
import FWVersionItem from './FWVersionItem';
import {createField, Input} from "../Common/FormsControls/FormsControls";

let FWVersionDataGrid = ({ fwVersionList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,fwVersionListAll,fwVersionFunction }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    return (
        <div >
            <div>
                <FWVersionListReduxForm onSubmit={onSubmit} fwVersionList={fwVersionList} deleteItem={deleteItem} 
                    itemCount={itemCount} onSorting={onSorting} sortData={sortData} fwVersionListAll={fwVersionListAll} fwVersionFunction={fwVersionFunction}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const FWVersionListForm= ({handleSubmit, error, initialValues,fwVersionList,deleteItem,itemCount,onSorting,sortData,fwVersionListAll,fwVersionFunction}) => {
    return (
        
        <form >   
            <table className="table table-default table-bordered text-nowrap">
                <thead className="bg-secondary text-light">
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th className="w-50" >
                            Name
                            <span onClick={(e) => {
                                 onSorting({name:!sortData.name});
                             }}><i className={sortData.name? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><ExportExcelFWVersionList csvData={fwVersionListAll} fileName="FW Version" loadDataFunction={fwVersionFunction} /></th>
                        <th><button className="btn btn-info" onClick={handleSubmit}>Filter</button></th>
                        <th className="w-50">{createField(null, 'name',[],Input,'Name')}    </th>
                    </tr>
                </tbody>
                <tbody>
                    {fwVersionList.map((item, key) => <FWVersionItem fwVersionItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const FWVersionListReduxForm = reduxForm({form: 'FWVersionList'})(FWVersionListForm)

export default FWVersionDataGrid;