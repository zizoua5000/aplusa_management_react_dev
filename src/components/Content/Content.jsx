import React from 'react';
import VehicleContainer from '../Vehicle/VehicleContainer'
import VehicleCreateContainer from '../Vehicle/VehicleCreateContainer'
import VehicleUpdateContainer from '../Vehicle/VehicleUpdateContainer'
import VehicleMarkContainer from '../VehicleMark/VehicleMarkContainer'
import VehicleMarkCreateContainer from '../VehicleMark/VehicleMarkCreateContainer'
import VehicleMarkUpdateContainer from '../VehicleMark/VehicleMarkUpdateContainer'
import VehicleTypeContainer from '../VehicleType/VehicleTypeContainer'
import RegionContainer from '../Region/RegionContainer'
import ProjectContainer from '../Project/ProjectContainer'
import VehicleModelContainer from '../VehicleModel/VehicleModelContainer'
import VehicleModelCreateContainer from '../VehicleModel/VehicleModelCreateContainer'
import VehicleModelUpdateContainer from '../VehicleModel/VehicleModelUpdateContainer'
import VehicleTypeCreateContainer from '../VehicleType/VehicleTypeCreateContainer'
import RegionCreateContainer from '../Region/RegionCreateContainer'
import ProjectCreateContainer from '../Project/ProjectCreateContainer'
import VehicleTypeUpdateContainer from '../VehicleType/VehicleTypeUpdateContainer'
import RegionUpdateContainer from '../Region/RegionUpdateContainer'
import ProjectUpdateContainer from '../Project/ProjectUpdateContainer'
import SimcardContainer from '../Simcard/SimcardContainer'
import SimcardCreateContainer from '../Simcard/SimcardCreateContainer'
import SimcardUpdateContainer from '../Simcard/SimcardUpdateContainer'
import CompanyTypeContainer from '../CompanyType/CompanyTypeContainer'
import CompanyTypeCreateContainer from '../CompanyType/CompanyTypeCreateContainer'
import CompanyTypeUpdateContainer from '../CompanyType/CompanyTypeUpdateContainer'
import CompanyContainer from '../Company/CompanyContainer'
import CompanyCreateContainer from '../Company/CompanyCreateContainer'
import CompanyUpdateContainer from '../Company/CompanyUpdateContainer'
import DeviceTypeContainer from '../DeviceType/DeviceTypeContainer'
import DeviceTypeCreateContainer from '../DeviceType/DeviceTypeCreateContainer'
import DeviceTypeUpdateContainer from '../DeviceType/DeviceTypeUpdateContainer'
import DeviceMarkContainer from '../DeviceMark/DeviceMarkContainer'
import DeviceMarkCreateContainer from '../DeviceMark/DeviceMarkCreateContainer'
import DeviceMarkUpdateContainer from '../DeviceMark/DeviceMarkUpdateContainer'
import DepartmentContainer from '../Department/DepartmentContainer'
import DepartmentCreateContainer from '../Department/DepartmentCreateContainer'
import DepartmentUpdateContainer from '../Department/DepartmentUpdateContainer'
import DeviceModelContainer from '../DeviceModel/DeviceModelContainer'
import DeviceModelCreateContainer from '../DeviceModel/DeviceModelCreateContainer'
import DeviceModelUpdateContainer from '../DeviceModel/DeviceModelUpdateContainer'
import DeviceContainer from '../Device/DeviceContainer'
import DeviceCreateContainer from '../Device/DeviceCreateContainer'
import DeviceUpdateContainer from '../Device/DeviceUpdateContainer'
import DeviceLocationContainer from '../DeviceLocation/DeviceLocationContainer'
import DeviceLocationCreateContainer from '../DeviceLocation/DeviceLocationCreateContainer'
import DeviceLocationUpdateContainer from '../DeviceLocation/DeviceLocationUpdateContainer'
import { Route } from 'react-router-dom';
import Footer from '../Footer/Footer'


