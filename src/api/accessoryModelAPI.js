import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const accessoryModelAPI = {
    getAccessoryModelList(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        console.log(get_link)
        return instance.get(`accessory_model/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    createAccessoryModel(formData) {
        return instance.post(`accessory_model/list_create/`, formData)
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
    getAccessoryModel(id) {
        return instance.get(`accessory_model/update_delete/${id}`)
            .then(response => {
                return response;
            })
    },
    updateAccessoryModel(formData) {
        return instance.put(`accessory_model/update_delete/${formData.id}`, formData)
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
    deleteAccessoryModel(id) {
        return instance.delete(`accessory_model/update_delete/${id}`)
    },
}
