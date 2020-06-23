import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelVehicleTypeList} from "../Common/Export/ExportExcelVehicleType";
import VehicleTypeItem from './VehicleTypeItem';
import {createField, Input} from "../Common/FormsControls/FormsControls";

let VehicleTypeDataGrid = ({ vehicleTypeList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,vehicleTypeListAll,vehicleTypeFunction }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    return (
        <div >
            <div>
                <VehicleTypeListReduxForm onSubmit={onSubmit} vehicleTypeList={vehicleTypeList} deleteItem={deleteItem} 
                    itemCount={itemCount} onSorting={onSorting} sortData={sortData} vehicleTypeListAll={vehicleTypeListAll} vehicleTypeFunction={vehicleTypeFunction}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const VehicleTypeListForm= ({handleSubmit, error, initialValues,vehicleTypeList,deleteItem,itemCount,onSorting,sortData,vehicleTypeListAll,vehicleTypeFunction}) => {
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
                        <th><ExportExcelVehicleTypeList csvData={vehicleTypeListAll} fileName="Vehicle Type" loadDataFunction={vehicleTypeFunction} /></th>
                        <th><button className="btn btn-info" onClick={handleSubmit}>Filter</button></th>
                        <th className="w-50">{createField(null, 'name',[],Input,'Name')}    </th>
                    </tr>
                </tbody>
                <tbody>
                    {vehicleTypeList.map((item, key) => <VehicleTypeItem vehicleTypeItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const VehicleTypeListReduxForm = reduxForm({form: 'VehicleTypeList'})(VehicleTypeListForm)

export default VehicleTypeDataGrid;