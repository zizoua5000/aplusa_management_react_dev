import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const deviceLocationAPI = {
    getDeviceLocationList(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        console.log(get_link)
        return instance.get(`device_location/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    createDeviceLocation(formData) {
        return instance.post(`device_location/list_create/`, formData)
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
    getDeviceLocation(id) {
        return instance.get(`device_location/update_delete/${id}`)
            .then(response => {
                return response;
            })
    },
    updateDeviceLocation(formData) {
        return instance.put(`device_location/update_delete/${formData.id}`, formData)
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
    deleteDeviceLocation(id) {
        return instance.delete(`device_location/update_delete/${id}`)
    },
}
