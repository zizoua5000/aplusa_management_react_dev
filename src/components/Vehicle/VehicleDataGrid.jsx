import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelVehicleList} from "../Common/Export/ExportExcelVehicle";
import VehicleItem from './VehicleItem';
import {createField, Input,MultiSelect2} from "../Common/FormsControls/FormsControls";


let VehicleDataGrid = ({ vehicleList,  deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,vehicleListAll,vehicleModelListAll,
    vehicleTypeListAll,vehicleListFunction,vehicleModelFunction,vehicleTypeFunction,vehicleMarkFunction,vehicleMarkListAll}) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1

    return (
        <div >
            <div>
                <VehicleListReduxForm onSubmit={onSubmit} vehicleList={vehicleList} deleteItem={deleteItem} itemCount={itemCount} vehicleMarkFunction={vehicleMarkFunction}
                 onSorting={onSorting} sortData={sortData} vehicleListAll={vehicleListAll} vehicleTypeListAll={vehicleTypeListAll} vehicleModelListAll={vehicleModelListAll} 
                 vehicleModelFunction={vehicleModelFunction} vehicleListFunction={vehicleListFunction} vehicleTypeFunction={vehicleTypeFunction} vehicleMarkListAll={vehicleMarkListAll}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const VehicleListForm= ({handleSubmit, error, initialValues,vehicleList,deleteItem,itemCount,onSorting,sortData,vehicleListAll,
    vehicleTypeListAll,vehicleModelListAll,vehicleMarkListAll, vehicleListFunction,vehicleTypeFunction,vehicleModelFunction,vehicleMarkFunction}) => {
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
                        <th><ExportExcelVehicleList csvData={vehicleListAll} fileName="Vehicle" test={vehicleListFunction}/></th>
                        <th><button className="btn btn-info">Filter</button></th>
                        <th className="w-100">{createField(null, 'plate', [], MultiSelect2,null,vehicleListAll,'plate',null,vehicleListFunction,null,"")}</th>
                        <th className="w-100">{createField(null, 'serie_number', [], MultiSelect2,null,vehicleListAll,'serie_number',null,vehicleListFunction,null,"")}</th>
                        <th className="w-100">{createField(null, 'vehicle_model', [], MultiSelect2,null,vehicleModelListAll,'name',null,vehicleModelFunction,null,"")}</th>  
                        <th className="w-100">{createField(null, 'vehicle_mark', [], MultiSelect2,null,vehicleMarkListAll,'name',null,vehicleMarkFunction,null,"")}</th>     
                        <th className="w-100">{createField(null, 'vehicle_type', [], MultiSelect2,null,vehicleTypeListAll,'name',null,vehicleTypeFunction,null,"")}</th>
                        <th className="w-100">{createField(null, 'comment', [], Input,'Comment')}</th>                    
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