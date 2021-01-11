import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const qaimeTypeAPI = {
    getQaimeTypeList(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        return instance.get(`qaime_type/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    createQaimeType(formData) {
        return instance.post(`qaime_type/list_create/`, formData)
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
    getQaimeType(id) {
        return instance.get(`qaime_type/detail/${id}`)
            .then(response => {
                return response;
            })
    },
    deleteQaimeType(id) {
        return instance.delete(`qaime_type/update_delete/${id}`)
    },

}
