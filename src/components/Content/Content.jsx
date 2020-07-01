import React from 'react';

import VehicleContainer from '../Vehicle/VehicleContainer'
import VehicleCreateContainer from '../Vehicle/VehicleCreateContainer'
import VehicleUpdateContainer from '../Vehicle/VehicleUpdateContainer'

import VehicleMarkContainer from '../VehicleMark/VehicleMarkContainer'
import VehicleMarkCreateContainer from '../VehicleMark/VehicleMarkCreateContainer'
import VehicleMarkUpdateContainer from '../VehicleMark/VehicleMarkUpdateContainer'

import VehicleTypeContainer from '../VehicleType/VehicleTypeContainer'
import VehicleTypeCreateContainer from '../VehicleType/VehicleTypeCreateContainer'
import VehicleTypeUpdateContainer from '../VehicleType/VehicleTypeUpdateContainer'

import ProjectContainer from '../Project/ProjectContainer'
import ProjectCreateContainer from '../Project/ProjectCreateContainer'
import ProjectUpdateContainer from '../Project/ProjectUpdateContainer'

import RegionContainer from '../Region/RegionContainer'
import RegionCreateContainer from '../Region/RegionCreateContainer'
import RegionUpdateContainer from '../Region/RegionUpdateContainer'

import StatusContainer from '../Status/StatusContainer'
import StatusCreateContainer from '../Status/StatusCreateContainer'
import StatusUpdateContainer from '../Status/StatusUpdateContainer'

import VehicleModelContainer from '../VehicleModel/VehicleModelContainer'
import VehicleModelCreateContainer from '../VehicleModel/VehicleModelCreateContainer'
import VehicleModelUpdateContainer from '../VehicleModel/VehicleModelUpdateContainer'

import JobTitleContainer from '../JobTitle/JobTitleContainer'
import JobTitleCreateContainer from '../JobTitle/JobTitleCreateContainer'
import JobTitleUpdateContainer from '../JobTitle/JobTitleUpdateContainer'

import SimcardContainer from '../Simcard/SimcardContainer'
import SimcardCreateContainer from '../Simcard/SimcardCreateContainer'
import SimcardUpdateContainer from '../Simcard/SimcardUpdateContainer'

import CompanyTypeContainer from '../CompanyType/CompanyTypeContainer'
import CompanyTypeCreateContainer from '../CompanyType/CompanyTypeCreateContainer'
import CompanyTypeUpdateContainer from '../CompanyType/CompanyTypeUpdateContainer'

import PriceTypeContainer from '../PriceType/PriceTypeContainer'
import PriceTypeCreateContainer from '../PriceType/PriceTypeCreateContainer'
import PriceTypeUpdateContainer from '../PriceType/PriceTypeUpdateContainer'

import { Route } from 'react-router-dom';
import Footer from '../Footer/Footer'


class Content extends React.Component {
    render() {
        return (
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <div className="container-fluid pt-3 px-3">
                        
                        <Route path='/vehicle' render={() => <VehicleContainer />}></Route>
                        <Route path='/vehicle_create' render={() => <VehicleCreateContainer />}></Route>
                        <Route path='/vehicle_update/:id?' render={() => <VehicleUpdateContainer />}></Route>

                        <Route path='/vehicle_mark' render={() => <VehicleMarkContainer />}></Route>     
                        <Route path='/vehicle_mark_create' render={() => <VehicleMarkCreateContainer />}></Route>
                        <Route path='/vehicle_mark_update/:id?' render={() => <VehicleMarkUpdateContainer />}></Route>                 
                        
                        <Route path='/vehicle_type' render={() => <VehicleTypeContainer />}></Route>                      
                        <Route path='/vehicle_type_create' render={() => <VehicleTypeCreateContainer />}></Route>
                        <Route path='/vehicle_type_update/:id?' render={() => <VehicleTypeUpdateContainer />}></Route>

                        <Route path='/job_title' render={() => <JobTitleContainer />}></Route>                      
                        <Route path='/job_title_create' render={() => <JobTitleCreateContainer />}></Route>
                        <Route path='/job_title_update/:id?' render={() => <JobTitleUpdateContainer />}></Route>
                        
                        <Route path='/region' render={() => <RegionContainer />}></Route>                      
                        <Route path='/region_create' render={() => <RegionCreateContainer />}></Route>
                        <Route path='/region_update/:id?' render={() => <RegionUpdateContainer />}></Route>
                        
                        <Route path='/status' render={() => <StatusContainer />}></Route>                      
                        <Route path='/status_create' render={() => <StatusCreateContainer />}></Route>
                        <Route path='/status_update/:id?' render={() => <StatusUpdateContainer />}></Route>
                        
                        <Route path='/project' render={() => <ProjectContainer />}></Route>                      
                        <Route path='/project_create' render={() => <ProjectCreateContainer />}></Route>
                        <Route path='/project_update/:id?' render={() => <ProjectUpdateContainer />}></Route>
                        
                        <Route path='/vehicle_model/:pageNumber?' render={() => <VehicleModelContainer />}></Route>
                        <Route path='/vehicle_model_create' render={() => <VehicleModelCreateContainer />}></Route>
                        <Route path='/vehicle_model_update/:id?' render={() => <VehicleModelUpdateContainer />}></Route>
                        
                        <Route path='/simcard' render={() => <SimcardContainer />}></Route>
                        <Route path='/simcard_create' render={() => <SimcardCreateContainer />}></Route>
                        <Route path='/simcard_update/:id?' render={() => <SimcardUpdateContainer />}></Route>

                        <Route path='/company_type' render={() => <CompanyTypeContainer />}></Route>  
                        <Route path='/company_type_create' render={() => <CompanyTypeCreateContainer />}></Route>
                        <Route path='/company_type_update/:id?' render={() => <CompanyTypeUpdateContainer />}></Route>

                        <Route path='/price_type' render={() => <PriceTypeContainer />}></Route>  
                        <Route path='/price_type_create' render={() => <PriceTypeCreateContainer />}></Route>
                        <Route path='/price_type_update/:id?' render={() => <PriceTypeUpdateContainer />}></Route>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Content
