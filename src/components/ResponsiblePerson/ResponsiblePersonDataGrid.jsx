import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelResponsiblePersonList} from "../Common/Export/ExportExcelResponsiblePerson";
import ResponsiblePersonItem from './ResponsiblePersonItem';
import {createField,MultiSelect2,BooleanDropdown } from "../Common/FormsControls/FormsControls";

let ResponsiblePersonDataGrid = ({ responsiblePersonList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,responsiblePersonListAll,
    requestResponsiblePersonAll,departmentListAll,requestDepartmentListAll,personListAll,requestPersonListAll}) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    return (
        <div >
            <div>
                <ResponsiblePersonListReduxForm onSubmit={onSubmit} responsiblePersonList={responsiblePersonList} deleteItem={deleteItem} 
                    itemCount={itemCount} onSorting={onSorting} sortData={sortData} responsiblePersonListAll={responsiblePersonListAll} requestResponsiblePersonAll={requestResponsiblePersonAll}
                    departmentListAll={departmentListAll} requestDepartmentListAll={requestDepartmentListAll} personListAll={personListAll} requestPersonListAll={requestPersonListAll}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const ResponsiblePersonListForm= ({handleSubmit, error, initialValues,responsiblePersonList,deleteItem,itemCount,onSorting,sortData,responsiblePersonListAll,requestResponsiblePersonAll,
    departmentListAll,requestDepartmentListAll,personListAll,requestPersonListAll}) => {
    return (
        
        <form >   
            <div className="table-responsive">
            <table className="table table-default table-bordered text-nowrap">
                <thead className="bg-secondary text-light">
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th className="w-50" >
                            Department
                            <span onClick={(e) => {
                                 onSorting({department:!sortData.department});
                             }}><i className={sortData.department? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Department chief
                            <span onClick={(e) => {
                                 onSorting({department_chief:!sortData.department_chief});
                             }}><i className={sortData.department_chief? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Chief Substitute
                            <span onClick={(e) => {
                                 onSorting({chief_substitute:!sortData.chief_substitute});
                             }}><i className={sortData.chief_substitute? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Accounter
                            <span onClick={(e) => {
                                 onSorting({accounter:!sortData.accounter});
                             }}><i className={sortData.accounter? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Recipient
                            <span onClick={(e) => {
                                 onSorting({recipient:!sortData.recipient});
                             }}><i className={sortData.recipient? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Provider
                            <span onClick={(e) => {
                                 onSorting({provider:!sortData.provider});
                             }}><i className={sortData.provider? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>                                                
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><ExportExcelResponsiblePersonList csvData={responsiblePersonListAll} fileName="Responsible Person" requestLoadData={requestResponsiblePersonAll} /></th>
                        <th><button className="btn btn-info" onClick={handleSubmit}>Filter</button></th>
                        <th className="w-50">{createField(null, 'department',[], MultiSelect2,null,departmentListAll,'name',null,requestDepartmentListAll,null,null,null,"")}</th>
                        <th className="w-50">{createField(null, 'department_chief',[], MultiSelect2,null,personListAll,'full_name',null,requestPersonListAll,null,null,null,"")}</th>
                        <th className="w-50">{createField(null, 'chief_substitute',[], MultiSelect2,null,personListAll,'full_name',null,requestPersonListAll,null,null,null,"")}</th>
                        <th className="w-50">{createField(null, 'accounter',[], MultiSelect2,null,personListAll,'full_name',null,requestPersonListAll,null,null,null,"")}</th>
                        <th className="w-50">{createField(null, 'recipient',[], MultiSelect2,null,personListAll,'full_name',null,requestPersonListAll,null,null,null,"")}</th>
                        <th className="w-50">{createField(null, 'provider',[], MultiSelect2,null,personListAll,'full_name',null,requestPersonListAll,null,null,null,"")}</th>
                    </tr>
                </tbody>
                <tbody>
                    {responsiblePersonList.map((item, key) => <ResponsiblePersonItem responsiblePersonItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
            </div>
        </form>
    )
}

const ResponsiblePersonListReduxForm = reduxForm({form: 'ResponsiblePersonList'})(ResponsiblePersonListForm)

export default ResponsiblePersonDataGrid;