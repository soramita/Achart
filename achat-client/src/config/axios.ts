import axios, { AxiosRequestConfig } from 'axios'
const Axios = axios.create({
    baseURL:'http://localhost:3001/api',
    timeout:10000
})
Axios.interceptors.request.use((config:AxiosRequestConfig)=>{
    config.headers.authorization = localStorage.getItem('token')
    return config
})
Axios.interceptors.response.use((res:any)=>{
    return res.data
},(error:any)=>{
    throw new Error(error.response.data.message)
})
export default Axios;