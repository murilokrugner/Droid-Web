import axios from 'axios';

const api = axios.create({
  baseURL: 'https://knowledgesoftware.kinghost.net/droid/dist/',
  //baseURL: 'http://localhost:21039/',
});

export default api;
