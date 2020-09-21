import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const ExportExcelAccessoryList = ({ csvData, fileName, requestLoadData }) => {

    let exportExcelButton=React.createRef()
    console.log("EXPORT EXCEL", requestLoadData)
    let activateLoadingData=async ()=>{
        let elementExportExcelButton=exportExcelButton.current
        let data= await requestLoadData(true);
        if (data !== null) {     
            elementExportExcelButton.click()
        }    
    }
    return (
    <div>
        {
        <button className="btn btn-info" type="button" onClick={() => activateLoadingData()}><i className="text-gray-100 fa fa-file-excel ml-2"></i></button>    
        }
        {
        <ExcelFile filename={fileName} element={<button ref={exportExcelButton} className="btn btn-info" type="button" style={{display:"none"}}><i className="text-gray-100 fas fa-file-excel ml-2"></i></button>}>
            <ExcelSheet data={csvData} name="AccessoryList">
                <ExcelColumn label="Name" value="name" />
                <ExcelColumn label="Manufacturer" value={(col) => col.manufacturer_detail.name} />
                <ExcelColumn label="Accessory Model" value={(col) => col.accessory_model_detail.name} />
                <ExcelColumn label="Accessory Type" value={(col) => col.accessory_type_detail.name} />
                <ExcelColumn label="Count" value={(col) => col.count} />
                <ExcelColumn label="Is_New" value={(col) => col.is_new} />
                <ExcelColumn label="Is_Our" value={(col) => col.is_our} />
            </ExcelSheet>
        </ExcelFile>
        }
    </div>

    );
}
