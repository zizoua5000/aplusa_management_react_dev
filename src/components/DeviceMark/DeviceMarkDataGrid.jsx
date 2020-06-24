import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelDeviceMarkList} from "../Common/Export/ExportExcelDeviceMark";
import DeviceMarkItem from './DeviceMarkItem';
import {createField, Input} from "../Common/FormsControls/FormsControls";

let DeviceMarkDataGrid = ({ deviceMarkList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,deviceMarkListAll,requestDeviceMarkAll }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    return (
        <div >
            <div>
                <DeviceMarkListReduxForm onSubmit={onSubmit} deviceMarkList={deviceMarkList} deleteItem={deleteItem} 
                    itemCount={itemCount} onSorting={onSorting} sortData={sortData} deviceMarkListAll={deviceMarkListAll} requestDeviceMarkAll={requestDeviceMarkAll}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const DeviceMarkListForm= ({handleSubmit, error, initialValues,deviceMarkList,deleteItem,itemCount,onSorting,sortData,deviceMarkListAll,requestDeviceMarkAll}) => {
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
                        <th><ExportExcelDeviceMarkList csvData={deviceMarkListAll} fileName="Device Mark" requestLoadData={requestDeviceMarkAll} /></th>
                        <th><button className="btn btn-info" onClick={handleSubmit}>Filter</button></th>
                        <th className="w-50">{createField(null, 'name',[],Input,'Name')}    </th>
                    </tr>
                </tbody>
                <tbody>
                    {deviceMarkList.map((item, key) => <DeviceMarkItem deviceMarkItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const DeviceMarkListReduxForm = reduxForm({form: 'DeviceMarkList'})(DeviceMarkListForm)

export default DeviceMarkDataGrid;