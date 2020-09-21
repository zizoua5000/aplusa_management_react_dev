import React from 'react';
import { Route } from 'react-router-dom';
import Footer from '../Footer/Footer'

import VehicleContainer from '../Vehicle/VehicleContainer'
import VehicleCreateContainer from '../Vehicle/VehicleCreateContainer'
import VehicleUpdateContainer from '../Vehicle/VehicleUpdateContainer'

import VehicleMarkContainer from '../VehicleMark/VehicleMarkContainer'
import VehicleMarkCreateContainer from '../VehicleMark/VehicleMarkCreateContainer'
import VehicleMarkUpdateContainer from '../VehicleMark/VehicleMarkUpdateContainer'

import VehicleTypeContainer from '../VehicleType/VehicleTypeContainer'
import VehicleTypeCreateContainer from '../VehicleType/VehicleTypeCreateContainer'
import VehicleTypeUpdateContainer from '../VehicleType/VehicleTypeUpdateContainer'

import VehicleModelContainer from '../VehicleModel/VehicleModelContainer'
import VehicleModelCreateContainer from '../VehicleModel/VehicleModelCreateContainer'
import VehicleModelUpdateContainer from '../VehicleModel/VehicleModelUpdateContainer'


import ProjectContainer from '../Project/ProjectContainer'
import ProjectCreateContainer from '../Project/ProjectCreateContainer'
import ProjectUpdateContainer from '../Project/ProjectUpdateContainer'

import RegionContainer from '../Region/RegionContainer'
import RegionCreateContainer from '../Region/RegionCreateContainer'
import RegionUpdateContainer from '../Region/RegionUpdateContainer'

import StatusContainer from '../Status/StatusContainer'
import StatusCreateContainer from '../Status/StatusCreateContainer'
import StatusUpdateContainer from '../Status/StatusUpdateContainer'

import DepartmentContainer from '../Department/DepartmentContainer'
import DepartmentCreateContainer from '../Department/DepartmentCreateContainer'
import DepartmentUpdateContainer from '../Department/DepartmentUpdateContainer'

import JobTitleContainer from '../JobTitle/JobTitleContainer'
import JobTitleCreateContainer from '../JobTitle/JobTitleCreateContainer'
import JobTitleUpdateContainer from '../JobTitle/JobTitleUpdateContainer'

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

import DeviceModelContainer from '../DeviceModel/DeviceModelContainer'
import DeviceModelCreateContainer from '../DeviceModel/DeviceModelCreateContainer'
import DeviceModelUpdateContainer from '../DeviceModel/DeviceModelUpdateContainer'

import DeviceContainer from '../Device/DeviceContainer'
import DeviceCreateContainer from '../Device/DeviceCreateContainer'
import DeviceUpdateContainer from '../Device/DeviceUpdateContainer'

import DeviceLocationContainer from '../DeviceLocation/DeviceLocationContainer'
import DeviceLocationCreateContainer from '../DeviceLocation/DeviceLocationCreateContainer'
import DeviceLocationUpdateContainer from '../DeviceLocation/DeviceLocationUpdateContainer'


import ConfigurationContainer from '../Configuration/ConfigurationContainer'
import ConfigurationCreateContainer from '../Configuration/ConfigurationCreateContainer'
import ConfigurationUpdateContainer from '../Configuration/ConfigurationUpdateContainer'

import UserContainer from '../User/UserContainer'
import UserCreateContainer from '../User/UserCreateContainer'
import UserUpdateContainer from '../User/UserUpdateContainer'

import PersonContainer from '../Person/PersonContainer'
import PersonCreateContainer from '../Person/PersonCreateContainer'
import PersonUpdateContainer from '../Person/PersonUpdateContainer'

import ContentTypeContainer from '../ContentType/ContentTypeContainer'
import ContentTypeCreateContainer from '../ContentType/ContentTypeCreateContainer'
import ContentTypeUpdateContainer from '../ContentType/ContentTypeUpdateContainer'

import DeviceDetailContainer from '../DeviceDetail/DeviceDetailContainer'
import DeviceDetailCreateContainer from '../DeviceDetail/DeviceDetailCreateContainer'
import DeviceDetailUpdateContainer from '../DeviceDetail/DeviceDetailUpdateContainer'

