import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelVehicleList} from "../Common/Export/ExportExcelVehicle";
import VehicleItem from './VehicleItem';
import {createField, Input,MultiSelect2} from "../Common/FormsControls/FormsControls";

let VehicleDataGrid = ({ vehicleList, vehicleModelList, vehicleTypeList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,vehicleListAll }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    console.log(vehicleListAll)
    return (
        <div >
            <div>
                <VehicleListReduxForm onSubmit={onSubmit} vehicleList={vehicleList} deleteItem={deleteItem} itemCount={itemCount} 
                vehicleModelList={vehicleModelList} vehicleTypeList={vehicleTypeList} onSorting={onSorting} sortData={sortData} vehicleListAll={vehicleListAll}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const VehicleListForm= ({handleSubmit, error, vehicleModelList,vehicleTypeList, initialValues,vehicleList,deleteItem,itemCount,onSorting,sortData,vehicleListAll}) => {
    console.log(vehicleListAll)
    return (
        
        <form onSubmit={handleSubmit}>   
            <table className="table table-default table-bordered text-nowrap">
                <thead className="bg-secondary text-light">
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th className="w-50" >
                            Plate
                            <span onClick={(e) => {
                                 onSorting({plate:!sortData.plate});
                             }}><i className={sortData.name? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-100">
                            Serie Number
                            <span onClick={(e) => {
                                 onSorting({serie_number:!sortData.serie_number});
                             }}><i className={sortData.serie_number? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Vehicle Model
                            <span onClick={(e) => {
                                 onSorting({vehicle_model:!sortData.vehicle_model});
                             }}><i className={sortData.vehicle_model? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Vehicle Mark
                            <span onClick={(e) => {
                                 onSorting({vehicle_mark:!sortData.vehicle_mark});
                             }}><i className={sortData.vehicle_mark? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Vehicle Type
                            <span onClick={(e) => {
                                 onSorting({vehicle_type:!sortData.vehicle_type});
                             }}><i className={sortData.vehicle_type? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Comment
                            <span onClick={(e) => {
                                 onSorting({comment:!sortData.comment});
                             }}><i className={sortData.comment? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><ExportExcelVehicleList csvData={vehicleListAll} fileName="Vehicle" /></th>
                        <th><button className="btn btn-info">Filter</button></th>
                        {/* <th className="w-50">{createField(null, 'name',[],Input,'Name')}    </th> */}
                        <th className="w-100">{createField(null, 'plate', [], MultiSelect2,null,vehicleListAll,'plate',null,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'serie_number', [], MultiSelect2,null,vehicleListAll,'serie_number',null,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'vehicle_model', [], MultiSelect2,null,vehicleModelList,'name',null,null,null,"")}</th>  
                        <th className="w-100">{createField(null, 'vehicle_mark', [], MultiSelect2,null,vehicleModelList,'vehicle_mark',null,null,null,"")}</th>     
                        <th className="w-100">{createField(null, 'vehicle_type', [], MultiSelect2,null,vehicleTypeList,'name',null,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'comment', [], MultiSelect2,null,vehicleListAll,'comment',null,null,null,"")}</th>                    
                    </tr>
                </tbody>
                <tbody>
                    {vehicleList.map((item, key) => <VehicleItem vehicleItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const VehicleListReduxForm = reduxForm({form: 'VehicleList'})(VehicleListForm)

export default VehicleDataGrid;