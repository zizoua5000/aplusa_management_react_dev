import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelCompanyList} from "../Common/Export/ExportExcelCompany";
import CompanyItem from './CompanyItem';
import {createField,MultiSelect2} from "../Common/FormsControls/FormsControls";


let CompanyDataGrid = ({ companyList,  deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,companyListAll,
    companyTypeList,requestCompanyListAll,requestCompanyTypeList}) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1

    return (
        <div >
            <div>
                <CompanyListReduxForm onSubmit={onSubmit} companyList={companyList} deleteItem={deleteItem} itemCount={itemCount}
                 onSorting={onSorting} sortData={sortData} companyListAll={companyListAll} companyTypeList={companyTypeList}
                 requestCompanyListAll={requestCompanyListAll} requestCompanyTypeList={requestCompanyTypeList}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const CompanyListForm= ({handleSubmit, error, initialValues,companyList,deleteItem,itemCount,onSorting,sortData,companyListAll,
    companyTypeList, requestCompanyListAll,requestCompanyTypeList}) => {
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
                        <th className="w-50" >
                            Main Company
                            <span onClick={(e) => {
                                 onSorting({main_company:!sortData.main_company});
                             }}><i className={sortData.main_company? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Company Type
                            <span onClick={(e) => {
                                 onSorting({company_type:!sortData.company_type});
                             }}><i className={sortData.company_type? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>     
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><ExportExcelCompanyList csvData={companyListAll} fileName="Company" loadDataFunction={requestCompanyListAll}/></th>
                        <th><button className="btn btn-info">Filter</button></th>
                        <th className="w-100">{createField(null, 'id', [], MultiSelect2,null,companyListAll,'name',null,requestCompanyListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'main_company', [], MultiSelect2,null,companyListAll,'name',null,requestCompanyListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'company_type', [], MultiSelect2,null,companyTypeList,'name',null,requestCompanyTypeList,null,null,"")}</th>
                    </tr>
                </tbody>
                <tbody>
                    {companyList.map((item, key) => <CompanyItem companyItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const CompanyListReduxForm = reduxForm({form: 'CompanyList'})(CompanyListForm)



export default CompanyDataGrid;