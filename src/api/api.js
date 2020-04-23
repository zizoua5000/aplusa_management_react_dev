import axios from "axios";

const instance = axios.create({
    // withCredentials: true,
    baseURL: 'http://192.168.20.142:8010/api/',
    // headers: {
    //     "API-KEY": "+*=#fk6hal!1g=97b%(2obmvq&&9l-h4rprwsq#1g5()hodm@j"
    // }
});




export const vehicleMarkAPI = {
    getvehicleMark() {
        return instance.get('vehicle_mark/list_create/')
            .then(response => {
                return response.data;
            })
    }


}


export const simcardAPI = {
    getsimcard() {
        return instance.get(`simcard/list_create/`)
            .then(response => {
                return response.data;
            });
    }
}


export const vehicleTypeAPI = {
    getvehicleType(dispatch,actions) {
        
        return instance.get('vehicle_type/list_create/')
            .then(response => {
                return response;
            })   
            .catch(err=> {  
                if(err.response){
                    console.log("response error",err)
                    dispatch(actions.setIsFetching(false))
                    dispatch(actions.setErrorMessage(err))
                }else if(err.request){
                    console.log("request error",err)
                    dispatch(actions.setIsFetching(false))
                    dispatch(actions.setErrorMessage(err))
                } else {
                    console.log("some dif error")
                    dispatch(actions.setIsFetching(false))
                }
            
            })       
    }
}

export const vehicleModelAPI = {
    getvehicleModel() {
        return instance.get(`vehicle_model/list_create/`)
            .then(response => {
                return response.data;
            });
    }
}
export const jobTitleAPI = {
    getjobTitle() {
        return instance.get(`job_title/list_create/`)
            .then(response => {
                return response.data;
            });
    }
}