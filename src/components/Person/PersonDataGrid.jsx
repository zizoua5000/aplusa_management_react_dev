import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelPersonList} from "../Common/Export/ExportExcelPerson";
import PersonItem from './PersonItem';
import {createField,MultiSelect2} from "../Common/FormsControls/FormsControls";


let PersonDataGrid = ({ personList,  deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,
    personListAll,companyList,departmentList,jobTitleList,userList,
    requestPersonListAll,requestCompanyList,requestDepartmentList,requestJobTitleList,requestUserList}) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1

    return (
        <div >
            <div>
                <PersonListReduxForm onSubmit={onSubmit} personList={personList} deleteItem={deleteItem} itemCount={itemCount}
                 onSorting={onSorting} sortData={sortData} personListAll={personListAll} companyList={companyList} 
                 departmentList={departmentList} jobTitleList={jobTitleList} userList={userList}
                 requestPersonListAll={requestPersonListAll} requestCompanyList={requestCompanyList} 
                 requestDepartmentList={requestDepartmentList} requestJobTitleList={requestJobTitleList} 
                 requestUserList={requestUserList}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const PersonListForm= ({handleSubmit, error, initialValues,personList,deleteItem,itemCount,onSorting,
    sortData,personListAll,companyList, departmentList, jobTitleList, userList, 
    requestPersonListAll,requestCompanyList,requestDepartmentList,requestJobTitleList,requestUserList}) => {
    return (        
        <form onSubmit={handleSubmit}>   
            <table className="table table-default table-bordered text-nowrap">
                <thead className="bg-secondary text-light">
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th className="w-50" >
                            Firstname
                            <span onClick={(e) => {
                                 onSorting({first_name:!sortData.first_name});
                             }}><i className={sortData.first_name? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Lastname
                            <span onClick={(e) => {
                                 onSorting({last_name:!sortData.last_name});
                             }}><i className={sortData.last_name? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Phone
                            <span onClick={(e) => {
                                 onSorting({phone:!sortData.phone});
                             }}><i className={sortData.phone? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Email
                            <span onClick={(e) => {
                                 onSorting({email:!sortData.email});
                             }}><i className={sortData.email? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Company
                            <span onClick={(e) => {
                                 onSorting({company:!sortData.company});
                             }}><i className={sortData.company? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Department
                            <span onClick={(e) => {
                                 onSorting({department:!sortData.department});
                             }}><i className={sortData.department? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Job title
                            <span onClick={(e) => {
                                 onSorting({job_title:!sortData.job_title});
                             }}><i className={sortData.job_title? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            User
                            <span onClick={(e) => {
                                 onSorting({user:!sortData.user});
                             }}><i className={sortData.user? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>     
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><ExportExcelPersonList csvData={personListAll} fileName="Person" loadDataFunction={requestPersonListAll}/></th>
                        <th><button className="btn btn-info">Filter</button></th>
                        <th className="w-100">{createField(null, 'id', [], MultiSelect2,null,personListAll,'first_name',null,requestPersonListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'id', [], MultiSelect2,null,personListAll,'last_name',null,requestPersonListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'id', [], MultiSelect2,null,personListAll,'phone',null,requestPersonListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'id', [], MultiSelect2,null,personListAll,'email',null,requestPersonListAll,null,null,"")}</th>    
                        <th className="w-100">{createField(null, 'company', [], MultiSelect2,null,companyList,'name',null,requestCompanyList,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'department', [], MultiSelect2,null,departmentList,'name',null,requestDepartmentList,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'job_title', [], MultiSelect2,null,jobTitleList,'name',null,requestJobTitleList,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'user', [], MultiSelect2,null,userList,'username',null,requestUserList,null,null,"")}</th>
                    </tr>
                </tbody>
                <tbody>
                    {personList.map((item, key) => <PersonItem personItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const PersonListReduxForm = reduxForm({form: 'PersonList'})(PersonListForm)



export default PersonDataGrid;