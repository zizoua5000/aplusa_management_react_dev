import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const ExportExcelUserPermissionList = ({ csvData, fileName, loadDataFunction }) => {

    let destructDetails =(data)=>{
        let newData=[]
        data.map(item=>{
            let permission=null
            if(item.user_permissions_detail!=null) {
                permission=""
                item.user_permissions_detail.map(innerItem=>{
                    permission+=permission+innerItem.name
                })
            }
            newData.push({username:item.username, permission:permission})
        })
        return newData
    }
    
    if (csvData!=null){
        csvData=destructDetails(csvData)
    }

    let exportExcelButton=React.createRef()
    let activateLoadingData=async ()=>{
        let elementExportExcelButton=exportExcelButton.current
        let data= await loadDataFunction(1,true);
       
        if (data !== null ) {
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
            <ExcelSheet data={csvData} name="UserPermissionList">
                <ExcelColumn label="Username" value={(col) => col.username} />
                <ExcelColumn label="Permission" value={(col) => col.permission} />
            </ExcelSheet>
        </ExcelFile>
        }
    </div>

    );
}
