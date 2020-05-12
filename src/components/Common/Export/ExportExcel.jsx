import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const ExportExcelVehicleModelList = ({csvData, fileName}) => {    
        return (
            <ExcelFile element={<button className="btn btn-info"><i className="text-gray-100 fas fa-file-excel ml-2"></i></button>} filename={fileName}>
                <ExcelSheet data={csvData} name="VehicleModelList">
                    <ExcelColumn label="Name" value="name"/>
                    <ExcelColumn label="Vehicle Mark" value={(col) => col.vehicle_mark_detail.name}/>
                </ExcelSheet>
            </ExcelFile>
        );
}
