import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const jobTitleAPI = {
    getJobTitleListNEW(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        console.log(get_link)
        return instance.get(`job_title/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    getJobTitleList(pageNumber = 1,page_size=null) {
        return instance.get(`jobTitle/list_create/?page=${pageNumber}&page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(() => {
                return 'error';
            })
    },
    createJobTitle(formData) {
        return instance.post(`jobTitle/list_create/`, formData)
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
    getJobTitle(id) {
        return instance.get(`jobTitle/update_delete/${id}`)
            .then(response => {
                return response;
            })
    },
    updateJobTitle(formData) {
        return instance.put(`jobTitle/update_delete/${formData.id}`, formData)
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
    deleteJobTitle(id) {
        return instance.delete(`jobTitle/update_delete/${id}`)
    },
}
