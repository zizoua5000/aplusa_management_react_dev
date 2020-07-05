import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const accessoryTypeAPI = {
    getAccessoryTypeList(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        console.log(get_link)
        return instance.get(`accessory_type/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    createAccessoryType(formData) {
        return instance.post(`accessory_type/list_create/`, formData)
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
    getAccessoryType(id) {
        return instance.get(`accessory_type/update_delete/${id}`)
            .then(response => {
                return response;
            })
    },
    updateAccessoryType(formData) {
        return instance.put(`accessory_type/update_delete/${formData.id}`, formData)
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
    deleteAccessoryType(id) {
        return instance.delete(`accessory_type/update_delete/${id}`)
    },
}
