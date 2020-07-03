import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const contentTypeAPI = {
    getContentTypeList(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        console.log(get_link)
        return instance.get(`content_type/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    createContentType(formData) {
        return instance.post(`content_type/list_create/`, formData)
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
    getContentType(id) {
        return instance.get(`content_type/update_delete/${id}`)
            .then(response => {
                return response;
            })
    },
    updateContentType(formData) {
        return instance.put(`content_type/update_delete/${formData.id}`, formData)
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
    deleteContentType(id) {
        return instance.delete(`content_type/update_delete/${id}`)
    },
}
