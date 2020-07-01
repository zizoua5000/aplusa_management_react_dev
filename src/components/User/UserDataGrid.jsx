import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelUserList} from "../Common/Export/ExportExcelUser";
import UserItem from './UserItem';
import {createField,MultiSelect2,BooleanDropdown} from "../Common/FormsControls/FormsControls";


let UserDataGrid = ({ userList,  deleteItem, currentPage, pageSize, totalItemsCount, 
    onPageChanged,onSorting,sortData,onSubmit,userListAll,requestUserListAll}) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1

    return (
        <div >
            <div>
                <UserListReduxForm onSubmit={onSubmit} userList={userList} deleteItem={deleteItem} itemCount={itemCount}
                 onSorting={onSorting} sortData={sortData} userListAll={userListAll} requestUserListAll={requestUserListAll} />
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const UserListForm= ({handleSubmit, error, initialValues,userList,deleteItem,itemCount,
    onSorting,sortData,userListAll,requestUserListAll}) => {
    return (        
        <form onSubmit={handleSubmit}>   
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
                            Status
                            <span onClick={(e) => {
                                 onSorting({is_active:!sortData.is_active});
                             }}><i className={sortData.is_active? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                       
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><ExportExcelUserList csvData={userListAll} fileName="User" loadDataFunction={requestUserListAll}/></th>
                        <th><button className="btn btn-info">Filter</button></th>
                        <th className="w-50">{createField(null, 'id', [], MultiSelect2,null,userListAll,'username',null,requestUserListAll,null,null,"")}</th>
                        <th className="w-50">{createField(null, 'is_active', [], BooleanDropdown,null,null,null,null,null,null,"")}</th>            
                    </tr>
                </tbody>
                <tbody>
                    {userList.map((item, key) => <UserItem userItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const UserListReduxForm = reduxForm({form: 'UserList'})(UserListForm)



export default UserDataGrid;