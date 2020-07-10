import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const userPermissionAPI = {
    getUserPermissionList(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        return instance.get(`user_permission/list/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    createUserPermission(formData) {
        return instance.post(`user_permission/create/`, formData)
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
    getUserPermission(id) {
        return instance.get(`user_permission/detail/${id}`)
            .then(response => {
                return response;
            })
    },
    // deleteUserPermission(id) {
    //     return instance.delete(`user_permission/delete/${id}`)
    // },
}
