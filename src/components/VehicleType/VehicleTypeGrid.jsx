import React, { Component } from "react";
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { NavLink } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';

class VehicleTypeGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gridOptions: {
                api:{},
                enableColResize: true,
                
                columnDefs: [{
                    headerName: "#", checkboxSelection: true, 
                    field: 'id',
                },
                {
                    headerName: "",
                    field: 'id',
                    cellRendererFramework: (params) => {
                        // console.log(params)
                        return <div>
                            <NavLink to={`/vehicle_type_update/${params.value}`}>
                                <i className="text-secondary fas fa-edit ml-2"></i></NavLink>
                            <NavLink title="Delete" to='#' onClick={(e) =>
                                { this.props.deleteItem(params.value); }}><i className="text-secondary fas fa-trash ml-2"></i></NavLink>
                        </div>;
                    },
                },
                {
                    headerName: "Vehicle Type", field: "name", sortable: true, filter: 'agTextColumnFilter', floatingFilter: true,filterParams: {
                        
                        resetButton: true,
                        debounceMs: 200,
                    }
                    
                }],
                onGridReady(params) {
                    this.gridApi = params.api;
                    this.columnApi = params.columnApi;
            
                    this.gridApi.sizeColumnsToFit();
                    console.log(params.api.getDisplayedRowCount());
                    this.rowNodes = params.api.forEachNode(function(rowNode, index) {
                        console.log('node ' + rowNode.data.name + ' is in the grid');
                        
                    });
                },


                
            }
        }

    }

    componentDidMount() {
        console.log(this.props)
        
    }
    render() {

        return (
            <div
                className="ag-theme-alpine" style={{ height: "500px", width: "100%" }}>
                <AgGridReact
                    reactNext={true}
                    gridOptions={this.state.gridOptions}
                    rowData={this.props.list}>
                </AgGridReact>
            </div>
        )
    };


}

export default VehicleTypeGrid;