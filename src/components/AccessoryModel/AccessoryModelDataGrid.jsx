import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelAccessoryModelList} from "../Common/Export/ExportExcelAccessoryModel";
import AccessoryModelItem from './AccessoryModelItem';
import {createField, Input} from "../Common/FormsControls/FormsControls";

let AccessoryModelDataGrid = ({ accessoryModelList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,accessoryModelListAll,requestAccessoryModelAll }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    return (
        <div >
            <div>
                <AccessoryModelListReduxForm onSubmit={onSubmit} accessoryModelList={accessoryModelList} deleteItem={deleteItem} 
                    itemCount={itemCount} onSorting={onSorting} sortData={sortData} accessoryModelListAll={accessoryModelListAll} requestAccessoryModelAll={requestAccessoryModelAll}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const AccessoryModelListForm= ({handleSubmit, error, initialValues,accessoryModelList,deleteItem,itemCount,onSorting,sortData,accessoryModelListAll,requestAccessoryModelAll}) => {
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
                        <th><ExportExcelAccessoryModelList csvData={accessoryModelListAll} fileName="Accessory Model" requestLoadData={requestAccessoryModelAll} /></th>
                        <th><button className="btn btn-info" onClick={handleSubmit}>Filter</button></th>
                        <th className="w-50">{createField(null, 'name',[],Input,'Name')}    </th>
                    </tr>
                </tbody>
                <tbody>
                    {accessoryModelList.map((item, key) => <AccessoryModelItem accessoryModelItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const AccessoryModelListReduxForm = reduxForm({form: 'AccessoryModelList'})(AccessoryModelListForm)

export default AccessoryModelDataGrid;