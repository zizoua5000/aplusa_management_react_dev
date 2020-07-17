import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const ExportExcelResponsiblePersonList = ({csvData, fileName,requestLoadData}) => {   
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
                <ExcelSheet data={csvData} name="ResponsiblePersonList">
                    <ExcelColumn label="Department" value={(col) => col.department_detail.name}/>
                    <ExcelColumn label="Deparment chief" value={(col) => col.department_chief_detail.full_name}/>
                    <ExcelColumn label="Chief substitute" value={(col) => col.chief_substitute_detail.full_name}/>
                    <ExcelColumn label="Accounter" value={(col) => col.accounter_detail.full_name}/>
                    <ExcelColumn label="Recipient" value={(col) => col.recipient_detail.full_name}/>
                    <ExcelColumn label="Provider" value={(col) => col.provider_detail.full_name}/>
                    <ExcelColumn label="Active" value="active"/>
                </ExcelSheet>
            </ExcelFile>
                }
            </div>
        );
}
