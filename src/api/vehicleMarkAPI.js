import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const vehicleMarkAPI = {

    getVehicleMarkListNEW(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        console.log(get_link)
        return instance.get(`vehicle_mark/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },

    getVehicleMarkList(pageNumber=1,pageSize=null) {
        
        return instance.get(`vehicle_mark/list_create/?page=${pageNumber}&page_size=${pageSize}`)
        
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
    createVehicleMark(formData) {
        return instance.post(`vehicle_mark/list_create/`,formData)
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
    updateVehicleMark(formData) {
        return instance.put(`vehicle_mark/update_delete/${formData.id}`,formData)
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
    deleteVehicleMark(id) {
        return instance.delete(`vehicle_mark/update_delete/${id}`)
    },
}