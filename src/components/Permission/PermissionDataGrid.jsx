import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelPermissionList} from "../Common/Export/ExportExcelPermission";
import PermissionItem from './PermissionItem';
import {createField,MultiSelect2} from "../Common/FormsControls/FormsControls";


let PermissionDataGrid = ({ permissionList,  deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,permissionListAll,
    contentTypeList,requestPermissionListAll,requestContentTypeList}) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1

    return (
        <div >
            <div>
                <PermissionListReduxForm onSubmit={onSubmit} permissionList={permissionList} deleteItem={deleteItem} itemCount={itemCount}
                 onSorting={onSorting} sortData={sortData} permissionListAll={permissionListAll} contentTypeList={contentTypeList}
                 requestPermissionListAll={requestPermissionListAll} requestContentTypeList={requestContentTypeList}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const PermissionListForm= ({handleSubmit, error, initialValues,permissionList,deleteItem,itemCount,onSorting,sortData,permissionListAll,
    contentTypeList, requestPermissionListAll,requestContentTypeList}) => {
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
                            Code name
                            <span onClick={(e) => {
                                 onSorting({codename:!sortData.codename});
                             }}><i className={sortData.codename? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Content Type
                            <span onClick={(e) => {
                                 onSorting({content_type:!sortData.content_type});
                             }}><i className={sortData.content_type? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>     
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><ExportExcelPermissionList csvData={permissionListAll} fileName="Permission" loadDataFunction={requestPermissionListAll}/></th>
                        <th><button className="btn btn-info">Filter</button></th>
                        <th className="w-100">{createField(null, 'id', [], MultiSelect2,null,permissionListAll,'name',null,requestPermissionListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'codename', [], MultiSelect2,null,permissionListAll,'codename',null,requestPermissionListAll,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'content_type', [], MultiSelect2,null,contentTypeList,'app_label',null,requestContentTypeList,null,null,"")}</th>
                    </tr>
                </tbody>
                <tbody>
                    {permissionList.map((item, key) => <PermissionItem permissionItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const PermissionListReduxForm = reduxForm({form: 'PermissionList'})(PermissionListForm)



export default PermissionDataGrid;