import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const mProjectCompanyAPI = {
    getMProjectCompanyList(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        return instance.get(`m_project_company/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    createMProjectCompany(formData) {
        return instance.post(`m_project_company/list_create/`, formData)
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
    getMProjectCompany(id) {
        return instance.get(`m_project_company/update_delete/${id}`)
            .then(response => {
                return response;
            })
    },
    updateMProjectCompany(formData) {
        return instance.put(`m_project_company/update_delete/${formData.id}`, formData)
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
    deleteMProjectCompany(id) {
        return instance.delete(`m_project_company/update_delete/${id}`)
    },
}
