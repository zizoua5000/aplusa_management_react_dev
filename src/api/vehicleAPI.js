import instance from "./baseurl";

export const vehicleAPI = {

    getVehicleList(pageNumber=1) {
        return instance.get(`vehicle/list_create/?page=${pageNumber}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return 'error';
            });
    },
    getVehicle(id) {
        return instance.get(`vehicle/update_delete/${id}`)
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
    createVehicle(formData) {
        return instance.post(`vehicle/list_create/`,formData)
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
    updateVehicle(formData) {
        return instance.put(`vehicle/update_delete/${formData.id}`,formData)
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
    deleteVehicle(id) {
        return instance.delete(`vehicle/update_delete/${id}`)
    },
}