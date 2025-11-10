import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/employees';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const employeeAPI = {
    getAllEmployees: async () => {
        const response = await api.get('/all');
        return response.data;
    },

    getEmployeeById: async (id) => {
        const response = await api.get(`/all/${id}`);
        return response.data;
    },

    createEmployee: async (employeeData) => {
        const response = await api.post('/create', employeeData);
        return response.data;
    },

    updateEmployee: async (id, employeeData) => {
        const response = await api.put(`/edit/${id}`, employeeData);
        return response.data;
    },

    deleteEmployee: async (id) => {
        const response = await api.delete(`/delete/${id}`);
        return response.data;
    },
};