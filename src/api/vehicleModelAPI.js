import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const vehicleModelAPI = {
    getVehicleModelListNEW(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        console.log(get_link)
        return instance.get(`vehicle_model/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    getVehicleModelList(pageNumber = 1,page_size=null) {
        return instance.get(`vehicle_model/list_create/?page=${pageNumber}&page_size=${page_size}`)
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
    createVehicleModel(formData) {
        return instance.post(`vehicle_model/list_create/`, formData)
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
    updateVehicleModel(formData) {
        return instance.put(`vehicle_model/update_delete/${formData.id}`, formData)
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