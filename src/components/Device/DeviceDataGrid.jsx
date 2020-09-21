import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelDeviceList} from "../Common/Export/ExportExcelDevice";
import DeviceItem from './DeviceItem';
import {createField, Input,MultiSelect2,BooleanDropdown} from "../Common/FormsControls/FormsControls";


let DeviceDataGrid = ({ deviceList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,deviceListAll,deviceModelListAll,simcardListAll,vehicleListAll,personListAll,
    projectListAll,requestVehicleListAll,regionListAll,deviceLocationListAll, deviceTypeListAll,requestDeviceListAll,requestDeviceModelAll,requestDeviceTypeAll,requestDeviceMarkAll,deviceMarkListAll,companyListAll,deviceDetailListAll,
    requestDeviceDetailListAll,requestCompanyListAll,requestSimcardListAll,requestProjectListAll,requestRegionListAll,requestDeviceLocationListAll, statusListAll, requestStatusListAll,configurationListAll,requestConfigurationListAll,
    fwVersionListAll,requestFWVersionListAll,requestPersonListAll,}) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    console.log(requestDeviceLocationListAll)
    return (
        <div >
            <div>
                <DeviceListReduxForm onSubmit={onSubmit} deviceList={deviceList} deleteItem={deleteItem} itemCount={itemCount} requestDeviceMarkAll={requestDeviceMarkAll} requestCompanyListAll={requestCompanyListAll} 
                    simcardListAll={simcardListAll} vehicleListAll={vehicleListAll} requestVehicleListAll={requestVehicleListAll} deviceLocationListAll={deviceLocationListAll} onSorting={onSorting} sortData={sortData}
                    deviceListAll={deviceListAll} deviceTypeListAll={deviceTypeListAll} deviceModelListAll={deviceModelListAll} companyListAll={companyListAll} requestConfigurationListAll={requestConfigurationListAll} 
                    requestFWVersionListAll={requestFWVersionListAll} deviceDetailListAll={deviceDetailListAll} requestDeviceDetailListAll={requestDeviceDetailListAll} requestSimcardListAll={requestSimcardListAll} 
                    projectListAll={projectListAll} regionListAll={regionListAll} requestDeviceLocationListAll={requestDeviceLocationListAll} statusListAll={statusListAll} requestDeviceModelAll={requestDeviceModelAll} 
                    requestDeviceListAll={requestDeviceListAll} requestDeviceTypeAll={requestDeviceTypeAll} deviceMarkListAll={deviceMarkListAll} configurationListAll={configurationListAll} fwVersionListAll={fwVersionListAll}
                    requestProjectListAll={requestProjectListAll} requestRegionListAll={requestRegionListAll} requestStatusListAll={requestStatusListAll} personListAll={personListAll} requestPersonListAll={requestPersonListAll}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const DeviceListForm= ({handleSubmit, error, initialValues,deviceList,deleteItem,itemCount,onSorting,sortData,deviceListAll,
    requestCompanyListAll,companyListAll,simcardListAll,vehicleListAll,projectListAll,configurationListAll,fwVersionListAll,requestProjectListAll,
    deviceLocationListAll,requestDeviceLocationListAll,deviceTypeListAll,deviceModelListAll,deviceMarkListAll, requestDeviceListAll,
    requestDeviceTypeAll,requestDeviceModelAll,requestDeviceMarkAll,requestSimcardListAll,requestVehicleListAll,deviceDetailListAll,requestDeviceDetailListAll,
    regionListAll,requestRegionListAll,statusListAll,requestStatusListAll,requestConfigurationListAll,requestFWVersionListAll,personListAll,requestPersonListAll}) => {
        console.log(personListAll)
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
                        <th className="w-50" >
                            Status
                            <span onClick={(e) => {
                                 onSorting({status:!sortData.status});
                             }}><i className={sortData.status? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-100">
                            Status Datetime
                            <span onClick={(e) => {
                                 onSorting({status_datetime:!sortData.status_datetime});
                             }}><i className={sortData.status_datetime? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
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
                            Device Location
                            <span onClick={(e) => {
                                 onSorting({device_location:!sortData.device_location});
                             }}><i className={sortData.device_location? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
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
                            Recipient
                            <span onClick={(e) => {
                                 onSorting({recipient:!sortData.recipient});
                             }}><i className={sortData.recipient? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
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
                        <th className="w-50" >
                            Package
                            <span onClick={(e) => {
                                 onSorting({package:!sortData.package});
                             }}><i className={sortData.package? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Rouming
                            <span onClick={(e) => {
                                 onSorting({has_rouming:!sortData.has_rouming});
                             }}><i className={sortData.has_rouming? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Active
                            <span onClick={(e) => {
                                 onSorting({is_active:!sortData.is_active});
                             }}><i className={sortData.is_active? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-100">
                            Configuration
                            <span onClick={(e) => {
                                 onSorting({configuration:!sortData.configuration});
                             }}><i className={sortData.configuration? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-100">
                            FW Version
                            <span onClick={(e) => {
                                 onSorting({fw_version:!sortData.fw_version});
                             }}><i className={sortData.fw_version? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-100">
                            Sell Count
                            <span onClick={(e) => {
                                 onSorting({sell_count:!sortData.sell_count});
                             }}><i className={sortData.sell_count? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-100">
                            Price Datetime
                            <span onClick={(e) => {
                                 onSorting({price_datetime:!sortData.price_datetime});
                             }}><i className={sortData.price_datetime? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-100">
                            Comment
                            <span onClick={(e) => {
                                 onSorting({comment:!sortData.comment});
                             }}><i className={sortData.comment? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
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
                        <th className="w-100">{createField(null, 'status', [], MultiSelect2,null,statusListAll,'name',null,requestStatusListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'status_datetime',[], MultiSelect2,null,deviceDetailListAll,'status_datetime',null,requestDeviceDetailListAll,null,'status_datetime',true,"")}</th>
                        <th className="w-100">{createField(null, 'plate', [], MultiSelect2,null,vehicleListAll,'plate',null,requestVehicleListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'company_vehicle', [], MultiSelect2,null,companyListAll,'name',null,requestCompanyListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'device_location', [], MultiSelect2,null,deviceLocationListAll,'name',null,requestDeviceLocationListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'project', [], MultiSelect2,null,projectListAll,'name',null,requestProjectListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'recipient', [], MultiSelect2,null,personListAll,'full_name',null,requestPersonListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'region', [], MultiSelect2,null,regionListAll,'name',null,requestRegionListAll,null,null,"")}</th>                     
                        <th className="w-100">{createField(null, 'simcard', [], MultiSelect2,null,simcardListAll,'number',null,requestSimcardListAll,null,null,"")}</th>                    
                        <th className="w-100">{createField(null, 'package', [], MultiSelect2,null,simcardListAll,'package',null,requestSimcardListAll,null,'package',"")}</th>
                        <th className="w-100">{createField(null, 'has_rouming', [], BooleanDropdown,null,null,null,null,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'is_active', [], BooleanDropdown,null,null,null,null,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'configuration', [], MultiSelect2,null,configurationListAll,'name',null,requestConfigurationListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'fw_version', [], MultiSelect2,null,fwVersionListAll,'name',null,requestFWVersionListAll,null,null,"")}</th>
                        <th className="w-50">{createField(null, 'sell_count',[],Input,'Sell Count')} </th>
                        <th className="w-50">{createField(null, 'price_datetime',[], MultiSelect2,null,deviceDetailListAll,'price_datetime',null,requestDeviceDetailListAll,null,'price_datetime',true,"")}</th>
                        <th className="w-50">{createField(null, 'comment',[],Input,'Comment')} </th>                       
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
