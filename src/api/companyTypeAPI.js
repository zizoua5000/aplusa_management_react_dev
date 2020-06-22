import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const companyTypeAPI = {
    getCompanyTypeList(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        console.log(get_link)
        return instance.get(`company_type/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    createCompanyType(formData) {
        return instance.post(`company_type/list_create/`, formData)
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
    getCompanyType(id) {
        return instance.get(`company_type/update_delete/${id}`)
            .then(response => {
                return response;
            })
    },
    updateCompanyType(formData) {
        return instance.put(`company_type/update_delete/${formData.id}`, formData)
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
    deleteCompanyType(id) {
        return instance.delete(`company_type/update_delete/${id}`)
    },
}
