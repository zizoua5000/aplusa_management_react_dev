import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const accessoryAPI = {
    getAccessoryList(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        return instance.get(`accessory/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                console.log("API ", response.data)
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    getAccessory(id) {
        return instance.get(`accessory/update_delete/${id}`)
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
    createAccessory(formData) {
        return instance.post(`accessory/list_create/`,formData)
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
    updateAccessory(formData) {
        return instance.put(`accessory/update_delete/${formData.id}`,formData)
            .then(response => {
                console.log("RESPONSE UPDATE ",response)
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
    deleteAccessory(id) {
        return instance.delete(`accessory/update_delete/${id}`)
    },
}