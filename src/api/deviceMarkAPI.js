import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const deviceMarkAPI = {
    getDeviceMarkListNEW(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        console.log(get_link)
        return instance.get(`device_mark/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    getDeviceMarkList(pageNumber = 1,page_size=null) {
        return instance.get(`device_mark/list_create/?page=${pageNumber}&page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(() => {
                return 'error';
            })
    },
    createDeviceMark(formData) {
        return instance.post(`device_mark/list_create/`, formData)
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
    getDeviceMark(id) {
        return instance.get(`device_mark/update_delete/${id}`)
            .then(response => {
                return response;
            })
    },
    updateDeviceMark(formData) {
        return instance.put(`device_mark/update_delete/${formData.id}`, formData)
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
    deleteDeviceMark(id) {
        return instance.delete(`device_mark/update_delete/${id}`)
    },
}
