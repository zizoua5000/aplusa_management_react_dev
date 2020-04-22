import axios, { AxiosResponse } from "axios";

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
    getvehicleType() {
        return instance.get('vehicle_type/list_create/')
            .then(response => {
                return response.data;
            });
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