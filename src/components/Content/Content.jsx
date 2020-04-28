import React from 'react';
import VehicleMarkContainer from '../VehicleMark/VehicleMarkContainer'
import VehicleTypeContainer from '../VehicleType/VehicleTypeContainer'
import VehicleModelContainer from '../VehicleModel/VehicleModelContainer'
import VehicleModelCreateContainer from '../VehicleModel/VehicleModelCreateContainer'
import VehicleModelUpdateContainer from '../VehicleModel/VehicleModelUpdateContainer'
import { Route } from 'react-router-dom';
import Footer from '../Footer/Footer'


class Content extends React.Component {
    render() {
        return (
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <div className="container-fluid pt-3 px-3">
                        
                        <Route path='/vehicle_mark' render={() => <VehicleMarkContainer />}></Route>
                        
                        <Route path='/vehicle_type' render={() => <VehicleTypeContainer />}></Route>
                        
                        <Route path='/vehicle_model' render={() => <VehicleModelContainer />}></Route>

                        <Route path='/vehicle_model_create' render={() => <VehicleModelCreateContainer />}></Route>
                        <Route path='/vehicle_model_update/:id?' render={() => <VehicleModelUpdateContainer />}></Route>
                        
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Content