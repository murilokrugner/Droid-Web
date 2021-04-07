import axios from 'axios';

const api = axios.create({
    baseURL: 'http://knowledgesoftware.kinghost.net:21039/',
});

export default api;