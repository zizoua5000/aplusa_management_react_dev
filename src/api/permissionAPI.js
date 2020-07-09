import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const permissionAPI = {
    getPermissionList(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        return instance.get(`permission/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    createPermission(formData) {
        return instance.post(`permission/list_create/`, formData)
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
    getPermission(id) {
        return instance.get(`permission/update_delete/${id}`)
            .then(response => {
                return response;
            })
    },
    updatePermission(formData) {
        return instance.put(`permission/update_delete/${formData.id}`, formData)
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
    deletePermission(id) {
        return instance.delete(`permission/update_delete/${id}`)
    },
}
