import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const vehicleTypeAPI = {
    getVehicleTypeListNEW(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        console.log(get_link)
        return instance.get(`vehicle_type/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    getVehicleTypeList(pageNumber = 1,page_size=null) {
        return instance.get(`vehicle_type/list_create/?page=${pageNumber}page_size=${page_size}`)
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
    },
}
