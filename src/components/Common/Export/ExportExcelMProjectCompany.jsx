import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const ExportExcelMProjectCompanyList = ({ csvData, fileName, loadDataFunction }) => {

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
            <ExcelSheet data={csvData} name="MProjectCompanyList">
                <ExcelColumn label="Project" value={(col) => col.project_detail.name} />
                <ExcelColumn label="Company" value={(col) => col.company_detail.name} />
            </ExcelSheet>
        </ExcelFile>
        }
    </div>

    );
}
