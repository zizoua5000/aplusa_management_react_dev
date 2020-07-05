import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const ExportExcelAccessoryTypeList = ({csvData, fileName,requestLoadData}) => {   
    let exportExcelButton=React.createRef()
    console.log("EXPORT EXCEL", csvData)
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
            <ExcelFile element={<button ref={exportExcelButton} className="btn btn-info" type="button"style={{display:"none"}}><i className="text-gray-100 fas fa-file-excel ml-2"></i></button>} filename={fileName}>
                <ExcelSheet data={csvData} name="AccessoryTypeList">
                    <ExcelColumn label="Name" value="name"/>
                </ExcelSheet>
            </ExcelFile>
                }
            </div>
        );
}
