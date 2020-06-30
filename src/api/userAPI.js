import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const userAPI = {
    getUserList(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        return instance.get(`user/register_list/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    createUser(formData) {
        return instance.post(`user/register_list/`, formData)
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
    getUser(id) {
        return instance.get(`user/update_delete/${id}`)
            .then(response => {
                return response;
            })
    },
    updateUser(formData) {
        return instance.put(`user/update_delete/${formData.id}`, formData)
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
    deleteUser(id) {
        return instance.delete(`user/update_delete/${id}`)
    },
}
