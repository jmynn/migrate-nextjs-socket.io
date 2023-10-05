import axios from "axios";

export const $axios = axios.create({
    withCredentials: true, 
    baseURL: 'http://localhost:3000/'
}) 

$axios.interceptors.request.use(config => {
    config.headers.set('Room-Id', 'r1')
    return config
})