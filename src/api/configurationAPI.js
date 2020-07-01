import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const configurationAPI = {
    getConfigurationList(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        return instance.get(`configuration/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    createConfiguration(formData) {
        return instance.post(`configuration/list_create/`, formData)
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
    getConfiguration(id) {
        return instance.get(`configuration/update_delete/${id}`)
            .then(response => {
                return response;
            })
    },
    updateConfiguration(formData) {
        return instance.put(`configuration/update_delete/${formData.id}`, formData)
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
    deleteConfiguration(id) {
        return instance.delete(`configuration/update_delete/${id}`)
    },
}
