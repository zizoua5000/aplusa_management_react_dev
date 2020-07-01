import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelJobTitleList} from "../Common/Export/ExportExcelJobTitle";
import JobTitleItem from './JobTitleItem';
import {createField, Input} from "../Common/FormsControls/FormsControls";

let JobTitleDataGrid = ({ jobTitleList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,jobTitleListAll,jobTitleFunction }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    return (
        <div >
            <div>
                <JobTitleListReduxForm onSubmit={onSubmit} jobTitleList={jobTitleList} deleteItem={deleteItem} 
                    itemCount={itemCount} onSorting={onSorting} sortData={sortData} jobTitleListAll={jobTitleListAll} jobTitleFunction={jobTitleFunction}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const JobTitleListForm= ({handleSubmit, error, initialValues,jobTitleList,deleteItem,itemCount,onSorting,sortData,jobTitleListAll,jobTitleFunction}) => {
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
                        <th><ExportExcelJobTitleList csvData={jobTitleListAll} fileName="Vehicle Type" loadDataFunction={jobTitleFunction} /></th>
                        <th><button className="btn btn-info" onClick={handleSubmit}>Filter</button></th>
                        <th className="w-50">{createField(null, 'name',[],Input,'Name')}    </th>
                    </tr>
                </tbody>
                <tbody>
                    {jobTitleList.map((item, key) => <JobTitleItem jobTitleItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const JobTitleListReduxForm = reduxForm({form: 'JobTitleList'})(JobTitleListForm)

export default JobTitleDataGrid;