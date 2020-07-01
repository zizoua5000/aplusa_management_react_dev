import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const deviceDetailAPI = {
    getDeviceDetailList(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        return instance.get(`device_detail/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },

    getDeviceDetail(id) {
        return instance.get(`device_detail/update_delete/${id}`)
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
    createDeviceDetail(formData) {
        return instance.post(`device_detail/list_create/`,formData)
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
    updateDeviceDetail(formData) {
        return instance.put(`device_detail/update_delete/${formData.id}`,formData)
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
    deleteDeviceDetail(id) {
        return instance.delete(`device_detail/update_delete/${id}`)
    },
}