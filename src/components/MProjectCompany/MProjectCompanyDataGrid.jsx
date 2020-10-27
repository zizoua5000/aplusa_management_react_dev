import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelMProjectCompanyList} from "../Common/Export/ExportExcelMProjectCompany";
import MProjectCompanyItem from './MProjectCompanyItem';
import {createField,MultiSelect2} from "../Common/FormsControls/FormsControls";


let MProjectCompanyDataGrid = ({ mProjectCompanyList,  deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,mProjectCompanyListAll,
    projectList,companyList,requestMProjectCompanyListAll,requestProjectList,requestCompanyList}) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    return (
        <div >
            <div>
                <MProjectCompanyListReduxForm onSubmit={onSubmit} mProjectCompanyList={mProjectCompanyList} deleteItem={deleteItem} itemCount={itemCount}
                 onSorting={onSorting} sortData={sortData} mProjectCompanyListAll={mProjectCompanyListAll} projectList={projectList} companyList={companyList}
                 requestMProjectCompanyListAll={requestMProjectCompanyListAll} requestProjectList={requestProjectList} requestCompanyList={requestCompanyList}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const MProjectCompanyListForm= ({handleSubmit, error, initialValues,mProjectCompanyList,deleteItem,itemCount,onSorting,sortData,mProjectCompanyListAll,
    projectList, companyList,requestMProjectCompanyListAll,requestProjectList,requestCompanyList}) => {
        return (        
        <form onSubmit={handleSubmit}>   
            <table className="table table-default table-bordered text-nowrap">
                <thead className="bg-secondary text-light">
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th className="w-50" >
                            Project
                            <span onClick={(e) => {
                                 onSorting({project:!sortData.project});
                             }}><i className={sortData.project? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Company
                            <span onClick={(e) => {
                                 onSorting({company:!sortData.company});
                             }}><i className={sortData.company? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>     
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><ExportExcelMProjectCompanyList csvData={mProjectCompanyListAll} fileName="MProjectCompany" loadDataFunction={requestMProjectCompanyListAll}/></th>
                        <th><button className="btn btn-info">Filter</button></th>
                        <th className="w-100">{createField(null, 'project', [], MultiSelect2,null,projectList,'name',null,requestProjectList,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'company', [], MultiSelect2,null,companyList,'name',null,requestCompanyList,null,null,"")}</th>
                    </tr>
                </tbody>
                <tbody>
                    {mProjectCompanyList.map((item, key) => <MProjectCompanyItem mProjectCompanyItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const MProjectCompanyListReduxForm = reduxForm({form: 'MProjectCompanyList'})(MProjectCompanyListForm)



export default MProjectCompanyDataGrid;