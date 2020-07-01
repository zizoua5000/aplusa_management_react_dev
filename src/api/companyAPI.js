import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const companyAPI = {
    getCompanyList(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        return instance.get(`company/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    createCompany(formData) {
        return instance.post(`company/list_create/`, formData)
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
    getCompany(id) {
        return instance.get(`company/update_delete/${id}`)
            .then(response => {
                return response;
            })
    },
    updateCompany(formData) {
        return instance.put(`company/update_delete/${formData.id}`, formData)
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
    deleteCompany(id) {
        return instance.delete(`company/update_delete/${id}`)
    },
}
