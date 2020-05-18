import axios from 'axios';
const instance = axios.create({
    // withCredentials: true,
    //  baseURL: 'http://192.168.20.142:8010/api/',
    baseURL: 'http://127.0.0.1:8000/api/',
    // headers: {
    //     "API-KEY": "+*=#fk6hal!1g=97b%(2obmvq&&9l-h4rprwsq#1g5()hodm@j"
    // }
});
export default instance;