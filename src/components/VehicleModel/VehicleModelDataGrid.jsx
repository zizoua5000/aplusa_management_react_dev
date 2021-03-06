import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelVehicleModelList} from "../Common/Export/ExportExcelVehicleModel";
import VehicleModelItem from './VehicleModelItem';
import {createField, Input,MultiSelect2} from "../Common/FormsControls/FormsControls";

let VehicleModelDataGrid = ({ vehicleModelList, vehicleMarkListAll, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,vehicleModelListAll,requestVehicleModelAll,requestVehicleMarkAll }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    console.log("Current PAGE ",currentPage)

    return (
        <div >
            <div>
                <VehicleModelListReduxForm onSubmit={onSubmit} vehicleModelList={vehicleModelList} deleteItem={deleteItem} itemCount={itemCount} 
                vehicleMarkListAll={vehicleMarkListAll} onSorting={onSorting} sortData={sortData} vehicleModelListAll={vehicleModelListAll} requestVehicleModelAll={requestVehicleModelAll} requestVehicleMarkAll={requestVehicleMarkAll} />
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const VehicleModelListForm= ({handleSubmit, error, vehicleMarkListAll, initialValues,vehicleModelList,deleteItem,itemCount,onSorting,sortData,vehicleModelListAll,requestVehicleModelAll,requestVehicleMarkAll}) => {
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
                        <th className="w-100">
                            Vehicle Mark
                            <span onClick={(e) => {
                                 onSorting({vehicle_mark:!sortData.vehicle_mark});
                             }}><i className={sortData.vehicle_mark? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><ExportExcelVehicleModelList csvData={vehicleModelListAll} fileName="Vehicle Model" requestLoadData={requestVehicleModelAll}/></th>
                        <th><button className="btn btn-info">Filter</button></th>
                        <th className="w-50">{createField(null, 'name',[],Input,'Name')} </th>
                        <th className="w-100">{createField(null, 'vehicle_mark', [], MultiSelect2,null,vehicleMarkListAll,'name',null,requestVehicleMarkAll,null,null,"")}</th>
                    </tr>
                </tbody>
                <tbody>
                    {vehicleModelList.map((item, key) => <VehicleModelItem vehicleModelItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const VehicleModelListReduxForm = reduxForm({form: 'VehicleModelList'})(VehicleModelListForm)

export default VehicleModelDataGrid;