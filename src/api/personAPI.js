import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const personAPI = {
    getPersonList(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        return instance.get(`person/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    createPerson(formData) {
        return instance.post(`person/list_create/`, formData)
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
    getPerson(id) {
        return instance.get(`person/update_delete/${id}`)
            .then(response => {
                return response;
            })
    },
    updatePerson(formData) {
        return instance.put(`person/update_delete/${formData.id}`, formData)
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
    deletePerson(id) {
        return instance.delete(`person/update_delete/${id}`)
    },
}
