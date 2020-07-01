import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const ExportExcelVehicleList = ({ csvData, fileName, requestLoadData }) => {

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
            <ExcelSheet data={csvData} name="VehicleList">
                <ExcelColumn label="Plate" value="plate" />
                <ExcelColumn label="Serie Number" value="serie_number" />
                <ExcelColumn label="Vehicle Model" value={(col) => col.vehicle_model_detail.name} />
                <ExcelColumn label="Vehicle Mark" value={(col) => col.vehicle_model_detail.vehicle_mark_detail.name} />
                <ExcelColumn label="Vehicle Type" value={(col) => col.vehicle_type_detail.name} />
                <ExcelColumn label="Comment" value="comment" />
            </ExcelSheet>
        </ExcelFile>
        }
    </div>

    );
}
