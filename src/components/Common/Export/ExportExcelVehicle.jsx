import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const ExportExcelVehicleList = ({csvData, fileName}) => {    
        return (
            <ExcelFile element={<button className="btn btn-info"><i className="text-gray-100 fas fa-file-excel ml-2"></i></button>} filename={fileName}>
                <ExcelSheet data={csvData} name="VehicleList">
                    <ExcelColumn label="Plate" value="plate"/>
                    <ExcelColumn label="Serie Number" value="serie_number"/>
                    <ExcelColumn label="Vehicle Model" value={(col) => col.vehicle_model_detail.name}/>
                    <ExcelColumn label="Vehicle Mark" value={(col) => col.vehicle_model_detail.vehicle_mark_detail.name}/>
                    <ExcelColumn label="Vehicle Type" value={(col) => col.vehicle_type_detail.name}/>
                    <ExcelColumn label="Comment" value="comment"/>
                </ExcelSheet>
            </ExcelFile>
        );
}