import AccessoryContainer from '../Accessory/AccessoryContainer'
import AccessoryCreateContainer from '../Accessory/AccessoryCreateContainer'
import AccessoryUpdateContainer from '../Accessory/AccessoryUpdateContainer'

import AccessoryTypeContainer from '../AccessoryType/AccessoryTypeContainer'
import AccessoryTypeCreateContainer from '../AccessoryType/AccessoryTypeCreateContainer'
import AccessoryTypeUpdateContainer from '../AccessoryType/AccessoryTypeUpdateContainer'

import AccessoryModelContainer from '../AccessoryModel/AccessoryModelContainer'
import AccessoryModelCreateContainer from '../AccessoryModel/AccessoryModelCreateContainer'
import AccessoryModelUpdateContainer from '../AccessoryModel/AccessoryModelUpdateContainer'

import PriceContainer from '../Price/PriceContainer'
import PriceCreateContainer from '../Price/PriceCreateContainer'
import PriceUpdateContainer from '../Price/PriceUpdateContainer'

import PriceTypeContainer from '../PriceType/PriceTypeContainer'
import PriceTypeCreateContainer from '../PriceType/PriceTypeCreateContainer'
import PriceTypeUpdateContainer from '../PriceType/PriceTypeUpdateContainer'

import PermissionContainer from '../Permission/PermissionContainer'
import PermissionCreateContainer from '../Permission/PermissionCreateContainer'
import PermissionUpdateContainer from '../Permission/PermissionUpdateContainer'

import UserPermissionContainer from '../UserPermission/UserPermissionContainer'
import UserPermissionUpdateContainer from '../UserPermission/UserPermissionUpdateContainer'

import ResponsiblePersonContainer from '../ResponsiblePerson/ResponsiblePersonContainer'
import ResponsiblePersonCreateContainer from '../ResponsiblePerson/ResponsiblePersonCreateContainer'
import ResponsiblePersonUpdateContainer from '../ResponsiblePerson/ResponsiblePersonUpdateContainer'

