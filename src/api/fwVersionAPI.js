import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const fwVersionAPI = {
    getFWVersionList(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        return instance.get(`fw_version/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    createFWVersion(formData) {
        return instance.post(`fw_version/list_create/`, formData)
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
    getFWVersion(id) {
        return instance.get(`fw_version/update_delete/${id}`)
            .then(response => {
                return response;
            })
    },
    updateFWVersion(formData) {
        return instance.put(`fw_version/update_delete/${formData.id}`, formData)
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
    deleteFWVersion(id) {
        return instance.delete(`fw_version/update_delete/${id}`)
    },
}
