import instance from "./baseurl";

export const simcardAPI = {
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