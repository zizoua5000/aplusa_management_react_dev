import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const ExportExcelDeviceList = ({ csvData, fileName, requestLoadData }) => {

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
            <ExcelSheet data={csvData} name="DeviceList">
                <ExcelColumn label="Serie" value="serie" />
                <ExcelColumn label="Company" value={(col) => col.company_detail.name} />
                <ExcelColumn label="Device Model" value={(col) => col.device_model_detail.name} />
                <ExcelColumn label="Device Mark" value={(col) => col.device_model_detail.device_mark_detail.name} />
                <ExcelColumn label="Device Type" value={(col) => col.device_type_detail.name} />
            </ExcelSheet>
        </ExcelFile>
        }
    </div>

    );
}
