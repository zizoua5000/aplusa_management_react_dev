import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelDepartmentList} from "../Common/Export/ExportExcelDepartment";
import DepartmentItem from './DepartmentItem';
import {createField, Input} from "../Common/FormsControls/FormsControls";

let DepartmentDataGrid = ({ departmentList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,departmentListAll,departmentFunction }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    return (
        <div >
            <div>
                <DepartmentListReduxForm onSubmit={onSubmit} departmentList={departmentList} deleteItem={deleteItem} 
                    itemCount={itemCount} onSorting={onSorting} sortData={sortData} departmentListAll={departmentListAll} departmentFunction={departmentFunction}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const DepartmentListForm= ({handleSubmit, error, initialValues,departmentList,deleteItem,itemCount,onSorting,sortData,departmentListAll,departmentFunction}) => {
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
                        <th><ExportExcelDepartmentList csvData={departmentListAll} fileName="Department" loadDataFunction={departmentFunction} /></th>
                        <th><button className="btn btn-info" onClick={handleSubmit}>Filter</button></th>
                        <th className="w-50">{createField(null, 'name',[],Input,'Name')}    </th>
                    </tr>
                </tbody>
                <tbody>
                    {departmentList.map((item, key) => <DepartmentItem departmentItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const DepartmentListReduxForm = reduxForm({form: 'DepartmentList'})(DepartmentListForm)

export default DepartmentDataGrid;