import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const deviceDetailViewAPI = {
    getDeviceDetailViewList(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        return instance.get(`device_detail_view/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    getDeviceDetailView(id) {
        return instance.get(`device_detail_view/update_delete/${id}`)
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
    createDeviceDetailView(formData) {
        return instance.post(`device_detail_view/list_create/`,formData)
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
    updateDeviceDetailView(formData) {
        return instance.put(`device_detail_view/update_delete/${formData.id}`,formData)
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
    deleteDeviceDetailView(id) {
        return instance.delete(`device_detail_view/update_delete/${id}`)
    },
}