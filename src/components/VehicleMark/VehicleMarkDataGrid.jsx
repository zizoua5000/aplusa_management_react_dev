import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelVehicleMarkList} from "../Common/Export/ExportExcelVehicleMark";
import VehicleMarkItem from './VehicleMarkItem';
import {createField, Input} from "../Common/FormsControls/FormsControls";

let VehicleMarkDataGrid = ({ vehicleMarkList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,vehicleMarkListAll,vehicleMarkListFunction }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    console.log(vehicleMarkListFunction)
    return (
        <div >
            <div>
                <VehicleMarkListReduxForm onSubmit={onSubmit} vehicleMarkList={vehicleMarkList} deleteItem={deleteItem} 
                    itemCount={itemCount} onSorting={onSorting} sortData={sortData} vehicleMarkListAll={vehicleMarkListAll} vehicleMarkListFunction={vehicleMarkListFunction}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const VehicleMarkListForm= ({handleSubmit, error, initialValues,vehicleMarkList,deleteItem,itemCount,onSorting,sortData,vehicleMarkListAll,vehicleMarkListFunction}) => {
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><ExportExcelVehicleMarkList csvData={vehicleMarkListAll} fileName="Vehicle Mark" loadDataFunction={vehicleMarkListFunction} /></th>
                        <th><button className="btn btn-info">Filter</button></th>
                        <th className="w-50">{createField(null, 'name',[],Input,'Name')}    </th>
                    </tr>
                </tbody>
                <tbody>
                    {vehicleMarkList.map((item, key) => <VehicleMarkItem vehicleMarkItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const VehicleMarkListReduxForm = reduxForm({form: 'VehicleMarkList'})(VehicleMarkListForm)

export default VehicleMarkDataGrid;