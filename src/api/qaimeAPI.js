import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const qaimeAPI = {
    getQaimeList(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        return instance.get(`qaime/list/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    createQaime(formData) {
        return instance.post(`qaime/create/`, formData)
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
    createQaimeReturn(formData) {
        return instance.post(`qaime/create_return/`, formData)
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
    getQaime(id) {
        return instance.get(`qaime/detail/${id}`)
            .then(response => {
                return response;
            })
    },
    changeStatusQaime(id) {
        // return instance.put(`qaime/change_status/${formData.id}`, formData)
        //     .then(response => {
        //         return response;
        //     })
        //     .catch(function (error) {
        //         if (error.response) {
        //             return error.response;
        //         } else {
        //             return 'error'
        //         }
        //     });
        return instance.put(`qaime/change_status/${id}`)
    },
    deleteQaime(id) {
        return instance.delete(`qaime/update_delete/${id}`)
    },
    deleteReturnQaime(id) {
        return instance.delete(`qaime/update_delete_return/${id}`)
    },
}
