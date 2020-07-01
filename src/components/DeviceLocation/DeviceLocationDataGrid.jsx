import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelDeviceLocationList} from "../Common/Export/ExportExcelDeviceLocation";
import DeviceLocationItem from './DeviceLocationItem';
import {createField, Input} from "../Common/FormsControls/FormsControls";

let DeviceLocationDataGrid = ({ deviceLocationList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,deviceLocationListAll,requestDeviceLocationAll }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    return (
        <div >
            <div>
                <DeviceLocationListReduxForm onSubmit={onSubmit} deviceLocationList={deviceLocationList} deleteItem={deleteItem} 
                    itemCount={itemCount} onSorting={onSorting} sortData={sortData} deviceLocationListAll={deviceLocationListAll} requestDeviceLocationAll={requestDeviceLocationAll}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const DeviceLocationListForm= ({handleSubmit, error, initialValues,deviceLocationList,deleteItem,itemCount,onSorting,sortData,deviceLocationListAll,requestDeviceLocationAll}) => {
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
                        <th><ExportExcelDeviceLocationList csvData={deviceLocationListAll} fileName="Device Location" requestLoadData={requestDeviceLocationAll} /></th>
                        <th><button className="btn btn-info" onClick={handleSubmit}>Filter</button></th>
                        <th className="w-50">{createField(null, 'name',[],Input,'Name')}    </th>
                    </tr>
                </tbody>
                <tbody>
                    {deviceLocationList.map((item, key) => <DeviceLocationItem deviceLocationItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const DeviceLocationListReduxForm = reduxForm({form: 'DeviceLocationList'})(DeviceLocationListForm)

export default DeviceLocationDataGrid;