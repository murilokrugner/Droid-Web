import axios from 'axios';

const api = axios.create({
    baseURL: 'https://knowledgesoftware.kinghost.net/apps_nodejs/droid/dist/',
});

export default api;