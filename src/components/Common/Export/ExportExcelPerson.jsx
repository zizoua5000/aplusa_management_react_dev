import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const ExportExcelPersonList = ({ csvData, fileName, loadDataFunction }) => {

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
            <ExcelSheet data={csvData} name="PersonList">
                <ExcelColumn label="Firstname" value="first_name" />
                <ExcelColumn label="Lastname" value="last_name" />
                <ExcelColumn label="Phone" value="phone" />
                <ExcelColumn label="Email" value="email" />
                <ExcelColumn label="Company" value={(col) => col.company_detail.name} />
                <ExcelColumn label="Department" value={(col) => col.department_detail.name} />
                <ExcelColumn label="Job title" value={(col) => col.job_title_detail.name} />
                <ExcelColumn label="Username" value={(col) => col.user_detail.username} />
            </ExcelSheet>
        </ExcelFile>
        }
    </div>

    );
}
