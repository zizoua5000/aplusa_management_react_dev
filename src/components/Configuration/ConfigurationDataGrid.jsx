import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelConfigurationList} from "../Common/Export/ExportExcelConfiguration";
import ConfigurationItem from './ConfigurationItem';
import {createField, Input} from "../Common/FormsControls/FormsControls";

let ConfigurationDataGrid = ({ configurationList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,configurationListAll,configurationFunction }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    return (
        <div >
            <div>
                <ConfigurationListReduxForm onSubmit={onSubmit} configurationList={configurationList} deleteItem={deleteItem} 
                    itemCount={itemCount} onSorting={onSorting} sortData={sortData} configurationListAll={configurationListAll} configurationFunction={configurationFunction}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const ConfigurationListForm= ({handleSubmit, error, initialValues,configurationList,deleteItem,itemCount,onSorting,sortData,configurationListAll,configurationFunction}) => {
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
                        <th><ExportExcelConfigurationList csvData={configurationListAll} fileName="Configuration" loadDataFunction={configurationFunction} /></th>
                        <th><button className="btn btn-info" onClick={handleSubmit}>Filter</button></th>
                        <th className="w-50">{createField(null, 'name',[],Input,'Name')}    </th>
                    </tr>
                </tbody>
                <tbody>
                    {configurationList.map((item, key) => <ConfigurationItem configurationItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const ConfigurationListReduxForm = reduxForm({form: 'ConfigurationList'})(ConfigurationListForm)

export default ConfigurationDataGrid;