class Content extends React.Component {
    render() {
        return (
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <div className="container-fluid pt-3 px-3">
                        <Route path='/vehicle' render={() => <VehicleContainer />}></Route>
                        <Route path='/vehicle_update/:id?' render={() => <VehicleUpdateContainer />}></Route>
                        <Route path='/vehicle_create' render={() => <VehicleCreateContainer />}></Route>
                        <Route path='/vehicle_mark' render={() => <VehicleMarkContainer />}></Route>     
                        <Route path='/vehicle_mark_create' render={() => <VehicleMarkCreateContainer />}></Route>
                        <Route path='/vehicle_mark_update/:id?' render={() => <VehicleMarkUpdateContainer />}></Route>                 
                        <Route path='/vehicle_type' render={() => <VehicleTypeContainer />}></Route>                      
                        <Route path='/region' render={() => <RegionContainer />}></Route>                      
                        <Route path='/project' render={() => <ProjectContainer />}></Route>                      
                        <Route path='/vehicle_model/:pageNumber?' render={() => <VehicleModelContainer />}></Route>
                        <Route path='/vehicle_model_create' render={() => <VehicleModelCreateContainer />}></Route>
                        <Route path='/vehicle_model_update/:id?' render={() => <VehicleModelUpdateContainer />}></Route>
                        <Route path='/vehicle_type_create' render={() => <VehicleTypeCreateContainer />}></Route>
                        <Route path='/region_create' render={() => <RegionCreateContainer />}></Route>
                        <Route path='/project_create' render={() => <ProjectCreateContainer />}></Route>
                        <Route path='/vehicle_type_update/:id?' render={() => <VehicleTypeUpdateContainer />}></Route>
                        <Route path='/region_update/:id?' render={() => <RegionUpdateContainer />}></Route>
                        <Route path='/project_update/:id?' render={() => <ProjectUpdateContainer />}></Route>
                        <Route path='/simcard' render={() => <SimcardContainer />}></Route>
                        <Route path='/simcard_create' render={() => <SimcardCreateContainer />}></Route>
                        <Route path='/simcard_update/:id?' render={() => <SimcardUpdateContainer />}></Route>
                        <Route path='/company_type' render={() => <CompanyTypeContainer />}></Route>  
                        <Route path='/company_type_create' render={() => <CompanyTypeCreateContainer />}></Route>
                        <Route path='/company_type_update/:id?' render={() => <CompanyTypeUpdateContainer />}></Route>
                        <Route path='/company' render={() => <CompanyContainer />}></Route>  
                        <Route path='/company_create' render={() => <CompanyCreateContainer />}></Route>
                        <Route path='/company_update/:id?' render={() => <CompanyUpdateContainer />}></Route>
                        <Route path='/device_type' render={() => <DeviceTypeContainer />}></Route>
                        <Route path='/device_type_create' render={() => <DeviceTypeCreateContainer />}></Route>
                        <Route path='/device_type_update/:id?' render={() => <DeviceTypeUpdateContainer />}></Route>
                        <Route path='/device_mark' render={() => <DeviceMarkContainer />}></Route>
                        <Route path='/device_mark_create' render={() => <DeviceMarkCreateContainer />}></Route>
                        <Route path='/device_mark_update/:id?' render={() => <DeviceMarkUpdateContainer />}></Route>                        
                    	<Route path='/department' render={() => <DepartmentContainer />}></Route>  
                        <Route path='/department_create' render={() => <DepartmentCreateContainer />}></Route>
                        <Route path='/department_update/:id?' render={() => <DepartmentUpdateContainer />}></Route>
                        <Route path='/device_model' render={() => <DeviceModelContainer />}></Route>
                        <Route path='/device_model_create' render={() => <DeviceModelCreateContainer />}></Route>
                        <Route path='/device_model_update/:id?' render={() => <DeviceModelUpdateContainer />}></Route>
                        <Route path='/device' render={() => <DeviceContainer />}></Route>
                        <Route path='/device_create' render={() => <DeviceCreateContainer />}></Route>
                        <Route path='/device_update/:id?' render={() => <DeviceUpdateContainer />}></Route> 
                        <Route path='/device_location' render={() => <DeviceLocationContainer />}></Route>
                        <Route path='/device_location_create' render={() => <DeviceLocationCreateContainer />}></Route>
                        <Route path='/device_location_update/:id?' render={() => <DeviceLocationUpdateContainer />}></Route>                                               
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Content
