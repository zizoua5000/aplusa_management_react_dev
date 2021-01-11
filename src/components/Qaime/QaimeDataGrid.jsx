import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelQaimeList} from "../Common/Export/ExportExcelQaime";
import QaimeItem from './QaimeItem';
import {createField,MultiSelect2, Input} from "../Common/FormsControls/FormsControls";

let QaimeDataGrid = ({ qaimeList, deleteItem,changeStatusQaime,currentPage, pageSize, totalItemsCount, onPageChanged,
    onSorting,sortData,onSubmit,qaimeListAll, statusList, requestStatusList,
    responsiblePersonList, requestResponsiblePersonList,qaimeTypeList, requestQaimeTypeList,
    personList, requestPersonList,requestQaimeListAll }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    return (
        <div >
            <div>
                <QaimeListReduxForm onSubmit={onSubmit} qaimeList={qaimeList} deleteItem={deleteItem} changeStatusQaime={changeStatusQaime}
                    itemCount={itemCount} onSorting={onSorting} sortData={sortData} qaimeListAll={qaimeListAll}
                    statusList={statusList} requestStatusList={requestStatusList}
                    responsiblePersonList={responsiblePersonList} requestResponsiblePersonList={requestResponsiblePersonList}
                    qaimeTypeList={qaimeTypeList} requestQaimeTypeList={requestQaimeTypeList}
                    personList={personList} requestPersonList={requestPersonList}
                    qaimeListAll={qaimeListAll} requestQaimeListAll={requestQaimeListAll}
                    />
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const QaimeListForm= ({handleSubmit, error, initialValues,qaimeList,deleteItem,changeStatusQaime,itemCount,onSorting,sortData,
                        statusList,requestStatusList,responsiblePersonList,requestResponsiblePersonList,qaimeTypeList,
                        requestQaimeTypeList,personList,requestPersonList,qaimeListAll,requestQaimeListAll}) => {
    return (
        
        <form >   
            <table className="table table-default table-bordered text-nowrap">
                <thead className="bg-secondary text-light">
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th className="w-25" >
                            Status
                            <span onClick={(e) => {
                                 onSorting({status:!sortData.status});
                             }}><i className={sortData.status? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Name
                            <span onClick={(e) => {
                                 onSorting({name:!sortData.name});
                             }}><i className={sortData.name? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Department
                            <span onClick={(e) => {
                                 onSorting({responsible_person:!sortData.responsible_person});
                             }}><i className={sortData.responsible_person? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Qaime Type
                            <span onClick={(e) => {
                                 onSorting({qaime_type:!sortData.qaime_type});
                             }}><i className={sortData.qaime_type? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Datetime
                            <span onClick={(e) => {
                                 onSorting({qaime_datetime:!sortData.qaime_datetime});
                             }}><i className={sortData.qaime_datetime? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Recipient
                            <span onClick={(e) => {
                                 onSorting({recipient:!sortData.recipient});
                             }}><i className={sortData.recipient? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><ExportExcelQaimeList csvData={qaimeListAll} fileName="Qaime" loadDataFunction={requestQaimeListAll} /></th>
                        <th><button className="btn btn-info" onClick={handleSubmit}>Filter</button></th>
                        <th className="w-100">{createField(null, 'status', [], MultiSelect2,null,statusList,'name',null,requestStatusList,null,null,"")}</th>
                        <th className="w-50">{createField(null, 'name',[],Input,'Name')}    </th>
                        <th className="w-100">{createField(null, 'responsible_person', [], MultiSelect2,null,responsiblePersonList,'name',null,requestResponsiblePersonList,null,null,"")}</th>
                        <th className="w-100">{createField(null, 'qaime_type', [], MultiSelect2,null,qaimeTypeList,'name',null,requestQaimeTypeList,null,null,"")}</th>
                        <th className="w-50">{createField(null, 'qaime_datetime',[], MultiSelect2,null,qaimeListAll,'qaime_datetime',null,requestQaimeListAll,null,'qaime_datetime',true,"")}</th>
                        <th className="w-100">{createField(null, 'recipient', [], MultiSelect2,null,personList,"full_name",null,requestPersonList,null,null,"")}</th>       
                    </tr>
                </tbody>
                <tbody>
                    {qaimeList.map((item, key) => <QaimeItem qaimeItem={item} deleteItem={deleteItem} changeStatusQaime={changeStatusQaime} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const QaimeListReduxForm = reduxForm({form: 'QaimeList'})(QaimeListForm)

export default QaimeDataGrid;