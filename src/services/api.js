import axios from 'axios';

const api = axios.create({
   // baseURL: 'https://knowledgesoftware.kinghost.net/apps_nodejs/droid/dist/',
    baseURL: 'http://localhost:3333/',
});

export default api;