import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const ExportExcelQaimeList = ({ csvData, fileName, loadDataFunction }) => {

    let exportExcelButton=React.createRef()
    let activateLoadingData=async ()=>{
        let elementExportExcelButton=exportExcelButton.current
        let data= await loadDataFunction(1,true);
        if (data !== null) {     
            elementExportExcelButton.click()
        }    
    }
    return (
    <div>
        {
        <button className="btn btn-info" type="button" onClick={() => activateLoadingData()}><i className="text-gray-100 fas fa-file-excel ml-2"></i></button>    
        }
        {
        <ExcelFile filename={fileName} element={<button ref={exportExcelButton} className="btn btn-info" type="button" style={{display:"none"}}><i className="text-gray-100 fas fa-file-excel ml-2"></i></button>}>
            <ExcelSheet data={csvData} name="QaimeList">
                <ExcelColumn label="Name" value="name" />
                <ExcelColumn label="Department" value={(col) => col.responsible_person_detail.name} />
                <ExcelColumn label="Qaime Type" value={(col) => col.qaime_type_detail.name} />
                <ExcelColumn label="Datetime" value={(col) => col.qaime_datetime} />
                <ExcelColumn label="Status" value={(col) => col.status_detail.name} />
                <ExcelColumn label="Recipient" value={(col) => col.recipient_detail.first_name} />
                <ExcelColumn label="Comment" value={(col) => col.comment} /> 
            </ExcelSheet>
        </ExcelFile>
        }
    </div>

    );
}