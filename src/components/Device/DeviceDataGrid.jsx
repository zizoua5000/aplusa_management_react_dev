import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelDeviceList} from "../Common/Export/ExportExcelDevice";
import DeviceItem from './DeviceItem';
import {createField, Input,MultiSelect2} from "../Common/FormsControls/FormsControls";


let DeviceDataGrid = ({ deviceList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,deviceListAll,deviceModelListAll,
    deviceTypeListAll,requestDeviceListAll,requestDeviceModelAll,requestDeviceTypeAll,requestDeviceMarkAll,deviceMarkListAll,companyListAll,requestCompanyListAll}) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
        console.log(deviceList)
    return (
        <div >
            <div>
                <DeviceListReduxForm onSubmit={onSubmit} deviceList={deviceList} deleteItem={deleteItem} itemCount={itemCount} requestDeviceMarkAll={requestDeviceMarkAll} requestCompanyListAll={requestCompanyListAll}
                 onSorting={onSorting} sortData={sortData} deviceListAll={deviceListAll} deviceTypeListAll={deviceTypeListAll} deviceModelListAll={deviceModelListAll} companyListAll={companyListAll}
                 requestDeviceModelAll={requestDeviceModelAll} requestDeviceListAll={requestDeviceListAll} requestDeviceTypeAll={requestDeviceTypeAll} deviceMarkListAll={deviceMarkListAll}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const DeviceListForm= ({handleSubmit, error, initialValues,deviceList,deleteItem,itemCount,onSorting,sortData,deviceListAll,requestCompanyListAll,companyListAll,
     deviceTypeListAll,deviceModelListAll,deviceMarkListAll, requestDeviceListAll,requestDeviceTypeAll,requestDeviceModelAll,requestDeviceMarkAll}) => {
    return (        
        <form onSubmit={handleSubmit}>   
            <table className="table table-default table-bordered text-nowrap">
                <thead className="bg-secondary text-light">
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th className="w-50" >
                            Serie
                            <span onClick={(e) => {
                                 onSorting({serie:!sortData.serie});
                             }}><i className={sortData.name? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-100">
                            Company
                            <span onClick={(e) => {
                                 onSorting({company:!sortData.company});
                             }}><i className={sortData.serie_number? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Device Model
                            <span onClick={(e) => {
                                 onSorting({device_model:!sortData.device_model});
                             }}><i className={sortData.device_model? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Device Mark
                            <span onClick={(e) => {
                                 onSorting({device_mark:!sortData.device_mark});
                             }}><i className={sortData.device_mark? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Device Type
                            <span onClick={(e) => {
                                 onSorting({device_type:!sortData.device_type});
                             }}><i className={sortData.device_type? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><ExportExcelDeviceList csvData={deviceListAll} fileName="Device" requestLoadData={requestDeviceListAll} /></th>
                        <th><button className="btn btn-info">Filter</button></th>
                        <th className="w-100">{createField(null, 'serie', [], MultiSelect2,null,deviceListAll,'serie',null,requestDeviceListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'company', [], MultiSelect2,null,companyListAll,'name',null,requestCompanyListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'device_model', [], MultiSelect2,null,deviceModelListAll,'name',null,requestDeviceModelAll,null,null,"")}</th>  
                        <th className="w-100">{createField(null, 'device_mark', [], MultiSelect2,null,deviceMarkListAll,'name',null,requestDeviceMarkAll,null,null,"")}</th>     
                        <th className="w-100">{createField(null, 'device_type', [], MultiSelect2,null,deviceTypeListAll,'name',null,requestDeviceTypeAll,null,null,"")}</th>
                    </tr>
                </tbody>
                <tbody>
                    {deviceList.map((item, key) => <DeviceItem deviceItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const DeviceListReduxForm = reduxForm({form: 'DeviceList'})(DeviceListForm)



export default DeviceDataGrid;