import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelContentTypeList} from "../Common/Export/ExportExcelContentType";
import ContentTypeItem from './ContentTypeItem';
import {createField, Input} from "../Common/FormsControls/FormsControls";

let ContentTypeDataGrid = ({ contentTypeList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,contentTypeListAll,contentTypeFunction }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    return (
        <div >
            <div>
                <ContentTypeListReduxForm onSubmit={onSubmit} contentTypeList={contentTypeList} deleteItem={deleteItem} 
                    itemCount={itemCount} onSorting={onSorting} sortData={sortData} contentTypeListAll={contentTypeListAll} contentTypeFunction={contentTypeFunction}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const ContentTypeListForm= ({handleSubmit, error, initialValues,contentTypeList,deleteItem,itemCount,onSorting,sortData,contentTypeListAll,contentTypeFunction}) => {
    return (
        
        <form >   
            <table className="table table-default table-bordered text-nowrap">
                <thead className="bg-secondary text-light">
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th className="w-50" >
                            App label
                            <span onClick={(e) => {
                                 onSorting({app_label:!sortData.app_label});
                             }}><i className={sortData.app_label? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                        <th className="w-50" >
                            Model
                            <span onClick={(e) => {
                                 onSorting({model:!sortData.model});
                             }}><i className={sortData.model? 'text-gray-400 fas fa-arrow-up ml-2':'text-gray-400 fas fa-arrow-down ml-2'}></i>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><ExportExcelContentTypeList csvData={contentTypeListAll} fileName="Content Type" loadDataFunction={contentTypeFunction} /></th>
                        <th><button className="btn btn-info" onClick={handleSubmit}>Filter</button></th>
                        <th className="w-50">{createField(null, 'app_label',[],Input,'App label')}</th>
                        <th className="w-50">{createField(null, 'model',[],Input,'Model')}</th>
                    </tr>
                </tbody>
                <tbody>
                    {contentTypeList.map((item, key) => <ContentTypeItem contentTypeItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const ContentTypeListReduxForm = reduxForm({form: 'ContentTypeList'})(ContentTypeListForm)

export default ContentTypeDataGrid;