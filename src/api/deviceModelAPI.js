import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const deviceModelAPI = {
    getDeviceModelListNEW(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        console.log(get_link)
        return instance.get(`device_model/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    getDeviceModelList(pageNumber = 1,page_size=null) {
        return instance.get(`device_model/list_create/?page=${pageNumber}&page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    getDeviceModel(id) {
        return instance.get(`device_model/update_delete/${id}`)
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
    createDeviceModel(formData) {
        return instance.post(`device_model/list_create/`, formData)
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
    updateDeviceModel(formData) {
        return instance.put(`device_model/update_delete/${formData.id}`, formData)
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
    deleteDeviceModel(id) {
        return instance.delete(`device_model/update_delete/${id}`)
    },

}
export const jobTitleAPI = {
    getJobTitle() {
        return instance.get(`job_title/list_create/`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    }
}