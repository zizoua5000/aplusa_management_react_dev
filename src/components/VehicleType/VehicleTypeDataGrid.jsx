import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelVehicleTypeList} from "../Common/Export/ExportExcelVehicleType";
import VehicleTypeItem from './VehicleTypeItem';
import {createField, Input} from "../Common/FormsControls/FormsControls";

let VehicleTypeDataGrid = ({ vehicleTypeList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    return (
        <div >
            <div>
                <VehicleTypeListReduxForm onSubmit={onSubmit} vehicleTypeList={vehicleTypeList} deleteItem={deleteItem} itemCount={itemCount} onSorting={onSorting} sortData={sortData}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const VehicleTypeListForm= ({handleSubmit, error, initialValues,vehicleTypeList,deleteItem,itemCount,onSorting,sortData}) => {
    console.log(sortData)
    return (
        
        <form onSubmit={handleSubmit}>   
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
                        {/* <th className="w-100">
                            Vehicle Mark
                            <span onClick={(e) => {
                                 onSorting({vehicle_mark:!sortData.vehicle_mark});
                             }}><i className={sortData.vehicle_mark? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th> */}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><ExportExcelVehicleTypeList csvData={vehicleTypeList} fileName="Vehicle Type" /></th>
                        <th><button className="btn btn-info">Filter</button></th>
                        <th className="w-50">{createField(null, 'name',[],Input,'Name')}    </th>
                        {/* <th className="w-100">{createField(null, 'vehicle_mark', [], MultiSelect2,null,vehicleMarkList,null,null,null,"")}</th> */}
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