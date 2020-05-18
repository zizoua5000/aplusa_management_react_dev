import instance from "./baseurl";

export const vehicleTypeAPI = {
    getVehicleTypeList(pageNumber = 1,page_size=null) {
        return instance.get(`vehicle_type/list_create/?page=${pageNumber}&page_size=${page_size}`)
            .then(response => {
                return response.data;
            })
            .catch(() => {
                return 'error';
            })
    },
    createVehicleType(formData) {
        return instance.post(`vehicle_type/list_create/`, formData)
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
    getVehicleType(id) {
        return instance.get(`vehicle_type/update_delete/${id}`)
            .then(response => {
                return response;
            })
    },
    updateVehicleType(formData) {
        return instance.put(`vehicle_type/update_delete/${formData.id}`, formData)
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
    deleteVehicleType(id) {
        return instance.delete(`vehicle_type/update_delete/${id}`)
    },
}
