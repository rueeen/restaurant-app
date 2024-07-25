import axios from 'axios';

const api = axios.create({
    baseURL: 'https://rvalencia.pythonanywhere.com/api/',
});

export default api;
