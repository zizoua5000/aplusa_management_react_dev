import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelDeviceTypeList} from "../Common/Export/ExportExcelDeviceType";
import DeviceTypeItem from './DeviceTypeItem';
import {createField, Input} from "../Common/FormsControls/FormsControls";

let DeviceTypeDataGrid = ({ deviceTypeList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,deviceTypeListAll,requestDeviceTypeAll }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    return (
        <div >
            <div>
                <DeviceTypeListReduxForm onSubmit={onSubmit} deviceTypeList={deviceTypeList} deleteItem={deleteItem} 
                    itemCount={itemCount} onSorting={onSorting} sortData={sortData} deviceTypeListAll={deviceTypeListAll} requestDeviceTypeAll={requestDeviceTypeAll}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const DeviceTypeListForm= ({handleSubmit, error, initialValues,deviceTypeList,deleteItem,itemCount,onSorting,sortData,deviceTypeListAll,requestDeviceTypeAll}) => {
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
                        <th><ExportExcelDeviceTypeList csvData={deviceTypeListAll} fileName="Device Type" requestLoadData={requestDeviceTypeAll} /></th>
                        <th><button className="btn btn-info" onClick={handleSubmit}>Filter</button></th>
                        <th className="w-50">{createField(null, 'name',[],Input,'Name')}    </th>
                    </tr>
                </tbody>
                <tbody>
                    {deviceTypeList.map((item, key) => <DeviceTypeItem deviceTypeItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const DeviceTypeListReduxForm = reduxForm({form: 'DeviceTypeList'})(DeviceTypeListForm)

export default DeviceTypeDataGrid;