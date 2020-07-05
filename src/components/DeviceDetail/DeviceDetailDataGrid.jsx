import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelDeviceDetailList} from "../Common/Export/ExportExcelDeviceDetail";
import DeviceDetailItem from './DeviceDetailItem';
import {createField, Input,MultiSelect2} from "../Common/FormsControls/FormsControls";

let DeviceDetailDataGrid = ({ deviceDetailList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,deviceDetailListAll,requestDeviceDetailAll,
    statusListAll,simcardListAll,vehicleListAll,companyListAll,deviceLocationListAll,configurationListAll,projectListAll,regionListAll,requestStatusListAll,requestSimcardListAll,
    requestVehicleListAll,requestCompanyListAll,requestDeviceLocationListAll,requestConfigurationListAll,requestProjectListAll,requestRegionListAll }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    console.log("Current PAGE ",currentPage)

    return (
        <div >
            <div>
                <DeviceDetailListReduxForm onSubmit={onSubmit} onSorting={onSorting} sortData={sortData} deviceDetailList={deviceDetailList} deleteItem={deleteItem} itemCount={itemCount} deviceDetailListAll={deviceDetailListAll} 
                requestDeviceDetailAll={requestDeviceDetailAll} statusListAll={statusListAll} simcardListAll={simcardListAll} vehicleListAll={vehicleListAll} companyListAll={companyListAll} deviceLocationListAll={deviceLocationListAll} 
                configurationListAll={configurationListAll} projectListAll={projectListAll} regionListAll={regionListAll} requestStatusListAll={requestStatusListAll} requestSimcardListAll={requestSimcardListAll} requestVehicleListAll={requestVehicleListAll}
                requestCompanyListAll={requestCompanyListAll} requestDeviceLocationListAll={requestDeviceLocationListAll} requestConfigurationListAll={requestConfigurationListAll} requestProjectListAll={requestProjectListAll} requestRegionListAll={requestRegionListAll}   />
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const DeviceDetailListForm= ({handleSubmit, error, initialValues,deviceDetailList,deleteItem,itemCount,onSorting,sortData,deviceDetailListAll,requestDeviceDetailAll,
    statusListAll,simcardListAll,vehicleListAll,companyListAll,deviceLocationListAll,configurationListAll,projectListAll,regionListAll,requestStatusListAll,requestSimcardListAll,
    requestVehicleListAll,requestCompanyListAll,requestDeviceLocationListAll,requestConfigurationListAll,requestProjectListAll,requestRegionListAll}) => {
    return (        
        <form onSubmit={handleSubmit}>   
        <div className="table-responsive">
            <table className="table table-default table-bordered text-nowrap">
                <thead className="bg-secondary text-light">
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th className="w-50" >
                            ID
                            <span onClick={(e) => {
                                 onSorting({id:!sortData.id});
                             }}><i className={sortData.id? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
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
                            Simcard
                            <span onClick={(e) => {
                                 onSorting({simcard:!sortData.simcard});
                             }}><i className={sortData.simcard? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-100">
                            Vehicle
                            <span onClick={(e) => {
                                 onSorting({vehicle:!sortData.vehicle});
                             }}><i className={sortData.vehicle? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-100">
                            Company
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
                            Configuration
                            <span onClick={(e) => {
                                 onSorting({configuration:!sortData.configuration});
                             }}><i className={sortData.configuration? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
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
                        <th className="w-100">
                            Comment
                            <span onClick={(e) => {
                                 onSorting({comment:!sortData.comment});
                             }}><i className={sortData.comment? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
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
                            Status Datetime
                            <span onClick={(e) => {
                                 onSorting({status_datetime:!sortData.status_datetime});
                             }}><i className={sortData.status_datetime? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-100">
                            Sell Count
                            <span onClick={(e) => {
                                 onSorting({sell_count:!sortData.sell_count});
                             }}><i className={sortData.sell_count? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><ExportExcelDeviceDetailList csvData={deviceDetailListAll} fileName="Device Detail" requestLoadData={requestDeviceDetailAll}/></th>
                        <th><button className="btn btn-info">Filter</button></th>
                        <th className="w-50">{createField(null, 'id',[],Input,'ID')} </th>
                        <th className="w-100">{createField(null, 'status', [], MultiSelect2,null,statusListAll,'name',null,requestStatusListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'simcard', [], MultiSelect2,null,simcardListAll,'number',null,requestSimcardListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'vehicle', [], MultiSelect2,null,vehicleListAll,'plate',null,requestVehicleListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'company', [], MultiSelect2,null,companyListAll,'name',null,requestCompanyListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'device_location', [], MultiSelect2,null,deviceLocationListAll,'name',null,requestDeviceLocationListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'configuration', [], MultiSelect2,null,configurationListAll,'name',null,requestConfigurationListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'project', [], MultiSelect2,null,projectListAll,'name',null,requestProjectListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'project', [], MultiSelect2,null,regionListAll,'name',null,requestRegionListAll,null,null,"")}</th>
                        <th className="w-50">{createField(null, 'comment',[],Input,'Comment')} </th>
                        <th className="w-50">{createField(null, 'price_datetime',[],Input,'Price Datetime')} </th>
                        <th className="w-50">{createField(null, 'status_datetime',[],Input,'Status Datetime')} </th>
                        <th className="w-50">{createField(null, 'sell_count',[],Input,'Sell Count')} </th>
                    
                    </tr>
                </tbody>
                <tbody>
                    {deviceDetailList.map((item, key) => <DeviceDetailItem deviceDetailItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
            </div>
        </form>
    )
}

const DeviceDetailListReduxForm = reduxForm({form: 'DeviceDetailList'})(DeviceDetailListForm)

export default DeviceDetailDataGrid;