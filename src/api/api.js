import axios from "axios";

const instance = axios.create({
    // withCredentials: true,
    //  baseURL: 'http://192.168.20.142:8010/api/',
    baseURL: 'http://127.0.0.1:8000/api/',
    // headers: {
    //     "API-KEY": "+*=#fk6hal!1g=97b%(2obmvq&&9l-h4rprwsq#1g5()hodm@j"
    // }
});

export const vehicleMarkAPI = {

    getVehicleMarkList(pageNumber=1) {
        return instance.get(`vehicle_mark/list_create/?page=${pageNumber}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    getVehicleMark(id) {
        return instance.get(`vehicle_mark/update_delete/${id}`)
            .then(response => {
                return response.data;
            });
    },
    createVehicleMark(formData) {
        return instance.post(`vehicle_mark/list_create/`,formData)
            .then(response => {
                return response.data;
            });
    },
    updateVehicleMark(formData) {
        return instance.put(`vehicle_mark/update_delete/${formData.id}`,formData)
            .then(response => {
                return response.data;
            });
    },
    deleteVehicleMark(id) {
        return instance.delete(`vehicle_mark/update_delete/${id}`)
            .then(response => {
                return response.data;
            });
    },
}

export const simcardAPI = {
    getSimcardList() {
        return instance.get(`simcard/list_create/`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    }
}


export const vehicleTypeAPI = {
    getvehicleTypeList(pageNumber = 1) {
        return instance.get(`vehicle_type/list_create/?page=${pageNumber}`)
            .then(response => {
                return response.data;
            })
            .catch(() => {
                return 'error';
            })
    },
    createVehicleType(formData) {
        return instance.post(`vehicle_type/list_create/`, formData)
            .then(response => {
                return response;
            })
            .catch(function (error) {
                if (error.response) {
                    return error.response;
                } else {
                    return 'error'
                }
            });
    },
    getVehicleType(id) {
        return instance.get(`vehicle_type/update_delete/${id}`)
            .then(response => {
                return response;
            })
            .catch(function (error) {
                if (error.response) {
                    return error.response;
                } else {
                    return 'error'
                }
            });
    },
    updateVehicleType(formData) {
        return instance.put(`vehicle_type/update_delete/${formData.id}`, formData)
            .then(response => {
                return response;
            })
            .catch(function (error) {
                if (error.response) {
                    return error.response;
                } else {
                    return 'error'
                }
            });
    },
    deleteVehicleType(id) {
        return instance.delete(`vehicle_type/update_delete/${id}`)
            .then(response => {
                return response.data;
            })
            .catch(function (error) {
                if (error.response) {
                    return error.response;
                } else {
                    return 'error'
                }
            });
    },
}

export const vehicleModelAPI = {
    getVehicleModelList(pageNumber = 1) {
        return instance.get(`vehicle_model/list_create/?page=${pageNumber}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    getVehicleModel(id) {
        return instance.get(`vehicle_model/update_delete/${id}`)
            .then(response => {
                return response.data;
            });
    },
    createVehicleModel(formData) {
        return instance.post(`vehicle_model/list_create/`, formData)
            .then(response => {
                return response.data;
            });
    },
    updateVehicleModel(formData) {
        return instance.put(`vehicle_model/update_delete/${formData.id}`, formData)
            .then(response => {
                return response.data;
            })
          
    },
    deleteVehicleModel(id) {
        return instance.delete(`vehicle_model/update_delete/${id}`)
    },

}
export const jobTitleAPI = {
    getJobTitle() {
        return instance.get(`job_title/list_create/`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    }
}

