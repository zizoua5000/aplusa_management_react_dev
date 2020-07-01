import instance from "./baseurl";
import {form_data_to_link} from "../utils/form_data/form_data_to_link" 

export const priceTypeAPI = {
    getPriceTypeListNEW(formData,page_size=null) {
        let get_link=form_data_to_link(formData);
        console.log(get_link)
        return instance.get(`price_type/list_create/${get_link}page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    getPriceTypeList(pageNumber = 1,page_size=null) {
        return instance.get(`price_type/list_create/?page=${pageNumber}&page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(() => {
                return 'error';
            })
    },
    createPriceType(formData) {
        return instance.post(`price_type/list_create/`, formData)
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
    getPriceType(id) {
        return instance.get(`price_type/update_delete/${id}`)
            .then(response => {
                return response;
            })
    },
    updatePriceType(formData) {
        return instance.put(`price_type/update_delete/${formData.id}`, formData)
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
    deletePriceType(id) {
        return instance.delete(`price_type/update_delete/${id}`)
    },
}
