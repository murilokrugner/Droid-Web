import axios from 'axios';

const apiZipcode = axios.create({
    baseURL: 'https://viacep.com.br/ws/',
});

export default apiZipcode;