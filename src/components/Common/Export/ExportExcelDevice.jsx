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
                <ExcelColumn label="Device Company" value={(col) => col.company_detail.name} />
                <ExcelColumn label="Device Model" value={(col) => col.device_model_detail.name} />
                <ExcelColumn label="Device Mark" value={(col) => col.device_model_detail.device_mark_detail.name} />
                <ExcelColumn label="Status" value={(col) => col.device_details.status_detail.name} />
                <ExcelColumn label="Status Datetime" value={(col) => col.device_details.status_datetime} />
                <ExcelColumn label="Plate" value={(col) => col.device_details.vehicle_detail.plate} />
                <ExcelColumn label="Vehicle Company" value={(col) => col.device_details.company_detail.name} />
                <ExcelColumn label="Device Location" value={(col) => col.device_details.device_location_detail.name} />
                <ExcelColumn label="Project" value={(col) => col.device_details.project_detail.name} />
                <ExcelColumn label="Recipient" value={(col) => col.device_details.recipient_detail.first_name} />
                <ExcelColumn label="Region" value={(col) => col.device_details.region_detail.name} />
                <ExcelColumn label="Simcard" value={(col) => col.device_details.simcard_detail.number} />
                <ExcelColumn label="Package" value={(col) => col.device_details.simcard_detail.package}/>
                <ExcelColumn label="Rouming" value={(col) => col.device_details.simcard_detail.has_rouming}/>
                <ExcelColumn label="Status" value={(col) => col.device_details.simcard_detail.is_active}/>
                <ExcelColumn label="Configuration" value={(col) => col.device_details.configuration_detail.name} />
                <ExcelColumn label="Sell Count" value={(col) => col.device_details.sell_count} />
                <ExcelColumn label="Price Datetime" value={(col) => col.device_details.price_datetime} />
                <ExcelColumn label="Comment" value={(col) => col.device_details.comment} />           
                
            </ExcelSheet>
        </ExcelFile>
        }
    </div>

    );
}
