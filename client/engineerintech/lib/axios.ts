import axios from 'axios';

// Create an instance of axios
const customAxios = axios.create({
    baseURL: 'http://localhost:8888/api'
});

export default customAxios;