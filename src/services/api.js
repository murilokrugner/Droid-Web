import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.1.1.176:3333/',
});

export default api;