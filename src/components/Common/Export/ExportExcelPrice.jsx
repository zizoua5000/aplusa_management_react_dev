import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const ExportExcelPriceList = ({csvData, fileName,requestLoadData}) => {   
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
                <button className="btn btn-info" type="button" onClick={() => activateLoadingData()}><i className="text-gray-100 fas fa-file-excel ml-2"></i></button>    
                }
                {            
            <ExcelFile element={<button ref={exportExcelButton} className="btn btn-info" type="button"style={{display:"none"}}><i className="text-gray-100 fas fa-file-excel ml-2"></i></button>} filename={fileName}>
                <ExcelSheet data={csvData} name="PriceList">
                    <ExcelColumn label="Device Model" value={(col) => col.device_model_detail.name} />
                    <ExcelColumn label="Accessory Model" value={(col) => col.accessory_model_detail.name} />
                    <ExcelColumn label="Project" value={(col) => col.project_detail.name} />
                    <ExcelColumn label="Start Datetime" value="start_datetime" />
                    <ExcelColumn label="End Datetime" value="end_datetime" />
                    <ExcelColumn label="Sell Price" value="sell_price" />
                    <ExcelColumn label="Price Type" value={(col) => col.price_type_detail.name} />
                    <ExcelColumn label="Second Hand" value="is_second_hand"/>
                </ExcelSheet>
            </ExcelFile>
                }
            </div>
        );
}
