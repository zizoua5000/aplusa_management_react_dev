import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const deviceTypeAPI = {
    getDeviceTypeListNEW(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        console.log(get_link)
        return instance.get(`device_type/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    getDeviceTypeList(pageNumber = 1,page_size=null) {
        return instance.get(`device_type/list_create/?page=${pageNumber}&page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(() => {
                return 'error';
            })
    },
    createDeviceType(formData) {
        return instance.post(`device_type/list_create/`, formData)
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
    getDeviceType(id) {
        return instance.get(`device_type/update_delete/${id}`)
            .then(response => {
                return response;
            })
    },
    updateDeviceType(formData) {
        return instance.put(`device_type/update_delete/${formData.id}`, formData)
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
    deleteDeviceType(id) {
        return instance.delete(`device_type/update_delete/${id}`)
    },
}
