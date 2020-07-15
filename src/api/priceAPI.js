import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const priceAPI = {
    getPriceList(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        console.log(get_link)
        return instance.get(`price/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    createPrice(formData) {
        return instance.post(`price/list_create/`, formData)
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
    getPrice(id) {
        return instance.get(`price/update_delete/${id}`)
            .then(response => {
                return response;
            })
    },
    updatePrice(formData) {
        return instance.put(`price/update_delete/${formData.id}`, formData)
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
    deletePrice(id) {
        return instance.delete(`price/update_delete/${id}`)
    },
}
