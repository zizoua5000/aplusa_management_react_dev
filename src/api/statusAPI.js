import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const statusAPI = {
    getStatusListNEW(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        console.log(get_link)
        return instance.get(`status/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    getStatusList(pageNumber = 1,page_size=null) {
        return instance.get(`status/list_create/?page=${pageNumber}&page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(() => {
                return 'error';
            })
    },
    createStatus(formData) {
        return instance.post(`status/list_create/`, formData)
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
    getStatus(id) {
        return instance.get(`status/update_delete/${id}`)
            .then(response => {
                return response;
            })
    },
    updateStatus(formData) {
        return instance.put(`status/update_delete/${formData.id}`, formData)
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
    deleteStatus(id) {
        return instance.delete(`status/update_delete/${id}`)
    },
}
