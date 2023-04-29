import axios from 'axios'
import Cookies from 'js-cookie'

export const backendApi = axios.create({
    baseURL: 'https://bronze-rabbit-vest.cyclic.app/api',
    // baseURL: 'http://25.68.192.72:8081/api',
    headers: { 'x-token': Cookies.get('token') },
})
