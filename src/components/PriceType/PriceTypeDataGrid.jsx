import React from 'react';
import {reduxForm} from "redux-form";
import Paginator from "../Common/Paginator/Paginator";
import {ExportExcelPriceTypeList} from "../Common/Export/ExportExcelPriceType";
import PriceTypeItem from './PriceTypeItem';
import {createField, Input} from "../Common/FormsControls/FormsControls";

let PriceTypeDataGrid = ({ priceTypeList, deleteItem, currentPage, pageSize, totalItemsCount, onPageChanged,onSorting,sortData,onSubmit,priceTypeListAll,requestPriceTypeListAll }) => {
    let itemCount = ((currentPage - 1) * pageSize) + 1
    return (
        <div >
            <div>
                <PriceTypeListReduxForm onSubmit={onSubmit} priceTypeList={priceTypeList} deleteItem={deleteItem} 
                    itemCount={itemCount} onSorting={onSorting} sortData={sortData} priceTypeListAll={priceTypeListAll} requestPriceTypeListAll={requestPriceTypeListAll}/>
                <div className="text-center">
                    <Paginator currentPage={currentPage} pageSize={pageSize}
                        totalItemsCount={totalItemsCount} onPageChanged={onPageChanged} />
                </div>
                
            </div>
        </div>
    )
}

const PriceTypeListForm= ({handleSubmit, error, initialValues,priceTypeList,deleteItem,itemCount,onSorting,sortData,priceTypeListAll,requestPriceTypeListAll}) => {
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
                        <th><ExportExcelPriceTypeList csvData={priceTypeListAll} fileName="Price Type" requestLoadData={requestPriceTypeListAll} /></th>
                        <th><button className="btn btn-info" onClick={handleSubmit}>Filter</button></th>
                        <th className="w-50">{createField(null, 'name',[],Input,'Name')}    </th>
                    </tr>
                </tbody>
                <tbody>
                    {priceTypeList.map((item, key) => <PriceTypeItem priceTypeItem={item} deleteItem={deleteItem} itemCount={itemCount++} key={key}/>)}
                </tbody>
            </table>  
        </form>
    )
}

const PriceTypeListReduxForm = reduxForm({form: 'PriceTypeList'})(PriceTypeListForm)

export default PriceTypeDataGrid;