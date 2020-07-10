import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelUserPermissionList} from "../Common/Export/ExportExcelUserPermission";
import UserPermissionItem from './UserPermissionItem';
import {createField,MultiSelect2} from "../Common/FormsControls/FormsControls";


let UserPermissionDataGrid = ({ userPermissionList, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,userPermissionListAll,
    userList,permissionList,requestUserPermissionListAll,requestUserList,requestPermissionList}) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1

    return (
        <div >
            <div>
                <UserPermissionListReduxForm onSubmit={onSubmit} userPermissionList={userPermissionList} itemCount={itemCount}
                 onSorting={onSorting} sortData={sortData} userPermissionListAll={userPermissionListAll} userList={userList} permissionList={permissionList}
                 requestUserPermissionListAll={requestUserPermissionListAll} requestUserList={requestUserList} requestPermissionList={requestPermissionList}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const UserPermissionListForm= ({handleSubmit, error, initialValues,userPermissionList,itemCount,onSorting,sortData,userPermissionListAll,
    userList, requestUserPermissionListAll,requestUserList}) => {
    return (        
        <form onSubmit={handleSubmit}>
        <div className="table-responsive">
            <table className="table table-default table-bordered text-nowrap">
                <thead className="bg-secondary text-light">
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th className="w-50" >
                            Username
                            <span onClick={(e) => {
                                 onSorting({username:!sortData.username});
                             }}><i className={sortData.username? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Permissions
                        </th>     
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><ExportExcelUserPermissionList csvData={userPermissionListAll} fileName="UserPermission" loadDataFunction={requestUserPermissionListAll}/></th>
                        <th><button className="btn btn-info">Filter</button></th>
                        <th className="w-100">{createField(null, 'id', [], MultiSelect2,null,userList,'username',null,requestUserList,null,null,"")}</th>
                    </tr>
                </tbody>
                <tbody>
                    {userPermissionList.map((item, key) => <UserPermissionItem userPermissionItem={item} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </div>   
        </form>
    )
}

const UserPermissionListReduxForm = reduxForm({form: 'UserPermissionList'})(UserPermissionListForm)



export default UserPermissionDataGrid;