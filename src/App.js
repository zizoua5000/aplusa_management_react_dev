import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer'
import Vehicle from './components/Vehicle/Vehicle'
import VehicleMark from './components/VehicleMark/VehicleMark'
import Simcard from './components/Simcard/Simcard'
import { BrowserRouter, Route } from 'react-router-dom';
import VehicleType from './components/VehicleType/VehicleType';
import VehicleModel from './components/VehicleModel/VehicleModel';
import JobTitle from './components/JobTitle/JobTitle';



class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div id="wrapper">
                    <Navbar />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            
                            <div className="container-fluid">
                                <Route path='/vehicle' render={ () => <Vehicle />}></Route>
                                
                                {/* <Route path='/vehicle' component={Vehicle}></Route> */}
                                
                                <Route path='/vehicle_mark' render={ () => <VehicleMark />}></Route>
                                <Route path='/vehicle_model' render={ () => <VehicleModel />}></Route>
                                <Route path='/vehicle_type' render={ () => <VehicleType />}></Route>                                
                                <Route path='/simcard' render={ () => <Simcard />}></Route>
                                <Route path='/job_title' render={ () => <JobTitle />}></Route>
                                {/* <Route path='/vehicle_mark'component={VehicleMark}></Route> */}
                                
                                {/* <Route path='/vehicle_model' component={VehicleModel}></Route>
                                <Route path='/vehicle_type' component={VehicleType}></Route> */}
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}


export default App