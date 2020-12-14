import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelAccessoryList} from "../Common/Export/ExportExcelAccessory";
import AccessoryItem from './AccessoryItem';
import {createField, BooleanDropdown,MultiSelect2, Input} from "../Common/FormsControls/FormsControls";


let AccessoryDataGrid = ({ accessoryList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,accessoryListAll,accessoryModelListAll,
    accessoryTypeListAll,requestAccessoryListAll,requestAccessoryModelAll,requestAccessoryTypeAll,accessoryMarkListAll,companyListAll,requestCompanyListAll}) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1

    return (
        <div >
            <div>
                <AccessoryListReduxForm onSubmit={onSubmit} accessoryList={accessoryList} deleteItem={deleteItem} itemCount={itemCount} companyListAll={companyListAll}
                 onSorting={onSorting} sortData={sortData} accessoryListAll={accessoryListAll} accessoryTypeListAll={accessoryTypeListAll} accessoryModelListAll={accessoryModelListAll} requestCompanyListAll={requestCompanyListAll}
                 requestAccessoryModelAll={requestAccessoryModelAll} requestAccessoryListAll={requestAccessoryListAll} requestAccessoryTypeAll={requestAccessoryTypeAll} />
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const AccessoryListForm= ({handleSubmit, error, initialValues,accessoryList,deleteItem,itemCount,onSorting,sortData,accessoryListAll,companyListAll,requestCompanyListAll,
     accessoryTypeListAll,accessoryModelListAll, requestAccessoryListAll,requestAccessoryTypeAll,requestAccessoryModelAll,requestAccessoryMarkAll}) => {
        console.log(accessoryList)
        return (        
        <form onSubmit={handleSubmit}>
            <div className="table-responsive"> 
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
                        <th className="w-50" >
                            Manufacturer
                            <span onClick={(e) => {
                                 onSorting({manufacturer:!sortData.manufacturer});
                             }}><i className={sortData.manufacturer? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Model
                            <span onClick={(e) => {
                                 onSorting({accessory_model:!sortData.accessory_model});
                             }}><i className={sortData.accessory_model? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Type
                            <span onClick={(e) => {
                                 onSorting({accessory_type:!sortData.accessory_type});
                             }}><i className={sortData.accessory_type? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Count
                            <span onClick={(e) => {
                                 onSorting({count:!sortData.count});
                             }}><i className={sortData.count? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Is_New
                            <span onClick={(e) => {
                                 onSorting({is_new:!sortData.is_new});
                             }}><i className={sortData.is_new? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Is_Our
                            <span onClick={(e) => {
                                 onSorting({is_our:!sortData.is_our});
                             }}><i className={sortData.is_our? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><ExportExcelAccessoryList csvData={accessoryListAll} fileName="Accessory" requestLoadData={requestAccessoryListAll} /></th>
                        <th><button className="btn btn-info">Filter</button></th>
                        <th className="w-100">{createField(null, 'name', [], MultiSelect2,null,accessoryListAll,'name',null,requestAccessoryListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'manufacturer', [], MultiSelect2,null,companyListAll,'name',null,requestCompanyListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'accessory_model', [], MultiSelect2,null,accessoryModelListAll,'name',null,requestAccessoryModelAll,null,null,"")}</th>       
                        <th className="w-100">{createField(null, 'accessory_type', [], MultiSelect2,null,accessoryTypeListAll,'name',null,requestAccessoryTypeAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'count', [], Input,null,null,null,null,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'is_new', [], BooleanDropdown,null,null,null,null,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'is_our', [], BooleanDropdown,null,null,null,null,null,null,"")}</th>
                        
                    </tr>
                </tbody>
                <tbody>
                    {accessoryList.map((item, key) => <AccessoryItem accessoryItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
            </div>
        </form>
    )
}

const AccessoryListReduxForm = reduxForm({form: 'AccessoryList'})(AccessoryListForm)



export default AccessoryDataGrid;