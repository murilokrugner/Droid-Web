import axios from 'axios';

const api = axios.create({
    baseURL: 'https://knowledgesoftware.kinghost.net/apps_nodejs/droid/dist/',
   // baseURL: 'http://localhost:21039/',
});

export default api;