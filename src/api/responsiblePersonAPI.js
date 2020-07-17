import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const responsiblePersonAPI = {
    getResponsiblePersonList(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        console.log(get_link)
        return instance.get(`responsible_person/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    createResponsiblePerson(formData) {
        return instance.post(`responsible_person/list_create/`, formData)
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
    getResponsiblePerson(id) {
        return instance.get(`responsible_person/update_delete/${id}`)
            .then(response => {
                return response;
            })
    },
    updateResponsiblePerson(formData) {
        return instance.put(`responsible_person/update_delete/${formData.id}`, formData)
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
    deleteResponsiblePerson(id) {
        return instance.delete(`responsible_person/update_delete/${id}`)
    },
}
