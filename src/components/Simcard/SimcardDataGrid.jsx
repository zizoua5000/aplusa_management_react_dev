import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelSimcardList} from "../Common/Export/ExportExcelSimcard";
import SimcardItem from './SimcardItem';
import {createField, Input,MultiSelect2, BooleanDropdown} from "../Common/FormsControls/FormsControls";

let SimcardDataGrid = ({ simcardList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,simcardListAll }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    console.log(simcardList)
    return (
        <div >
            <div>
                <SimcardListReduxForm onSubmit={onSubmit} simcardList={simcardList} deleteItem={deleteItem} 
                    itemCount={itemCount} onSorting={onSorting} sortData={sortData} simcardListAll={simcardListAll}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const SimcardListForm= ({handleSubmit, error, initialValues,simcardList,deleteItem,itemCount,onSorting,sortData,simcardListAll}) => {
    console.log(simcardListAll)
    return (
        
        <form onSubmit={handleSubmit}>   
            <table className="table table-default table-bordered text-nowrap">
                <thead className="bg-secondary text-light">
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th className="w-50" >
                            Simcard
                            <span onClick={(e) => {
                                 onSorting({number:!sortData.number});
                             }}><i className={sortData.number? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Package
                            <span onClick={(e) => {
                                 onSorting({package:!sortData.package});
                             }}><i className={sortData.package? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Rouming
                            <span onClick={(e) => {
                                 onSorting({is_active:!sortData.is_active});
                             }}><i className={sortData.is_active? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Active
                            <span onClick={(e) => {
                                 onSorting({has_roumnig:!sortData.has_roumnig});
                             }}><i className={sortData.has_roumnig? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><ExportExcelSimcardList csvData={simcardListAll} fileName="Simcard" /></th>
                        <th><button className="btn btn-info">Filter</button></th>
                        {/* <th className="w-50">{createField(null, 'name',[],Input,'Name')}    </th> */}
                        <th className="w-100">{createField(null, 'number', [], MultiSelect2,null,simcardListAll,'number',null,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'package', [], MultiSelect2,null,simcardListAll,'package',null,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'has_roumnig', [], BooleanDropdown,null,null,null,null,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'is_active', [], BooleanDropdown,null,null,null,null,null,null,"")}</th>
                    </tr>
                </tbody>
                <tbody>
                    {simcardList.map((item, key) => <SimcardItem simcardItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const SimcardListReduxForm = reduxForm({form: 'SimcardList'})(SimcardListForm)

export default SimcardDataGrid;