import FWVersionContainer from '../FWVersion/FWVersionContainer'
import FWVersionCreateContainer from '../FWVersion/FWVersionCreateContainer'
import FWVersionUpdateContainer from '../FWVersion/FWVersionUpdateContainer'


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

                        <Route path='/vehicle_model/:pageNumber?' render={() => <VehicleModelContainer />}></Route>
                        <Route path='/vehicle_model_create' render={() => <VehicleModelCreateContainer />}></Route>
                        <Route path='/vehicle_model_update/:id?' render={() => <VehicleModelUpdateContainer />}></Route>                        

                        <Route path='/job_title' render={() => <JobTitleContainer />}></Route>                      
                        <Route path='/job_title_create' render={() => <JobTitleCreateContainer />}></Route>
                        <Route path='/job_title_update/:id?' render={() => <JobTitleUpdateContainer />}></Route>

                    	<Route path='/department' render={() => <DepartmentContainer />}></Route>  
                        <Route path='/department_create' render={() => <DepartmentCreateContainer />}></Route>
                        <Route path='/department_update/:id?' render={() => <DepartmentUpdateContainer />}></Route>

                        <Route path='/region' render={() => <RegionContainer />}></Route>                      
                        <Route path='/region_create' render={() => <RegionCreateContainer />}></Route>
                        <Route path='/region_update/:id?' render={() => <RegionUpdateContainer />}></Route>
                        
                        <Route path='/status' render={() => <StatusContainer />}></Route>                      
                        <Route path='/status_create' render={() => <StatusCreateContainer />}></Route>
                        <Route path='/status_update/:id?' render={() => <StatusUpdateContainer />}></Route>
                        
                        <Route path='/project' render={() => <ProjectContainer />}></Route>                      
                        <Route path='/project_create' render={() => <ProjectCreateContainer />}></Route>
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

                        <Route path='/device_model' render={() => <DeviceModelContainer />}></Route>
                        <Route path='/device_model_create' render={() => <DeviceModelCreateContainer />}></Route>
                        <Route path='/device_model_update/:id?' render={() => <DeviceModelUpdateContainer />}></Route>

                        <Route path='/device' render={() => <DeviceContainer />}></Route>
                        <Route path='/device_create' render={() => <DeviceCreateContainer />}></Route>
                        <Route path='/device_update/:id?' render={() => <DeviceUpdateContainer />}></Route> 

                        <Route path='/device_location' render={() => <DeviceLocationContainer />}></Route>
                        <Route path='/device_location_create' render={() => <DeviceLocationCreateContainer />}></Route>
                        <Route path='/device_location_update/:id?' render={() => <DeviceLocationUpdateContainer />}></Route> 

                        <Route path='/configuration' render={() => <ConfigurationContainer />}></Route>
                        <Route path='/configuration_create' render={() => <ConfigurationCreateContainer />}></Route>
                        <Route path='/configuration_update/:id?' render={() => <ConfigurationUpdateContainer />}></Route>    
                                                                     
                        <Route path='/user' render={() => <UserContainer />}></Route>
                        <Route path='/user_create' render={() => <UserCreateContainer />}></Route>
                        <Route path='/user_update/:id?' render={() => <UserUpdateContainer />}></Route> 

                        <Route path='/person' render={() => <PersonContainer />}></Route>
                        <Route path='/person_create' render={() => <PersonCreateContainer />}></Route>
                        <Route path='/person_update/:id?' render={() => <PersonUpdateContainer />}></Route> 

                        <Route path='/content_type' render={() => <ContentTypeContainer />}></Route>
                        <Route path='/content_type_create' render={() => <ContentTypeCreateContainer />}></Route>
                        <Route path='/content_type_update/:id?' render={() => <ContentTypeUpdateContainer />}></Route>
                       
                        <Route path='/device_detail' render={() => <DeviceDetailContainer />}></Route>
                        <Route path='/device_detail_create' render={() => <DeviceDetailCreateContainer />}></Route>
                        <Route path='/device_detail_update/:id?' render={() => <DeviceDetailUpdateContainer />}></Route>

                        <Route path='/accessory' render={() => <AccessoryContainer />}></Route>
                        <Route path='/accessory_create' render={() => <AccessoryCreateContainer />}></Route>
                        <Route path='/accessory_update/:id?' render={() => <AccessoryUpdateContainer />}></Route>

                        <Route path='/accessory_type' render={() => <AccessoryTypeContainer />}></Route>
                        <Route path='/accessory_type_create' render={() => <AccessoryTypeCreateContainer />}></Route>
                        <Route path='/accessory_type_update/:id?' render={() => <AccessoryTypeUpdateContainer />}></Route>

                        <Route path='/accessory_model' render={() => <AccessoryModelContainer />}></Route>
                        <Route path='/accessory_model_create' render={() => <AccessoryModelCreateContainer />}></Route>
                        <Route path='/accessory_model_update/:id?' render={() => <AccessoryModelUpdateContainer />}></Route>

                        <Route path='/permission' render={() => <PermissionContainer />}></Route>
                        <Route path='/permission_create' render={() => <PermissionCreateContainer />}></Route>
                        <Route path='/permission_update/:id?' render={() => <PermissionUpdateContainer />}></Route>

                        <Route path='/user_permission' render={() => <UserPermissionContainer />}></Route>
                        <Route path='/user_permission_update/:id?' render={() => <UserPermissionUpdateContainer />}></Route>

                        <Route path='/price' render={() => <PriceContainer />}></Route>
                        <Route path='/price_create' render={() => <PriceCreateContainer />}></Route>
                        <Route path='/price_update/:id?' render={() => <PriceUpdateContainer />}></Route> 

                        <Route path='/price_type' render={() => <PriceTypeContainer />}></Route>
                        <Route path='/price_type_create' render={() => <PriceTypeCreateContainer />}></Route>
                        <Route path='/price_type_update/:id?' render={() => <PriceTypeUpdateContainer />}></Route> 

                        <Route path='/responsible_person' render={() => <ResponsiblePersonContainer />}></Route>
                        <Route path='/responsible_person_create' render={() => <ResponsiblePersonCreateContainer />}></Route>
                        <Route path='/responsible_person_update/:id?' render={() => <ResponsiblePersonUpdateContainer />}></Route> 

                        <Route path='/fw_version' render={() => <FWVersionContainer />}></Route>
                        <Route path='/fw_version_create' render={() => <FWVersionCreateContainer />}></Route>
                        <Route path='/fw_version_update/:id?' render={() => <FWVersionUpdateContainer />}></Route> 
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Content
