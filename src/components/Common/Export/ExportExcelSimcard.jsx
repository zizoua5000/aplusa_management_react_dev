import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const ExportExcelSimcardList = ({csvData, fileName}) => {    
        return (
            <ExcelFile element={<button className="btn btn-info"><i className="text-gray-100 fas fa-file-excel ml-2"></i></button>} filename={fileName}>
                <ExcelSheet data={csvData} name="SimcardList">
                    <ExcelColumn label="Number" value="number"/>
                    <ExcelColumn label="Package" value="package"/>
                    <ExcelColumn label="Rouming" value="has_rouming"/>
                    <ExcelColumn label="Status" value="is_active"/>
                </ExcelSheet>
            </ExcelFile>
        );
}
