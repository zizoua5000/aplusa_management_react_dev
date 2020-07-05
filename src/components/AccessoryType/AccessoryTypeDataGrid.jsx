import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelAccessoryTypeList} from "../Common/Export/ExportExcelAccessoryType";
import AccessoryTypeItem from './AccessoryTypeItem';
import {createField, Input} from "../Common/FormsControls/FormsControls";

let AccessoryTypeDataGrid = ({ accessoryTypeList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,accessoryTypeListAll,requestAccessoryTypeAll }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    return (
        <div >
            <div>
                <AccessoryTypeListReduxForm onSubmit={onSubmit} accessoryTypeList={accessoryTypeList} deleteItem={deleteItem} 
                    itemCount={itemCount} onSorting={onSorting} sortData={sortData} accessoryTypeListAll={accessoryTypeListAll} requestAccessoryTypeAll={requestAccessoryTypeAll}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const AccessoryTypeListForm= ({handleSubmit, error, initialValues,accessoryTypeList,deleteItem,itemCount,onSorting,sortData,accessoryTypeListAll,requestAccessoryTypeAll}) => {
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
                        <th><ExportExcelAccessoryTypeList csvData={accessoryTypeListAll} fileName="Accessory Type" requestLoadData={requestAccessoryTypeAll} /></th>
                        <th><button className="btn btn-info" onClick={handleSubmit}>Filter</button></th>
                        <th className="w-50">{createField(null, 'name',[],Input,'Name')}    </th>
                    </tr>
                </tbody>
                <tbody>
                    {accessoryTypeList.map((item, key) => <AccessoryTypeItem accessoryTypeItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const AccessoryTypeListReduxForm = reduxForm({form: 'AccessoryTypeList'})(AccessoryTypeListForm)

export default AccessoryTypeDataGrid;