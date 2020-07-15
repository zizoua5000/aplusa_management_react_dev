import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelPriceList} from "../Common/Export/ExportExcelPrice";
import PriceItem from './PriceItem';
import {createField, Input,MultiSelect2,BooleanDropdown,MultiSelect1} from "../Common/FormsControls/FormsControls";

let PriceDataGrid = ({ priceList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,priceListAll,requestPriceListAll,
    deviceModelListAll,requestDeviceModelListAll,accessoryModelListAll,requestAccessoryModelListAll,projectListAll,requestProjectListAll,priceListAllExcel,
    priceTypeListAll,requestPriceTypeListAll }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    return (
        <div >
            <div>
                <PriceListReduxForm onSubmit={onSubmit} priceList={priceList} deleteItem={deleteItem} itemCount={itemCount} onSorting={onSorting} sortData={sortData}
                    priceListAll={priceListAll} requestPriceListAll={requestPriceListAll} deviceModelListAll={deviceModelListAll} requestDeviceModelListAll={requestDeviceModelListAll}
                    accessoryModelListAll={accessoryModelListAll} requestAccessoryModelListAll={requestAccessoryModelListAll} projectListAll={projectListAll} requestProjectListAll={requestProjectListAll}
                    priceTypeListAll={priceTypeListAll} requestPriceTypeListAll={requestPriceTypeListAll} priceListAllExcel={priceListAllExcel}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const PriceListForm= ({handleSubmit, error, initialValues,priceList,deleteItem,itemCount,onSorting,sortData,priceListAll,
    requestDeviceModelListAll,accessoryModelListAll,requestAccessoryModelListAll,projectListAll,requestProjectListAll,
    priceTypeListAll,requestPriceTypeListAll,requestPriceListAll,deviceModelListAll,priceListAllExcel}) => {
    console.log("pricelistallExcell ", priceListAllExcel)
        return (        
        <form >   
            <div className="table-responsive">
            <table className="table table-default table-bordered text-nowrap">
                <thead className="bg-secondary text-light">
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th className="w-50" >
                            Start Datetime
                            <span onClick={(e) => {
                                 onSorting({start_datetime:!sortData.start_datetime});
                             }}><i className={sortData.start_datetime? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            End Datetime
                            <span onClick={(e) => {
                                 onSorting({end_datetime:!sortData.end_datetime});
                             }}><i className={sortData.end_datetime? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Price Type
                            <span onClick={(e) => {
                                 onSorting({price_type:!sortData.price_type});
                             }}><i className={sortData.price_type? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Sell Price
                            <span onClick={(e) => {
                                 onSorting({sell_price:!sortData.sell_price});
                             }}><i className={sortData.sell_price? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Project
                            <span onClick={(e) => {
                                 onSorting({project:!sortData.project});
                             }}><i className={sortData.project? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
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
                            Accessory Model
                            <span onClick={(e) => {
                                 onSorting({accessory_model:!sortData.accessory_model});
                             }}><i className={sortData.accessory_model? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>                      
                        <th className="w-50" >
                            Second Hand
                            <span onClick={(e) => {
                                 onSorting({is_second_hand:!sortData.is_second_hand});
                             }}><i className={sortData.is_second_hand? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><ExportExcelPriceList csvData={priceListAllExcel} fileName="Price" requestLoadData={requestPriceListAll} /></th>
                        <th><button className="btn btn-info" onClick={handleSubmit}>Filter</button></th>
                        <th className="w-50">{createField(null, 'start_datetime',[], MultiSelect2,null,priceListAll,'start_datetime',null,requestPriceListAll,null,'start_datetime',true,"")}</th>
                        <th className="w-50">{createField(null, 'end_datetime',[], MultiSelect2,null,priceListAll,'end_datetime',null,requestPriceListAll,null,'end_datetime',true,"")}</th>
                        <th className="w-100">{createField(null, 'price_type', [], MultiSelect2,null,priceTypeListAll,'name',null,requestPriceTypeListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'sell_price', [], MultiSelect2,null,priceListAll,'sell_price',null,requestPriceListAll,null,'sell_price',"")}</th>
                        <th className="w-100">{createField(null, 'project', [], MultiSelect2,null,projectListAll,'name',null,requestProjectListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'device_model', [], MultiSelect2,null,deviceModelListAll,'name',null,requestDeviceModelListAll,null,null,"")}</th>  
                        <th className="w-100">{createField(null, 'accessory_model', [], MultiSelect2,null,accessoryModelListAll,'name',null,requestAccessoryModelListAll,null,null,"")}</th>                
                        <th className="w-100">{createField(null, 'is_second_hand', [], BooleanDropdown,null,null,null,null,null,null,"")}</th>
                    </tr>
                </tbody>
                <tbody>
                    {priceList.map((item, key) => <PriceItem priceItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
            </div>
        </form>
    )
}

const PriceListReduxForm = reduxForm({form: 'PriceList'})(PriceListForm)

export default PriceDataGrid;