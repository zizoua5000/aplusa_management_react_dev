import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const deviceAPI = {
    getDeviceListNEW(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        return instance.get(`device/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },

    getDeviceList(pageNumber=1) {
        return instance.get(`device/list_create/?page=${pageNumber}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    getDevice(id) {
        return instance.get(`device/update_delete/${id}`)
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
    createDevice(formData) {
        return instance.post(`device/list_create/`,formData)
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
    updateDevice(formData) {
        return instance.put(`device/update_delete/${formData.id}`,formData)
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
    deleteDevice(id) {
        return instance.delete(`device/update_delete/${id}`)
    },
}