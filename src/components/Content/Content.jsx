import React from 'react';
import VehicleContainer from '../Vehicle/VehicleContainer'
import VehicleCreateContainer from '../Vehicle/VehicleCreateContainer'
import VehicleUpdateContainer from '../Vehicle/VehicleUpdateContainer'
import VehicleMarkContainer from '../VehicleMark/VehicleMarkContainer'
import VehicleMarkCreateContainer from '../VehicleMark/VehicleMarkCreateContainer'
import VehicleMarkUpdateContainer from '../VehicleMark/VehicleMarkUpdateContainer'
import VehicleTypeContainer from '../VehicleType/VehicleTypeContainer'
import VehicleModelContainer from '../VehicleModel/VehicleModelContainer'
import VehicleModelCreateContainer from '../VehicleModel/VehicleModelCreateContainer'
import VehicleModelUpdateContainer from '../VehicleModel/VehicleModelUpdateContainer'
import VehicleTypeCreateContainer from '../VehicleType/VehicleTypeCreateContainer'
import VehicleTypeUpdateContainer from '../VehicleType/VehicleTypeUpdateContainer'
import SimcardContainer from '../Simcard/SimcardContainer'
import SimcardCreateContainer from '../Simcard/SimcardCreateContainer'
import SimcardUpdateContainer from '../Simcard/SimcardUpdateContainer'
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
                        <Route path='/vehicle_model/:pageNumber?' render={() => <VehicleModelContainer />}></Route>
                        <Route path='/vehicle_model_create' render={() => <VehicleModelCreateContainer />}></Route>
                        <Route path='/vehicle_model_update/:id?' render={() => <VehicleModelUpdateContainer />}></Route>
                        <Route path='/vehicle_type_create' render={() => <VehicleTypeCreateContainer />}></Route>
                        <Route path='/vehicle_type_update/:id?' render={() => <VehicleTypeUpdateContainer />}></Route>
                        <Route path='/simcard' render={() => <SimcardContainer />}></Route>
                        <Route path='/simcard_create' render={() => <SimcardCreateContainer />}></Route>
                        <Route path='/simcard_update/:id?' render={() => <SimcardUpdateContainer />}></Route>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Content
