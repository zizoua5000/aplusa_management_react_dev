import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelDeviceList} from "../Common/Export/ExportExcelDevice";
import DeviceItem from './DeviceItem';
import {createField, Input,MultiSelect2} from "../Common/FormsControls/FormsControls";


let DeviceDataGrid = ({ deviceList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,deviceListAll,deviceModelListAll,deviceDetailListAll,simcardListAll,vehicleListAll,projectListAll,requestVehicleListAll,regionListAll,deviceLocationListAll,
    deviceTypeListAll,requestDeviceListAll,requestDeviceModelAll,requestDeviceTypeAll,requestDeviceMarkAll,deviceMarkListAll,companyListAll,requestCompanyListAll,requestDeviceDetailListAll,requestSimcardListAll,requestProjectListAll,requestRegionListAll,requestDeviceLocationListAll}) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    console.log(requestDeviceLocationListAll)
    return (
        <div >
            <div>
                <DeviceListReduxForm onSubmit={onSubmit} deviceList={deviceList} deleteItem={deleteItem} itemCount={itemCount} requestDeviceMarkAll={requestDeviceMarkAll} requestCompanyListAll={requestCompanyListAll} simcardListAll={simcardListAll} vehicleListAll={vehicleListAll} requestVehicleListAll={requestVehicleListAll} deviceLocationListAll={deviceLocationListAll}
                 onSorting={onSorting} sortData={sortData} deviceListAll={deviceListAll} deviceTypeListAll={deviceTypeListAll} deviceModelListAll={deviceModelListAll} companyListAll={companyListAll} deviceDetailListAll={deviceDetailListAll} requestSimcardListAll={requestSimcardListAll} projectListAll={projectListAll} regionListAll={regionListAll} requestDeviceLocationListAll={requestDeviceLocationListAll}
                 requestDeviceModelAll={requestDeviceModelAll} requestDeviceListAll={requestDeviceListAll} requestDeviceTypeAll={requestDeviceTypeAll} deviceMarkListAll={deviceMarkListAll} requestDeviceDetailListAll={requestDeviceDetailListAll} vehicleListAll={vehicleListAll} requestProjectListAll={requestProjectListAll} requestRegionListAll={requestRegionListAll}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const DeviceListForm= ({handleSubmit, error, initialValues,deviceList,deleteItem,itemCount,onSorting,sortData,deviceListAll,requestCompanyListAll,companyListAll,deviceDetailListAll,simcardListAll,vehicleListAll,projectListAll,requestProjectListAll,deviceLocationListAll,requestDeviceLocationListAll,
     deviceTypeListAll,deviceModelListAll,deviceMarkListAll, requestDeviceListAll,requestDeviceTypeAll,requestDeviceModelAll,requestDeviceMarkAll,requestDeviceDetailListAll,requestSimcardListAll,requestVehicleListAll,regionListAll,requestRegionListAll}) => {
        console.log(vehicleListAll)
        return (        
        <form onSubmit={handleSubmit}>   
        <div className="table-responsive">
            <table className="table table-default table-bordered  text-nowrap">
                <thead className="bg-secondary text-light">
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th className="w-50" >
                            Serie
                            <span onClick={(e) => {
                                 onSorting({serie:!sortData.serie});
                             }}><i className={sortData.serie? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-100">
                            Device Company
                            <span onClick={(e) => {
                                 onSorting({company:!sortData.company});
                             }}><i className={sortData.company? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
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
                        <th className="w-100">
                            Device Location
                            <span onClick={(e) => {
                                 onSorting({device_location:!sortData.device_location});
                             }}><i className={sortData.device_location? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                             Plate
                            <span onClick={(e) => {
                                 onSorting({plate:!sortData.plate});
                             }}><i className={sortData.plate? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-100">
                            Vehicle Company
                            <span onClick={(e) => {
                                 onSorting({company:!sortData.company});
                             }}><i className={sortData.company? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-100">
                            Project
                            <span onClick={(e) => {
                                 onSorting({project:!sortData.project});
                             }}><i className={sortData.project? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-100">
                            Region
                            <span onClick={(e) => {
                                 onSorting({region:!sortData.region});
                             }}><i className={sortData.region? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Simcard
                            <span onClick={(e) => {
                                 onSorting({device_type:!sortData.simcard});
                             }}><i className={sortData.simcard? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
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
                        <th className="w-100">{createField(null, 'device_location', [], MultiSelect2,null,deviceLocationListAll,'name',null,requestDeviceLocationListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'plate', [], MultiSelect2,null,vehicleListAll,'plate',null,requestVehicleListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'company', [], MultiSelect2,null,companyListAll,'name',null,requestCompanyListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'project', [], MultiSelect2,null,projectListAll,'name',null,requestProjectListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'region', [], MultiSelect2,null,regionListAll,'name',null,requestRegionListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'simcard', [], MultiSelect2,null,simcardListAll,'number',null,requestSimcardListAll,null,null,"")}</th>                       
                    </tr>
                </tbody>
                <tbody>
                    {deviceList.map((item, key) => <DeviceItem deviceItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
            </div>
        </form>
    )
}

const DeviceListReduxForm = reduxForm({form: 'DeviceList'})(DeviceListForm)



export default DeviceDataGrid;