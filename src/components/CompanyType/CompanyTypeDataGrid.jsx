import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelCompanyTypeList} from "../Common/Export/ExportExcelCompanyType";
import CompanyTypeItem from './CompanyTypeItem';
import {createField, Input} from "../Common/FormsControls/FormsControls";

let CompanyTypeDataGrid = ({ companyTypeList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,companyTypeListAll,companyTypeFunction }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    return (
        <div >
            <div>
                <CompanyTypeListReduxForm onSubmit={onSubmit} companyTypeList={companyTypeList} deleteItem={deleteItem} 
                    itemCount={itemCount} onSorting={onSorting} sortData={sortData} companyTypeListAll={companyTypeListAll} companyTypeFunction={companyTypeFunction}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const CompanyTypeListForm= ({handleSubmit, error, initialValues,companyTypeList,deleteItem,itemCount,onSorting,sortData,companyTypeListAll,companyTypeFunction}) => {
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
                        <th><ExportExcelCompanyTypeList csvData={companyTypeListAll} fileName="Company Type" loadDataFunction={companyTypeFunction} /></th>
                        <th><button className="btn btn-info" onClick={handleSubmit}>Filter</button></th>
                        <th className="w-50">{createField(null, 'name',[],Input,'Name')}    </th>
                    </tr>
                </tbody>
                <tbody>
                    {companyTypeList.map((item, key) => <CompanyTypeItem companyTypeItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const CompanyTypeListReduxForm = reduxForm({form: 'CompanyTypeList'})(CompanyTypeListForm)

export default CompanyTypeDataGrid;