import axios from "axios";

const baseURL = 'http://localhost:5555/'
export const axiosApi = axios.create({baseURL});

export const userService = {
    save: (data) => axiosApi.post('/users', data).then(),
    getAll: () => axiosApi.get('/users').then(),
    updateByRank: (data) => axiosApi.post('/users/updateByRank', data).then(),
    updateById: (id, data) => axiosApi.patch(`/users/${id}`, data).then(),
    deleteById: (id) => axiosApi.delete(`/users/${id}`,).then(),
}
