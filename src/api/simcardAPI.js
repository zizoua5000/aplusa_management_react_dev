import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const simcardAPI = {
    getSimcardListNEW(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        console.log(get_link)
        return instance.get(`simcard/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    getSimcardList(pageNumber=1) {
        return instance.get(`simcard/list_create/?page=${pageNumber}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    createSimcard(formData) {
        return instance.post(`simcard/list_create/`, formData)
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
    getSimcard(id) {
        return instance.get(`simcard/update_delete/${id}`)
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
    updateSimcard(formData) {
        return instance.put(`simcard/update_delete/${formData.id}`, formData)
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

    deleteSimcard(id) {
        return instance.delete(`simcard/update_delete/${id}`)
    }
}