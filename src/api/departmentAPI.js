import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const departmentAPI = {
    getDepartmentList(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        return instance.get(`department/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    createDepartment(formData) {
        return instance.post(`department/list_create/`, formData)
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
    getDepartment(id) {
        return instance.get(`department/update_delete/${id}`)
            .then(response => {
                return response;
            })
    },
    updateDepartment(formData) {
        return instance.put(`department/update_delete/${formData.id}`, formData)
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
    deleteDepartment(id) {
        return instance.delete(`department/update_delete/${id}`)
    },
}
